import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { OfficialProfileEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import SignatureInput from '../Shared/UI/Form/SignatureInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  mustBePin
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import ImageUpload from '../Shared/UI/Form/ImageUpload';
import {
  mapOfficialProfilePhotoToApiFileReference,
  mapFileReferenceToApiOfficialProfilePhoto
} from './dataMappers';

interface OfficialProfileFormEntity extends OfficialProfileEntity {
  repeatedSignaturePin?: string;
}

export const officialProfileValidator = (
  formValues: OfficialProfileFormEntity,
  isNewProfile: boolean = false
) => {
  const errors: Partial<Record<keyof OfficialProfileFormEntity, string>> = {};

  // Only validate PIN for new profiles when signature exists
  if (isNewProfile && formValues.signature) {
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

export const FormLoading: React.FC = () => (
  <div>
    <Shimmer>
      <div
        style={{
          height: '13px',
          marginBottom: '11px',
          width: '25%'
        }}
      />
    </Shimmer>

    <Shimmer>
      <div style={{ height: '40px', marginBottom: '20px' }} />
    </Shimmer>

    <Shimmer>
      <div
        style={{
          height: '13px',
          marginBottom: '11px',
          width: '25%'
        }}
      />
    </Shimmer>

    <Shimmer>
      <div style={{ height: '40px', marginBottom: '20px' }} />
    </Shimmer>

    <Shimmer>
      <div style={{ height: '40px', marginBottom: '20px', width: '150px' }} />
    </Shimmer>
  </div>
);

interface FormProps extends FormRenderProps<OfficialProfileFormEntity> {
  isLoading: boolean;
  backUrl: string;
  isNewProfile?: boolean;
}

const Form: React.FC<FormProps> = ({
  isLoading,
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  validating,
  valid,
  values,
  isNewProfile = false
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>name</Trans>
          </label>

          <div className="control">
            <Field
              name="name"
              component={StringInput}
              type="text"
              placeholder="Full Name"
              validate={required}
            />
          </div>
        </div>

        <div className="control">
          <label className="label">
            <Trans>photo</Trans>
          </label>

          <Field
            name="photoUrl"
            render={(
              props: FieldRenderProps<FileReference | string, HTMLElement>
            ) => (
              <ImageUpload
                {...props}
                imageType="official-profiles-photos"
                initialFileReference={
                  values.photoUrl
                    ? mapOfficialProfilePhotoToApiFileReference(values)
                    : undefined
                }
              />
            )}
            parse={(value: FileReference) => {
              if (!value) return '';

              return mapFileReferenceToApiOfficialProfilePhoto(value);
            }}
          />
        </div>

        <div className="field">
          <label className="label">
            <Trans>category</Trans>
          </label>

          <div className="control">
            <Field
              name="category"
              component={StringInput}
              type="text"
              placeholder="FIBA,CBB, etc."
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>licenseNumber</Trans>
          </label>

          <div className="control">
            <Field
              name="licenseNumber"
              component={StringInput}
              type="text"
              placeholder="ABC123"
              validate={required}
            />
          </div>
        </div>

        {isNewProfile && (
          <>
            <div className="field">
              <label className="label">
                <Trans>signature</Trans>
              </label>

              <div className="control">
                <Field
                  name="signature"
                  component={SignatureInput}
                  allowClear={isNewProfile}
                />
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
          </>
        )}

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

export default Form;
