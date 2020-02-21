import React from 'react';
import { TeamEntity } from '../Teams/state';
import { FormRenderProps, Field } from 'react-final-form';
import { DrawEntity, DEFAULT_DRAW_MATCH, DrawMatchEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import { FieldArray } from 'react-final-form-arrays';
import Select from '../Shared/UI/Form/Select';

interface MatchFormProps {
  index: number;
  name: string;
  onRemove: () => {};
  teams: TeamEntity[];
}

const MatchForm: React.FC<MatchFormProps> = ({
  index,
  name,
  onRemove,
  teams
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="field">
          <label className="label">First team</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamId`}
              component={Select}
              selectOptions={teams}
              getOptionLabel={(team: TeamEntity) => team.name}
              getOptionValue={(team: TeamEntity) => team.id}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First parent match id</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamParentMatchId`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First placeholder</label>

          <div className="control">
            <Field
              name={`${name}.firstTeamPlaceholder`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First team score</label>
          <div className="control">
            <Field
              name={`${name}.firstTeamScore`}
              component={StringInput}
              type="number"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second team</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamId`}
              component={Select}
              selectOptions={teams}
              getOptionLabel={(team: TeamEntity) => team.name}
              getOptionValue={(team: TeamEntity) => team.id}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second parent match id</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamParentMatchId`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second placeholder</label>

          <div className="control">
            <Field
              name={`${name}.secondTeamPlaceholder`}
              component={StringInput}
              type="text"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Second team score</label>
          <div className="control">
            <Field
              name={`${name}.secondTeamScore`}
              component={StringInput}
              type="number"
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
            <MatchForm
              key={name}
              index={index}
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
