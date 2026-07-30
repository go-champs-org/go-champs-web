import React from 'react';
import LoadingButton from '../Shared/UI/LoadingButton';
import ReCAPTCHA from 'react-google-recaptcha';
import { Field, useField, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeEmail
} from '../Shared/UI/Form/Validators/commonValidators';
import { AccountRecoveryEntity } from './entity';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';

export const accountRecoveryValidor = (formValues: AccountRecoveryEntity) => {
  if (formValues.email && formValues.recaptcha) {
    return undefined;
  }

  return {
    email: formValues.email ? undefined : `Required`,
    recaptcha: formValues.recaptcha ? undefined : `Required`
  };
};

interface FormProps extends FormRenderProps<AccountRecoveryEntity> {
  isLoading: boolean;
}

const RecoveryForm: React.FC<FormProps> = ({
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
          Recuperar conta
        </LoadingButton>
      </div>
    </form>
  );
};

export default RecoveryForm;
