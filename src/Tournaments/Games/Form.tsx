import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Datetime from '../../Shared/UI/Form/Datetime';
import Select from '../../Shared/UI/Form/Select';
import StringInput from '../../Shared/UI/Form/StringInput';
import { TournamentTeamEntity } from '../Teams/state';

interface FromProps extends FormRenderProps {
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}

const Form: React.FC<FromProps> = ({
  handleSubmit,
  submitting,
  pristine,
  values,
  tournamentTeams
}) => {
  const selectTeams = Object.keys(tournamentTeams).map(
    (key: string) => tournamentTeams[key]
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Away team</label>
        <div className="control">
          <Field
            name="awayTeam"
            component={Select}
            selectOptions={selectTeams}
            getOptionLabel={(team: TournamentTeamEntity) => team.name}
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
            getOptionLabel={(team: TournamentTeamEntity) => team.name}
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
