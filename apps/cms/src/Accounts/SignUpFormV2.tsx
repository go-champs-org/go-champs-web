import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { SignUpEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInputV2 from '../Shared/UI/Form/StringInputV2';
import {
  composeValidators,
  required,
  mustBeEmail,
  mustBeSimplePassword
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans, useTranslation } from 'react-i18next';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';
import useUsernameSuggestion from './useUsernameSuggestion';
import useUsernameAvailability from './useUsernameAvailability';
import useUsernameCollisionSuggestion from './useUsernameCollisionSuggestion';
import './SignUpFormV2.scss';

interface FormProps extends FormRenderProps<SignUpEntity> {
  isLoading: boolean;
}

function SignUpFormV2({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}: FormProps) {
  const { t } = useTranslation();
  const recaptchaField = useField('recaptcha');
  const {
    isSuggesting,
    isUsernameDisabled,
    suggestedUsername,
    suggestUsername
  } = useUsernameSuggestion();
  const { usernameStatus, validateUsername } = useUsernameAvailability(
    suggestedUsername
  );
  const {
    collisionSuggestion,
    applyCollisionSuggestion
  } = useUsernameCollisionSuggestion();

  return (
    <form onSubmit={handleSubmit} className="signup-form-v2">
      <div className="signup-form-v2-field">
        <label className="signup-form-v2-label">
          <Trans>email</Trans>
        </label>
        <Field
          name="email"
          type="text"
          validate={composeValidators([required, mustBeEmail])}
        >
          {({ input, meta }) => (
            <StringInputV2
              input={{
                ...input,
                onBlur: (event?: React.FocusEvent<HTMLElement>) => {
                  input.onBlur(event);
                  suggestUsername(input.value);
                }
              }}
              meta={meta}
              placeholder="meuemail@gmail.com"
            />
          )}
        </Field>
      </div>

      <div className="signup-form-v2-field">
        <label className="signup-form-v2-label">
          <Trans>username</Trans>
        </label>
        <Field name="username" type="text" validate={validateUsername}>
          {({ input, meta }) => (
            <StringInputV2
              input={input}
              meta={meta}
              placeholder="username"
              disabled={isUsernameDisabled}
              status={isSuggesting ? 'checking' : usernameStatus}
            />
          )}
        </Field>

        {collisionSuggestion && (
          <button
            type="button"
            className="signup-form-v2-username-suggestion"
            onClick={applyCollisionSuggestion}
          >
            {t('usernameSuggestionOffer', { username: collisionSuggestion })}
          </button>
        )}
      </div>

      <div className="signup-form-v2-field">
        <label className="signup-form-v2-label">
          <Trans>password</Trans>
        </label>
        <Field
          name="password"
          component={StringInputV2}
          type="password"
          placeholder="Insira sua senha"
          validate={composeValidators([required, mustBeSimplePassword])}
        />
      </div>

      <div className="signup-form-v2-field">
        <label className="signup-form-v2-label">
          <Trans>repeatPassword</Trans>
        </label>
        <Field
          name="repeatedPassword"
          component={StringInputV2}
          type="password"
          placeholder="Repita sua senha"
          validate={required}
        />
      </div>

      <div className="signup-form-v2-field signup-form-v2-recaptcha">
        <ReCAPTCHA
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
          onChange={recaptchaField.input.onChange}
        />
      </div>

      <LoadingButton
        isLoading={isLoading}
        className="signup-form-v2-submit"
        type="submit"
        disabled={submitting || pristine || !valid}
      >
        <Trans>signUp</Trans>
      </LoadingButton>

      <div className="signup-form-v2-links">
        <p className="signup-form-v2-link-text">
          <Trans>alreadyHaveAnAccount</Trans>{' '}
          <a href="/SignIn" className="signup-form-v2-link">
            <Trans>signIn</Trans>
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignUpFormV2;
