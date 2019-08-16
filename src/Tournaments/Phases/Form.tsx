import React from 'react';
import { Field } from 'react-final-form';
import Select from '../../Shared/UI/Form/Select';
import StringInput from '../../Shared/UI/Form/StringInput';
import { PhaseTypes } from './state';

interface FromProps {
  handleSubmit: any;
  submitting: boolean;
  pristine: boolean;
}

const Form: React.FC<FromProps> = ({ handleSubmit, submitting, pristine }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <Field
            name="title"
            component={StringInput}
            type="text"
            placeholder="Title"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <Field
            name="type"
            component={Select}
            selectOptions={Object.values(PhaseTypes)}
            getOptionLabel={(phaseType: string) => phaseType}
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
