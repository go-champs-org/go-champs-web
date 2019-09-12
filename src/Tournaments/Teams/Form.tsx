import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../../Shared/UI/Form/StringInput';

const Form: React.FC<FormRenderProps<any>> = ({
  handleSubmit,
  submitting,
  pristine
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
