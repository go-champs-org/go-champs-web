import React, { Fragment } from 'react';
import { TeamEntity } from '../Teams/state';
import { FormRenderProps, Field } from 'react-final-form';
import { DrawEntity, DEFAULT_DRAW_MATCH, DrawMatchEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import Select from '../Shared/UI/Form/Select';

interface MatchFormProps {
  teams: TeamEntity[];
  index: number;
}

const MatchForm: React.FC<MatchFormProps> = ({ index, teams }) => {
  return (
    <Fragment>
      <div className="field">
        <label className="label">First team</label>

        <div className="control">
          <Field
            name="firstTeam"
            component={Select}
            selectOptions={teams}
            getOptionLabel={(team: TeamEntity) => team.name}
          />
        </div>
      </div>
    </Fragment>
  );
};

interface FormProps extends FormRenderProps<DrawEntity> {
  teams: { [key: string]: TeamEntity };
  push: (fieldName: string, draw: DrawMatchEntity) => {};
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  submitting,
  push,
  pristine,
  teams
}) => {
  console.log('push', push);
  const selectTeams = Object.keys(teams).map((key: string) => teams[key]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>

        <div className="control">
          <Field name="title" component={StringInput} type="text" />
        </div>
      </div>

      <FieldArray name="matches">
        {({ fields }) =>
          fields.map((name, index) => (
            <MatchForm key={name} index={index} teams={selectTeams} />
          ))
        }
      </FieldArray>

      <button
        className="button is-fullwidth"
        type="button"
        onClick={() => push('matches', DEFAULT_DRAW_MATCH)}
      >
        Add match
      </button>

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
