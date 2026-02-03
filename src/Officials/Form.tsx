import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { OfficialEntity } from './state';
import Shimmer from '../Shared/UI/Shimmer';

export function FormLoading(): React.ReactElement {
  return (
    <div className="columns is-multiline">
      <div className="column is-12">
        <label className="label">
          <Trans>fullName</Trans>
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
        <label className="label">
          <Trans>licenseNumber</Trans>
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
        <label className="label">
          <Trans>username</Trans>
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
}

interface FormProps extends FormRenderProps<OfficialEntity> {
  backUrl: string;
  isLoading: boolean;
}

function Form({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine
}: FormProps): React.ReactElement {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>fullName</Trans>
          </label>

          <div className="control">
            <Field name="name" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>licenseNumber</Trans>
          </label>

          <div className="control">
            <Field name="licenseNumber" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>username</Trans>
          </label>

          <div className="control">
            <Field name="username" component={StringInput} />
          </div>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
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
}

export default Form;
