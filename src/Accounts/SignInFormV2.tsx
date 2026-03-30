import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInputV2 from '../Shared/UI/Form/StringInputV2';
import { SignInEntity } from './entity';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  composeValidators,
  mustBeAccountIdentifier
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';
import './SignInFormV2.scss';

interface FormProps extends FormRenderProps<SignInEntity> {
  isLoading: boolean;
}

function SignInFormV2({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="signin-form-v2">
      <div className="signin-form-v2-field">
        <label className="signin-form-v2-label">
          <Trans>usernameOrEmail</Trans>
        </label>
        <Field
          name="username"
          component={StringInputV2}
          type="text"
          placeholder="meuemail@gmail.com"
          validate={composeValidators([required, mustBeAccountIdentifier])}
        />
      </div>

      <div className="signin-form-v2-field">
        <label className="signin-form-v2-label">
          <Trans>password</Trans>
        </label>
        <Field
          name="password"
          component={StringInputV2}
          type="password"
          placeholder="Insira sua senha"
          validate={required}
        />
      </div>

      <LoadingButton
        isLoading={isLoading}
        className="signin-form-v2-submit"
        type="submit"
        disabled={submitting || pristine || !valid}
      >
        <Trans>signIn</Trans>
      </LoadingButton>

      <div className="signin-form-v2-divider">
        <span>
          <Trans>or</Trans>
        </span>
      </div>

      <div className="signin-form-v2-links">
        <p className="signin-form-v2-link-text">
          <Trans>needAnAccount</Trans>{' '}
          <a href="/SignUpV2" className="signin-form-v2-link">
            <Trans>createAccount</Trans>
          </a>
        </p>
        <p className="signin-form-v2-link-text">
          <Trans>forgotYourPassword</Trans>{' '}
          <a href="/AccountRecoveryV2" className="signin-form-v2-link">
            <Trans>recoverPassword</Trans>
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignInFormV2;
