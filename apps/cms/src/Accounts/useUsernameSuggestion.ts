import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-final-form';
import accountHttpClient from './accountHttpClient';
import { SignUpEntity } from './entity';
import { mustBeEmail } from '../Shared/UI/Form/Validators/commonValidators';
import {
  USERNAME_REQUEST_TIMEOUT_MS,
  withTimeout
} from './usernameRequestTimeout';

interface MutableRef<T> {
  current: T;
}

/**
 * The bits of the form api the suggestion needs, kept narrow so the behavior
 * can be unit tested without rendering a form.
 */
export interface UsernameSuggestionForm {
  getUsernameField: () => { value?: string; modified?: boolean } | undefined;
  changeUsername: (username: string) => void;
}

interface SuggestUsernameOptions {
  email: string;
  form: UsernameSuggestionForm;
  requestedEmail: MutableRef<string | null>;
  lastRequestId: MutableRef<number>;
  onRequestStart?: () => void;
  onSuggested?: (username: string) => void;
  onSettled: () => void;
  timeoutMs?: number;
}

/**
 * Requests a username suggestion for `email` and writes it to the username
 * field.
 *
 * The suggestion is a convenience, never a pre requisite: when the request
 * fails, the field is left empty and editable and the sign up goes on exactly
 * as before. A username the user typed themselves is never overwritten, and a
 * response that lost the race to a newer one is discarded.
 *
 * `onSettled` runs as soon as a request finishes, whatever the outcome: the
 * username field is disabled while the suggestion is on its way and a failure
 * must never leave the user locked out of a required field.
 */
export const suggestUsernameFromEmail = async ({
  email,
  form,
  requestedEmail,
  lastRequestId,
  onRequestStart,
  onSuggested,
  onSettled,
  timeoutMs = USERNAME_REQUEST_TIMEOUT_MS
}: SuggestUsernameOptions): Promise<void> => {
  const trimmedEmail = (email || '').trim();

  if (mustBeEmail(trimmedEmail)) {
    return;
  }

  if (requestedEmail.current === trimmedEmail) {
    return;
  }

  requestedEmail.current = trimmedEmail;
  lastRequestId.current += 1;
  const requestId = lastRequestId.current;

  try {
    if (onRequestStart) {
      onRequestStart();
    }

    const response = await withTimeout(
      accountHttpClient.getUsernameSuggestion(trimmedEmail),
      timeoutMs
    );

    if (requestId !== lastRequestId.current) {
      return;
    }

    // Nothing came back before the deadline: no suggestion to write, and an
    // editable field the user fills in themselves.
    if (!response) {
      return;
    }

    const usernameField = form.getUsernameField();

    if (usernameField && (usernameField.value || usernameField.modified)) {
      return;
    }

    form.changeUsername(response.data.username);

    if (onSuggested) {
      onSuggested(response.data.username);
    }
  } catch (err) {
    // A failed suggestion degrades to the previous behavior: an empty
    // username field the user fills in themselves.
  } finally {
    onSettled();
  }
};

/**
 * Pre-fills the username field of a sign up form with a suggestion derived
 * from the informed email.
 *
 * The field is disabled only while a suggestion is actually on its way, so the
 * user is never offered an empty username field to fill in while the
 * suggestion is still coming — and never left waiting on a request that was
 * never made, which is what happens on a sign up opened without an email.
 */
const useUsernameSuggestion = () => {
  const form = useForm<SignUpEntity>();
  const requestedEmail = useRef<string | null>(null);
  const lastRequestId = useRef(0);
  const isMounted = useRef(true);
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(() =>
    Boolean(form.getState().values.email)
  );
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedUsername, setSuggestedUsername] = useState<string | null>(
    null
  );

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const suggestUsername = useCallback(
    (email: string) =>
      suggestUsernameFromEmail({
        email,
        form: {
          getUsernameField: () => form.getFieldState('username'),
          changeUsername: username => form.change('username', username)
        },
        requestedEmail,
        lastRequestId,
        onRequestStart: () => {
          if (isMounted.current) {
            setIsSuggesting(true);
            setIsUsernameDisabled(true);
          }
        },
        onSuggested: username => {
          if (isMounted.current) {
            setSuggestedUsername(username);
          }
        },
        onSettled: () => {
          if (isMounted.current) {
            setIsUsernameDisabled(false);
            setIsSuggesting(false);
          }
        }
      }),
    [form]
  );

  useEffect(() => {
    const { email } = form.getState().values;

    if (email) {
      suggestUsername(email);
    }
    // Runs once for the email that comes pre filled from the query string,
    // where no blur ever happens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSuggesting,
    isUsernameDisabled,
    suggestedUsername,
    suggestUsername
  };
};

export default useUsernameSuggestion;
