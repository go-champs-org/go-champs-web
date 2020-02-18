import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Datetime from '../Shared/UI/Form/Datetime';
import Select from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import { TeamEntity } from '../Teams/state';
import { GameEntity } from './state';

interface FromProps extends FormRenderProps<GameEntity> {
  teams: { [key: string]: TeamEntity };
}

const Form: React.FC<FromProps> = ({
  handleSubmit,
  submitting,
  pristine,
  teams
}) => {
  const selectTeams = Object.keys(teams).map((key: string) => teams[key]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Away team</label>
        <div className="control">
          <Field
            name="awayTeam"
            component={Select}
            selectOptions={selectTeams}
            getOptionLabel={(team: TeamEntity) => team.name}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Away score</label>
        <div className="control">
          <Field name="awayScore" component={StringInput} type="number" />
        </div>
      </div>

      <div className="field">
        <label className="label">Home team</label>
        <div className="control">
          <Field
            name="homeTeam"
            component={Select}
            selectOptions={selectTeams}
            getOptionLabel={(team: TeamEntity) => team.name}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Home score</label>
        <div className="control">
          <Field name="homeScore" component={StringInput} type="number" />
        </div>
      </div>

      <div className="field">
        <label className="label">Date / Time</label>
        <Field
          name="datetime"
          component={Datetime}
          type="text"
          placeholder="Date / time"
        />
      </div>

      <div className="field">
        <label className="label">Location</label>
        <div className="control">
          <Field
            name="location"
            component={StringInput}
            type="text"
            placeholder="Location"
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
