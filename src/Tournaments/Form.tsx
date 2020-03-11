import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { TournamentEntity } from './state';
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

interface FormProps extends FormRenderProps<TournamentEntity> {
  backUrl: string;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine
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
        </div>

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
        </div>

        <div className="field">
          <label className="label">Site</label>
          <div className="control">
            <Field
              name="siteUrl"
              component={StringInput}
              type="text"
              placeholder="www.your-site.com"
            />
          </div>
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
