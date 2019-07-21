import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';

const Form: React.FC<FormRenderProps> = ({
  handleSubmit,
  submitting,
  pristine,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <Field name="name" component={StringInput} placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <label className="label">Slug</label>
        <div className="control">
          <Field name="slug" component={StringInput} placeholder="slug" />
        </div>
      </div>

      <button
        className="button is-primary"
        type="submit"
        disabled={submitting || pristine}
      >
        Save
      </button>
    </form>
  );
};

export default Form;
