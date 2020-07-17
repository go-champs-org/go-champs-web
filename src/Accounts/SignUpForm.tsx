import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { SignUpEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeEmail,
  mustBeStrongPassword,
  mustBeUsername
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';

export const signUpValidor = (formValues: SignUpEntity) => {
  if (
    formValues.password === formValues.repeatedPassword &&
    formValues.recaptcha
  ) {
    return undefined;
  }

  return {
    recaptcha: formValues.recaptcha ? undefined : `Required`,
    repeatedPassword:
      formValues.password === formValues.repeatedPassword
        ? undefined
        : `Passwords don't match`
  };
};

export const hasReCAPTCHA = (formValues: SignUpEntity) => {
  if (formValues.recaptcha) {
    return undefined;
  }
  return {
    recaptcha: `ReCAPTCHA required`
  };
};

interface FormProps extends FormRenderProps<SignUpEntity> {
  isLoading: boolean;
}

const SignUpForm: React.FC<FormProps> = ({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}) => {
  const recaptchaField = useField('recaptcha');

  return (
    <form onSubmit={handleSubmit} className="form no-border-botton">
      <div className="field">
        <label className="label">
          <Trans>username</Trans>
        </label>

        <div className="control">
          <Field
            name="username"
            component={StringInput}
            type="text"
            placeholder="username"
            className="has-text-centered"
            validate={composeValidators([required, mustBeUsername])}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">
          <Trans>email</Trans>
        </label>

        <div className="control">
          <Field
            name="email"
            component={StringInput}
            type="text"
            placeholder="Name"
            className="has-text-centered"
            validate={composeValidators([required, mustBeEmail])}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">
          <Trans>password</Trans>
        </label>

        <div className="control">
          <Field
            name="password"
            component={StringInput}
            type="password"
            className="has-text-centered"
            validate={composeValidators([required, mustBeStrongPassword])}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">
          <Trans>repeatPassword</Trans>
        </label>

        <div className="control">
          <Field
            name="repeatedPassword"
            component={StringInput}
            type="password"
            className="has-text-centered"
            validate={required}
          />
        </div>
      </div>

      <div className="field" style={{ marginLeft: '1rem' }}>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''}
          onChange={recaptchaField.input.onChange}
        />
      </div>

      <div style={{ paddingTop: '1rem' }}>
        <LoadingButton
          isLoading={isLoading}
          className="button is-fullwidth is-primary"
          type="submit"
          disabled={submitting || pristine || !valid}
        >
          <Trans>signUp</Trans>
        </LoadingButton>
      </div>
    </form>
  );
};

export default SignUpForm;
