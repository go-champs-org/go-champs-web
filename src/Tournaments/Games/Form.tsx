import React from 'react';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import Select from '../../Shared/UI/Form/Select';
import { TournamentTeamEntity } from '../Teams/state';


interface FromProps extends FormRenderProps {
	tournamentTeams: { [key: string]: TournamentTeamEntity }
}

const Input: React.FC<FieldRenderProps<HTMLInputElement>> = ({
	input,
	meta
}) => <input className="input" type="text" {...input} />;

const Form: React.FC<FromProps> = ({ handleSubmit, submitting, pristine, values, tournamentTeams }) => {
	const selectTeams = Object.keys(tournamentTeams).map((key: string) => tournamentTeams[key]);
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label className="label">Away team</label>
				<div className="control">
					<Field name="awayTeam"
						component={Select}
						selectOptions={selectTeams}
						getOptionLabel={(team: TournamentTeamEntity) => team.name} />
				</div>
			</div>

			<div className="field">
				<label className="label">Away score</label>
				<div className="control">
					<Field name="awayScore" component={Input} type="number" />
				</div>
			</div>

			<div className="field">
				<label className="label">Home team</label>
				<div className="control">
					<Field name="homeTeam"
						component={Select}
						selectOptions={selectTeams}
						getOptionLabel={(team: TournamentTeamEntity) => team.name} />
				</div>
			</div>

			<div className="field">
				<label className="label">Home score</label>
				<div className="control">
					<Field name="homeScore" component={Input} type="number" />
				</div>
			</div>

			<div className="field">
				<label className="label">Date / Time</label>
				<div className="control">
					<Field name="datetime" component={Input} type="text" placeholder="Date / time" />
				</div>
			</div>

			<div className="field">
				<label className="label">Location</label>
				<div className="control">
					<Field name="location" component={Input} type="text" placeholder="Location" />
				</div>
			</div>

			<button
				className="button is-primary"
				type="submit"
				disabled={submitting || pristine}>
				Submit
      </button>
		</form>
	);
};

export default Form;
