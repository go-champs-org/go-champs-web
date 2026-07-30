import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { AccountResetEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeSimplePassword
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';

export const accountResetValidor = (formValues: AccountResetEntity) => {
  if (
    formValues.password === formValues.repeatedPassword &&
    formValues.recaptcha &&
    formValues.username &&
    formValues.recoveryToken
  ) {
    return undefined;
  }

  return {
    recaptcha: formValues.recaptcha ? undefined : `Obrigatório`,
    recoveryToken: formValues.recoveryToken ? undefined : 'Obrigatório',
    repeatedPassword:
      formValues.password === formValues.repeatedPassword
        ? undefined
        : `Senhas não batem`,
    username: formValues.username ? undefined : 'Obrigatório'
  };
};

export const hasReCAPTCHA = (formValues: AccountResetEntity) => {
  if (formValues.recaptcha) {
    return undefined;
  }
  return {
    recaptcha: `ReCAPTCHA required`
  };
};

interface FormProps extends FormRenderProps<AccountResetEntity> {
  isLoading: boolean;
}

const AccountResetForm: React.FC<FormProps> = ({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid,
  values
}) => {
  const recaptchaField = useField('recaptcha');

  return (
    <form onSubmit={handleSubmit} className="form no-border-botton">
      <div className="field">
        <label className="label">Username</label>

        <div className="control has-text-centered">{values.username}</div>
      </div>

      <div className="field">
        <label className="label">New password</label>

        <div className="control">
          <Field
            name="password"
            component={StringInput}
            type="password"
            className="has-text-centered"
            validate={composeValidators([required, mustBeSimplePassword])}
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
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
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
          Resetar conta
        </LoadingButton>
      </div>
    </form>
  );
};

export default AccountResetForm;
