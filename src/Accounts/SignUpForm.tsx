import React from 'react';
import { UserEntity } from './entity';
import { FormRenderProps, Field } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import {
  composeValidators,
  required,
  mustBeEmail
} from '../Shared/UI/Form/Validators/commonValidators';
import LoadingButton from '../Shared/UI/LoadingButton';

export const repeatedPassword = (formValues: SignUpEntity) => {
  if (formValues.password === formValues.repeatedPassword) {
    return undefined;
  }
  return {
    repeatedPassword: `Passwords don't match`
  };
};

export interface SignUpEntity extends UserEntity {
  repeatedPassword: string;
}

interface FormProps extends FormRenderProps<SignUpEntity> {
  isLoading: boolean;
}

const SignUpForm: React.FC<FormProps> = ({
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  valid
}) => (
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

    <div className="field">
      <label className="label">Repeat password</label>

      <div className="control">
        <Field
          name="repeatedPassword"
          component={StringInput}
          type="repeatedPassword"
          className="has-text-centered"
          validate={required}
        />
      </div>
    </div>

    <div style={{ paddingTop: '1rem' }}>
      <LoadingButton
        isLoading={isLoading}
        className="button is-fullwidth is-primary"
        type="submit"
        disabled={submitting || pristine || !valid}
      >
        Sign up
      </LoadingButton>
    </div>
  </form>
);

export default SignUpForm;
