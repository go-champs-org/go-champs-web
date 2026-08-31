import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { OrganizationEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  composeValidators,
  mustBeSlug
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import ImageUpload from '../Shared/UI/Form/ImageUpload';
import {
  mapFileReferenceToApiOrganizationLogo,
  mapOrganizationLogoToApiFileReference
} from './dataMappers';

export const FormLoading: React.FC = () => (
  <div className="columns is-multiline">
    <div className="column is-12">
      <label className="label">
        <Trans>name</Trans>
      </label>
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>

    <div className="column is-12">
      <label className="label">Slug</label>
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>
  </div>
);

interface FormProps extends FormRenderProps<OrganizationEntity> {
  isLoading: boolean;
  backUrl: string;
}

const Form: React.FC<FormProps> = ({
  isLoading,
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  values,
  validating,
  valid
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
              placeholder="Name"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Slug</label>

          <div className="control">
            <Field
              name="slug"
              component={StringInput}
              type="text"
              placeholder="slug"
              validate={composeValidators([required, mustBeSlug])}
            />
          </div>

          <p className="help is-info">
            {`${document.location.origin}/${values.slug ? values.slug : ''}`}
          </p>
        </div>

        <div className="field">
          <label className="label">
            <Trans>logo</Trans>
          </label>

          <div className="control">
            <Field
              name="logoUrl"
              render={(
                props: FieldRenderProps<FileReference | string, HTMLElement>
              ) => (
                <ImageUpload
                  {...props}
                  imageType="organization-logos"
                  initialFileReference={
                    values.logoUrl
                      ? mapOrganizationLogoToApiFileReference(values)
                      : undefined
                  }
                />
              )}
              parse={(value: FileReference) => {
                if (!value) return '';

                return mapFileReferenceToApiOrganizationLogo(value);
              }}
            />
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-12">
            <LoadingButton
              isLoading={isLoading}
              className="button is-primary"
              type="submit"
              disabled={submitting || pristine || !valid || validating}
            >
              <Trans>save</Trans>
            </LoadingButton>
          </div>
        </div>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>
            <Trans>back</Trans>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Form;
