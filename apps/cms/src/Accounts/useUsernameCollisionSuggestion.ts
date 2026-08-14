import { useCallback, useEffect, useRef, useState } from 'react';
import { useField, useForm } from 'react-final-form';
import accountHttpClient from './accountHttpClient';
import { SignUpEntity } from './entity';

/**
 * The message account creation answers with when the unique constraint on
 * `users.username` rejects the handle. Availability is checked inline before
 * the submit, but the window between checking and submitting stays open by
 * design, so this path is reached by the user who lost that race — not by a
 * user who did anything wrong.
 */
const USERNAME_TAKEN_PATTERNS = [/has already been taken/i, /já está em uso/i];

export const isUsernameTakenError = (
  submitError: string[] | string | undefined
): boolean => {
  if (!submitError) {
    return false;
  }

  const messages = ([] as string[]).concat(submitError);

  return messages.some(message =>
    USERNAME_TAKEN_PATTERNS.some(pattern => pattern.test(message))
  );
};

/**
 * Asks for a fresh handle to offer after a collision.
 *
 * A failure here is silent on purpose: the user still sees the error telling
 * them the handle was taken, they simply are not offered an alternative.
 */
export const requestCollisionSuggestion = async (
  email: string,
  onSuggestion: (username: string) => void
): Promise<void> => {
  try {
    const response = await accountHttpClient.getUsernameSuggestion(
      (email || '').trim()
    );

    onSuggestion(response.data.username);
  } catch (err) {
    // No alternative to offer.
  }
};

/**
 * Turns the uniqueness error returned by account creation into a concrete
 * handle the user can take, offered next to the error and applied only when
 * they click it — a username someone deliberately typed is never replaced
 * behind their back.
 */
const useUsernameCollisionSuggestion = () => {
  const form = useForm<SignUpEntity>();
  const { meta } = useField('username', {
    subscription: { submitError: true }
  });
  const isMounted = useRef(true);
  const handledCollision = useRef<string | null>(null);
  const [collisionSuggestion, setCollisionSuggestion] = useState<string | null>(
    null
  );

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const submitError = meta.submitError;

  useEffect(() => {
    if (!isUsernameTakenError(submitError)) {
      return;
    }

    const { email, username } = form.getState().values;
    const collision = `${username}`;

    if (handledCollision.current === collision) {
      return;
    }

    handledCollision.current = collision;

    requestCollisionSuggestion(email, suggestion => {
      if (isMounted.current) {
        setCollisionSuggestion(suggestion);
      }
    });
  }, [submitError, form]);

  const applyCollisionSuggestion = useCallback(() => {
    if (!collisionSuggestion) {
      return;
    }

    form.change('username', collisionSuggestion);
    setCollisionSuggestion(null);
  }, [collisionSuggestion, form]);

  return { collisionSuggestion, applyCollisionSuggestion };
};

export default useUsernameCollisionSuggestion;
