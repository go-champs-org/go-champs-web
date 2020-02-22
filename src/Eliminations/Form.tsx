import React from 'react';
import { TeamEntity } from '../Teams/state';
import { FormRenderProps, Field } from 'react-final-form';
import {
  EliminationEntity,
  DEFAULT_ELIMINATION_TEAM_STAT,
  EliminationTeamStatEntity
} from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import Select from '../Shared/UI/Form/Select';

interface TeamStatFormProps {
  name: string;
  onRemove: () => {};
  teams: TeamEntity[];
}

const TeamStatForm: React.FC<TeamStatFormProps> = ({
  name,
  onRemove,
  teams
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="field">
          <label className="label">Team</label>

          <div className="control">
            <Field
              name={`${name}.teamId`}
              component={Select}
              selectOptions={teams}
              getOptionLabel={(team: TeamEntity) => team.name}
              getOptionValue={(team: TeamEntity) => team.id}
            />
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <div className="card-footer-item">
          <button className="button is-warning" onClick={onRemove}>
            Remove
          </button>
        </div>
      </footer>
    </div>
  );
};

interface FormProps extends FormRenderProps<EliminationEntity> {
  teams: { [key: string]: TeamEntity };
  push: (fieldName: string, draw: EliminationTeamStatEntity) => {};
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  submitting,
  push,
  pristine,
  teams
}) => {
  const selectTeams = Object.keys(teams).map((key: string) => teams[key]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>

        <div className="control">
          <Field name="title" component={StringInput} type="text" />
        </div>
      </div>

      <FieldArray name="teamStats">
        {({ fields }) =>
          fields.map((name, index) => (
            <TeamStatForm
              key={name}
              name={name}
              onRemove={() => fields.remove(index)}
              teams={selectTeams}
            />
          ))
        }
      </FieldArray>

      <button
        className="button is-fullwidth"
        type="button"
        onClick={() => push('teamStats', DEFAULT_ELIMINATION_TEAM_STAT)}
      >
        Add team stats
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
