import React from 'react';
import { Field } from 'react-final-form';
import StringInput from '../../Shared/UI/Form/StringInput';

interface FromProps {
  handleSubmit: any;
  submitting: boolean;
  pristine: boolean;
}

const Form: React.FC<FromProps> = ({ handleSubmit, submitting, pristine }) => {
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
