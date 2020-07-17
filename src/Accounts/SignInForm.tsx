import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { SignInEntity } from './entity';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  composeValidators,
  mustBeUsername
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';

interface FormProps extends FormRenderProps<SignInEntity> {
  isLoading: boolean;
}

const SingInForm: React.FC<FormProps> = ({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label className="label">
          <Trans>username</Trans>
        </label>

        <div className="control">
          <Field
            name="username"
            component={StringInput}
            type="text"
            placeholder="Username"
            className="has-text-centered"
            validate={composeValidators([required, mustBeUsername])}
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
            validate={required}
          />
        </div>
      </div>

      <div style={{ paddingBottom: '1rem', paddingTop: '1rem' }}>
        <LoadingButton
          isLoading={isLoading}
          className="button is-fullwidth is-primary"
          type="submit"
          disabled={submitting || pristine || !valid}
        >
          <Trans>signIn</Trans>
        </LoadingButton>
      </div>
    </form>
  );
};

export default SingInForm;
