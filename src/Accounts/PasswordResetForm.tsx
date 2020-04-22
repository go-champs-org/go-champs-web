import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { PasswordResetEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeEmail,
  mustBeStrongPassword
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';

export const passwordResetValidor = (formValues: PasswordResetEntity) => {
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

export const hasReCAPTCHA = (formValues: PasswordResetEntity) => {
  if (formValues.recaptcha) {
    return undefined;
  }
  return {
    recaptcha: `ReCAPTCHA required`
  };
};

interface FormProps extends FormRenderProps<PasswordResetEntity> {
  isLoading: boolean;
}

const PasswordResetForm: React.FC<FormProps> = ({
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
        <label className="label">Email</label>

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
        <label className="label">New password</label>

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
        <label className="label">Repeat new password</label>

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
          Reset password
        </LoadingButton>
      </div>
    </form>
  );
};

export default PasswordResetForm;
