import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-final-form';
import accountHttpClient from './accountHttpClient';
import { SignUpEntity } from './entity';
import { mustBeEmail } from '../Shared/UI/Form/Validators/commonValidators';

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
  onSettled: () => void;
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
  onSettled
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
    const response = await accountHttpClient.getUsernameSuggestion(
      trimmedEmail
    );

    if (requestId !== lastRequestId.current) {
      return;
    }

    const usernameField = form.getUsernameField();

    if (usernameField && (usernameField.value || usernameField.modified)) {
      return;
    }

    form.changeUsername(response.data.username);
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
 * `isUsernameDisabled` starts `true` and is turned off by the first suggestion
 * request that finishes, so the user is never offered an empty username field
 * to fill in while the suggestion is still coming.
 */
const useUsernameSuggestion = () => {
  const form = useForm<SignUpEntity>();
  const requestedEmail = useRef<string | null>(null);
  const lastRequestId = useRef(0);
  const isMounted = useRef(true);
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);

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
        onSettled: () => {
          if (isMounted.current) {
            setIsUsernameDisabled(false);
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

  return { isUsernameDisabled, suggestUsername };
};

export default useUsernameSuggestion;
