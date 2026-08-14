import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import accountHttpClient from './accountHttpClient';
import {
  composeValidators,
  mustBeUsername,
  required,
  usernameFormatReason,
  UsernameFormatReason
} from '../Shared/UI/Form/Validators/commonValidators';
import {
  USERNAME_REQUEST_TIMEOUT_MS,
  wait,
  withTimeout
} from './usernameRequestTimeout';

interface MutableRef<T> {
  current: T;
}

/**
 * A single value shared by both checks of the username field, calibrated to
 * the debounce every other search box in the app already uses: long enough
 * that typing a handle never sends a request per key, short enough that the
 * answer arrives while the user is still looking at the field.
 */
export const USERNAME_CHECK_DEBOUNCE_MS = 500;

export const USERNAME_TAKEN_MESSAGE = 'usernameTaken';

const REASON_MESSAGES: Record<UsernameFormatReason, string> = {
  too_short: 'usernameTooShort',
  too_long: 'usernameTooLong',
  invalid_characters: 'usernameInvalidCharacters'
};

export type UsernameStatus = 'idle' | 'checking' | 'available';

export interface UsernameAvailabilityContext {
  /**
   * Verdicts already known, so re-running the validator for a value the user
   * has not changed never costs a request.
   */
  cache: MutableRef<Map<string, boolean>>;
  lastRequestId: MutableRef<number>;
  /**
   * The handle the suggestion endpoint pre-filled, while the user has not
   * touched it. It came back free, so it needs no check of its own: a user who
   * never edits the field triggers no availability call at all.
   *
   * The first edit clears it. From then on the field is whatever the user
   * typed, and typing the suggestion back in is checked like any other handle
   * — by then it is only a value someone else may have claimed in the
   * meantime, not a verdict this session still holds.
   */
  suggestedUsername: MutableRef<string | null>;
  onStatusChange: (status: UsernameStatus) => void;
  delayMs?: number;
  timeoutMs?: number;
}

/**
 * Answers whether `username` can still be claimed, as an async validator.
 *
 * Format is evaluated first and locally: a handle already known to be
 * malformed is never asked about, exactly like the API, which refuses it
 * without touching the database.
 *
 * Availability is authoritative only on the server. This check narrows the
 * window between choosing a handle and submitting the form, it does not close
 * it — and when it cannot answer at all (endpoint down, request rejected) it
 * returns no error, leaving the unique constraint at account creation to
 * decide, which is how the form behaved before this existed.
 */
export const validateUsernameAvailabilityFor = async (
  username: string,
  context: UsernameAvailabilityContext
): Promise<string | undefined> => {
  const {
    cache,
    lastRequestId,
    suggestedUsername,
    onStatusChange,
    delayMs = USERNAME_CHECK_DEBOUNCE_MS,
    timeoutMs = USERNAME_REQUEST_TIMEOUT_MS
  } = context;
  const candidate = (username || '').trim();

  if (usernameFormatReason(candidate)) {
    onStatusChange('idle');
    return undefined;
  }

  if (candidate === suggestedUsername.current) {
    onStatusChange('available');
    return undefined;
  }

  suggestedUsername.current = null;

  const cachedAvailability = cache.current.get(candidate);

  if (cachedAvailability !== undefined) {
    onStatusChange(cachedAvailability ? 'available' : 'idle');
    return cachedAvailability ? undefined : USERNAME_TAKEN_MESSAGE;
  }

  lastRequestId.current += 1;
  const requestId = lastRequestId.current;
  onStatusChange('checking');

  await wait(delayMs);

  // A newer keystroke already started its own check: this one is about a value
  // the user has moved on from, and the newer run is the one that answers.
  if (requestId !== lastRequestId.current) {
    return undefined;
  }

  try {
    const response = await withTimeout(
      accountHttpClient.checkUsernameAvailability(candidate),
      timeoutMs
    );

    if (requestId !== lastRequestId.current) {
      return undefined;
    }

    // Nothing came back before the deadline.
    if (!response) {
      onStatusChange('idle');
      return undefined;
    }

    const { valid, available, reason } = response.data;

    // The client agreed the format was fine and the API did not: the API is
    // the source of truth, so say which rule it says was broken.
    if (!valid) {
      onStatusChange('idle');
      return REASON_MESSAGES[reason as UsernameFormatReason] || undefined;
    }

    cache.current.set(candidate, available);
    onStatusChange(available ? 'available' : 'idle');

    return available ? undefined : USERNAME_TAKEN_MESSAGE;
  } catch (err) {
    // Not being able to check is not a reason to block a handle that may well
    // be free: the server decides at submit time.
    if (requestId === lastRequestId.current) {
      onStatusChange('idle');
    }

    return undefined;
  }
};

/**
 * Builds the field validator: format first and locally, availability after and
 * only for a candidate the format rules accept.
 */
export const buildUsernameValidator = ({
  validateAvailability,
  onStatusChange,
  getStatus,
  pendingRuns
}: {
  validateAvailability: (username: string) => Promise<string | undefined>;
  onStatusChange: (status: UsernameStatus) => void;
  getStatus: () => UsernameStatus;
  pendingRuns: MutableRef<number>;
}) => {
  const validateFormat = composeValidators([required, mustBeUsername]);

  return async (username: string) => {
    pendingRuns.current += 1;

    try {
      const formatErrors = await validateFormat(username);

      // A field that is empty or malformed has nothing to check and nothing to
      // report about availability, so the spinner it may have been showing
      // stops here instead of hanging.
      if (formatErrors) {
        onStatusChange('idle');
        return formatErrors;
      }

      return await validateAvailability(username);
    } finally {
      pendingRuns.current -= 1;

      // Nothing is being validated any more, so nothing can still be
      // checking. Whatever the reason a run left the state behind — a check
      // abandoned as stale, an unforeseen path — the field never keeps
      // spinning over work that is not happening.
      if (pendingRuns.current === 0 && getStatus() === 'checking') {
        onStatusChange('idle');
      }
    }
  };
};

/**
 * Tells the sign up form whether the username being typed is still free,
 * before the form is submitted.
 */
const useUsernameAvailability = (suggestedUsername: string | null) => {
  const cache = useRef(new Map<string, boolean>());
  const lastRequestId = useRef(0);
  const suggestedUsernameRef = useRef<string | null>(suggestedUsername);
  const lastSuggestion = useRef<string | null>(suggestedUsername);
  const isMounted = useRef(true);
  const pendingRuns = useRef(0);
  const statusRef = useRef<UsernameStatus>('idle');
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');

  // Only a suggestion that just arrived is trusted. Re-syncing on every render
  // would hand back a suggestion the first edit deliberately dropped.
  if (suggestedUsername !== lastSuggestion.current) {
    lastSuggestion.current = suggestedUsername;
    suggestedUsernameRef.current = suggestedUsername;
  }

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const setStatus = useCallback((status: UsernameStatus) => {
    statusRef.current = status;

    if (isMounted.current) {
      setUsernameStatus(status);
    }
  }, []);

  const validateUsernameAvailability = useCallback(
    (username: string) =>
      validateUsernameAvailabilityFor(username, {
        cache,
        lastRequestId,
        suggestedUsername: suggestedUsernameRef,
        onStatusChange: setStatus
      }),
    [setStatus]
  );

  // The composed validator has to keep the same identity across renders.
  // react-final-form re-registers a field whose `validate` prop changed and
  // validates it again, and this validator publishes the checking state — a
  // validator rebuilt on every render would therefore validate, re-render and
  // validate again, leaving the field spinning forever.
  const validateUsername = useMemo(
    () =>
      buildUsernameValidator({
        validateAvailability: validateUsernameAvailability,
        onStatusChange: setStatus,
        getStatus: () => statusRef.current,
        pendingRuns
      }),
    [setStatus, validateUsernameAvailability]
  );

  return { usernameStatus, validateUsername, validateUsernameAvailability };
};

export default useUsernameAvailability;
