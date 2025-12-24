import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { AthleteProfileEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { required } from '../Shared/UI/Form/Validators/commonValidators';
import { Trans, useTranslation } from 'react-i18next';
import CollapsibleCard from '../Shared/UI/CollapsibleCard';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import ImageUpload from '../Shared/UI/Form/ImageUpload';
import {
  mapAthleteProfilePhotoToApiFileReference,
  mapFileReferenceToApiAthleteProfilePhoto
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

interface FormProps extends FormRenderProps<AthleteProfileEntity> {
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
  const { t } = useTranslation();
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
                imageType="athlete-profiles-photos"
                initialFileReference={
                  values.photoUrl
                    ? mapAthleteProfilePhotoToApiFileReference(values)
                    : undefined
                }
              />
            )}
            parse={(value: FileReference) => {
              if (!value) return '';

              return mapFileReferenceToApiAthleteProfilePhoto(value);
            }}
          />
        </div>

        <div className="field">
          <CollapsibleCard titleElement={t('socialNetworks')}>
            <div className="field">
              <label className="label">Facebook</label>
              <div className="control">
                <Field
                  name="facebook"
                  component={StringInput}
                  type="text"
                  placeholder="www.facebook.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.facebook.com/${
                  values.facebook ? values.facebook : ''
                }`}
              </p>
            </div>

            <div className="field">
              <label className="label">Instagram</label>
              <div className="control">
                <Field
                  name="instagram"
                  component={StringInput}
                  type="text"
                  placeholder="www.instagram.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.instagram.com/${
                  values.instagram ? values.instagram : ''
                }`}
              </p>
            </div>

            <div className="field">
              <label className="label">Twitter</label>
              <div className="control">
                <Field
                  name="twitter"
                  component={StringInput}
                  type="text"
                  placeholder="www.twitter.com/your-tournament"
                />
              </div>

              <p className="help is-info">
                {`https://www.twitter.com/${
                  values.twitter ? values.twitter : ''
                }`}
              </p>
            </div>
          </CollapsibleCard>
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
