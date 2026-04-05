import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { OfficialProfileEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { required } from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import ImageUpload from '../Shared/UI/Form/ImageUpload';
import {
  mapOfficialProfilePhotoToApiFileReference,
  mapFileReferenceToApiOfficialProfilePhoto
} from './dataMappers';

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

interface FormProps extends FormRenderProps<OfficialProfileEntity> {
  isLoading: boolean;
  backUrl: string;
}

const Form: React.FC<FormProps> = ({
  isLoading,
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  validating,
  valid,
  values
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
