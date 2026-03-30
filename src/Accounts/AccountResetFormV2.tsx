import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { AccountResetEntity } from './entity';
import { FormRenderProps, Field, useField } from 'react-final-form';
import StringInputV2 from '../Shared/UI/Form/StringInputV2';
import {
  composeValidators,
  required,
  mustBeSimplePassword
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { REACT_APP_RECAPTCHA_SITE_KEY } from '../Shared/env';
import './AccountResetFormV2.scss';

interface FormProps extends FormRenderProps<AccountResetEntity> {
  isLoading: boolean;
}

function AccountResetFormV2({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid,
  values
}: FormProps) {
  const recaptchaField = useField('recaptcha');

  return (
    <form onSubmit={handleSubmit} className="account-reset-form-v2">
      <div className="account-reset-form-v2-field">
        <label className="account-reset-form-v2-label">
          <Trans>username</Trans>
        </label>
        <p className="account-reset-form-v2-username">{values.username}</p>
      </div>

      <div className="account-reset-form-v2-field">
        <label className="account-reset-form-v2-label">
          <Trans>newPassword</Trans>
        </label>
        <Field
          name="password"
          component={StringInputV2}
          type="password"
          placeholder="Insira sua nova senha"
          validate={composeValidators([required, mustBeSimplePassword])}
        />
      </div>

      <div className="account-reset-form-v2-field">
        <label className="account-reset-form-v2-label">
          <Trans>repeatPassword</Trans>
        </label>
        <Field
          name="repeatedPassword"
          component={StringInputV2}
          type="password"
          placeholder="Repita sua nova senha"
          validate={required}
        />
      </div>

      <div
        className="account-reset-form-v2-field"
        style={{ alignItems: 'center' }}
      >
        <ReCAPTCHA
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
          onChange={recaptchaField.input.onChange}
        />
      </div>

      <LoadingButton
        isLoading={isLoading}
        className="account-reset-form-v2-submit"
        type="submit"
        disabled={submitting || pristine || !valid}
      >
        <Trans>accountReset</Trans>
      </LoadingButton>

      <div className="account-reset-form-v2-links">
        <p className="account-reset-form-v2-link-text">
          <Trans>rememberYourPassword</Trans>{' '}
          <a href="/SignInV2" className="account-reset-form-v2-link">
            <Trans>signIn</Trans>
          </a>
        </p>
      </div>
    </form>
  );
}

export default AccountResetFormV2;
