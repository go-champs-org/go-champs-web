import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { OrganizationEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';

export const FormLoading: React.FC = () => (
  <div className="columns is-multiline">
    <div className="column is-12">
      <label className="label">Name</label>
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
  values
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <Field
              name="name"
              component={StringInput}
              type="text"
              placeholder="Name"
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
            />
          </div>

          <p className="help is-info">
            {`${document.location.origin}/${values.slug ? values.slug : ''}`}
          </p>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          Save
        </LoadingButton>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default Form;
