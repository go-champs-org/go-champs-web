import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import SignatureInput from '../Shared/UI/Form/SignatureInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { mustBePin } from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';

interface SignatureFormValues {
  signature: string;
  signaturePin: string;
  repeatedSignaturePin: string;
}

export const signatureValidator = (formValues: SignatureFormValues) => {
  const errors: Partial<Record<keyof SignatureFormValues, string>> = {};

  if (formValues.signature) {
    if (!formValues.signaturePin) {
      errors.signaturePin = 'signatureRequiresPin';
    }
    if (!formValues.repeatedSignaturePin) {
      errors.repeatedSignaturePin = 'signatureRequiresPin';
    }
    if (
      formValues.signaturePin &&
      formValues.repeatedSignaturePin &&
      formValues.signaturePin !== formValues.repeatedSignaturePin
    ) {
      errors.repeatedSignaturePin = 'pinsMustMatch';
    }
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
};

interface SignatureFormProps extends FormRenderProps<SignatureFormValues> {
  isLoading: boolean;
  backUrl: string;
}

const SignatureForm: React.FC<SignatureFormProps> = ({
  isLoading,
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  validating,
  valid
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>signature</Trans>
          </label>

          <div className="control">
            <Field name="signature" component={SignatureInput} allowClear />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>signaturePin</Trans>
          </label>

          <div className="control">
            <Field
              name="signaturePin"
              component={StringInput}
              type="password"
              placeholder="****"
              validate={mustBePin}
            />
          </div>
          <p className="help">
            <Trans>mustBeAtLeast4Digits</Trans>
          </p>
        </div>

        <div className="field">
          <label className="label">
            <Trans>repeatedSignaturePin</Trans>
          </label>

          <div className="control">
            <Field
              name="repeatedSignaturePin"
              component={StringInput}
              type="password"
              placeholder="****"
              validate={mustBePin}
            />
          </div>
          <p className="help">
            <Trans>mustBeAtLeast4Digits</Trans>
          </p>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine || validating || !valid}
        >
          <Trans>save</Trans>
        </LoadingButton>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <Trans>back</Trans>
        </button>
      </Link>
    </div>
  );
};

export default SignatureForm;
