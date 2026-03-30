import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Field, useField, FormRenderProps } from 'react-final-form';
import StringInputV2 from '../Shared/UI/Form/StringInputV2';
import {
  composeValidators,
  required,
  mustBeEmail
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { AccountRecoveryEntity } from './entity';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';
import './AccountRecoveryFormV2.scss';

interface FormProps extends FormRenderProps<AccountRecoveryEntity> {
  isLoading: boolean;
}

function AccountRecoveryFormV2({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}: FormProps) {
  const recaptchaField = useField('recaptcha');

  return (
    <form onSubmit={handleSubmit} className="account-recovery-form-v2">
      <div className="account-recovery-form-v2-field">
        <label className="account-recovery-form-v2-label">
          <Trans>email</Trans>
        </label>
        <Field
          name="email"
          component={StringInputV2}
          type="text"
          placeholder="meuemail@gmail.com"
          validate={composeValidators([required, mustBeEmail])}
        />
      </div>

      <div
        className="account-recovery-form-v2-field"
        style={{ alignItems: 'center' }}
      >
        <ReCAPTCHA
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
          onChange={recaptchaField.input.onChange}
        />
      </div>

      <LoadingButton
        isLoading={isLoading}
        className="account-recovery-form-v2-submit"
        type="submit"
        disabled={submitting || pristine || !valid}
      >
        <Trans>recoverPassword</Trans>
      </LoadingButton>

      <div className="account-recovery-form-v2-links">
        <p className="account-recovery-form-v2-link-text">
          <Trans>rememberYourPassword</Trans>{' '}
          <a href="/SignInV2" className="account-recovery-form-v2-link">
            <Trans>signIn</Trans>
          </a>
        </p>
      </div>
    </form>
  );
}

export default AccountRecoveryFormV2;
