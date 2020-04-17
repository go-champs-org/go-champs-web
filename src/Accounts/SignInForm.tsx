import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { UserEntity } from './entity';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  mustBeEmail,
  composeValidators
} from '../Shared/UI/Form/Validators/commonValidators';

interface FormProps extends FormRenderProps<UserEntity> {
  isLoading: boolean;
}

const SingInForm: React.FC<FormProps> = ({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}) => (
  <form onSubmit={handleSubmit} className="form">
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
      <label className="label">Password</label>

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
        Sign in
      </LoadingButton>
    </div>
  </form>
);

export default SingInForm;
