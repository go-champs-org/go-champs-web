import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { FacebookSignUpEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeEmail,
  mustBeUsername
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';

export const signUpValidor = (formValues: FacebookSignUpEntity) => {
  if (formValues.facebookId && formValues.recaptcha && formValues.username) {
    return undefined;
  }

  return {
    recaptcha: formValues.recaptcha ? undefined : `Required`,
    username: formValues.username ? undefined : `Required`
  };
};

export const hasReCAPTCHA = (formValues: FacebookSignUpEntity) => {
  if (formValues.recaptcha) {
    return undefined;
  }
  return {
    recaptcha: `ReCAPTCHA required`
  };
};

interface FormProps extends FormRenderProps<FacebookSignUpEntity> {
  isLoading: boolean;
}

const FacebookSignUpForm: React.FC<FormProps> = ({
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
          <Trans>signUp</Trans>
        </LoadingButton>
      </div>
    </form>
  );
};

export default FacebookSignUpForm;
