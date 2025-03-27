import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { TeamEntity } from './state';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  maxLength,
  required
} from '../Shared/UI/Form/Validators/commonValidators';
import { Trans } from 'react-i18next';
import ImageUpload from '../Shared/UI/Form/ImageUpload';
import TriCodeInput from '../Shared/UI/Form/TriCodeInput';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import {
  mapFileReferenceToApiTeamLogo,
  mapTeamLogoToApiFileReference
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
  </div>
);

interface FormProps extends FormRenderProps<TeamEntity> {
  backUrl: string;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
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
              placeholder="Name"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>triCode</Trans>
          </label>

          <div className="control">
            <Field
              name="triCode"
              type="text"
              placeholder="ABC"
              validate={maxLength(3)}
              render={props => (
                <TriCodeInput {...props} numberOfCharacters={3} />
              )}
            />
          </div>
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
                  imageType="team-logos"
                  initialFileReference={
                    values.logoUrl
                      ? mapTeamLogoToApiFileReference(values)
                      : undefined
                  }
                />
              )}
              parse={(value: FileReference) => {
                if (!value) return '';

                return mapFileReferenceToApiTeamLogo(value);
              }}
            />
          </div>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine || !valid}
        >
          <Trans>save</Trans>
        </LoadingButton>
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
