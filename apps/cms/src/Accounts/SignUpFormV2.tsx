import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { SignUpEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInputV2 from '../Shared/UI/Form/StringInputV2';
import {
  composeValidators,
  required,
  mustBeEmail,
  mustBeUsername,
  mustBeSimplePassword
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';
import useUsernameSuggestion from './useUsernameSuggestion';
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
  const recaptchaField = useField('recaptcha');
  const { isUsernameDisabled, suggestUsername } = useUsernameSuggestion();

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
        <Field
          name="username"
          component={StringInputV2}
          type="text"
          placeholder="username"
          disabled={isUsernameDisabled}
          validate={composeValidators([required, mustBeUsername])}
        />
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
