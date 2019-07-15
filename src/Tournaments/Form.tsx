import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import TeamStatsStructure from '../Shared/UI/Form/TeamStatsStructure';

const Form: React.FC<FormRenderProps> = ({ handleSubmit, submitting, pristine, values }) => {
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

      <div className="field">
        {JSON.stringify(values)}
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
