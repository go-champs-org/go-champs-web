import React from 'react';
import { Field } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import TeamStatsStructure from '../Shared/UI/Form/TeamStatsStructure';

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
          <Field name="name" component={StringInput} placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <label className="label">Slug</label>
        <div className="control">
          <Field name="slug" component={StringInput} placeholder="slug" />
        </div>
      </div>

      <div className="field">
        <label className="label">Team stats</label>
        <div className="control">
          <Field name="team_stats_structure" component={TeamStatsStructure} />
        </div>
      </div>

      <button
        className="button is-primary"
        type="submit"
        disabled={submitting || pristine}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
