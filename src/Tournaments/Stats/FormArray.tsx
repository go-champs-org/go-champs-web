import React from 'react';
import { Field, Form } from 'react-final-form';
import StringInput from '../../Shared/UI/Form/StringInput';
import { TournamentStatEntity } from './state';

interface FromProps {
	handleSubmit: any;
	submitting: boolean;
	pristine: boolean;
}

const TournamentStatForm: React.FC<FromProps> = ({ handleSubmit, submitting, pristine }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<div className="control">
					<Field
						name="title"
						component={StringInput}
						type="text"
						placeholder="Title"
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

interface FromArrayProps {
	pacthTournamentStat: any;
	postTournamentStat: any;
	tournamentStat: { [key: string]: TournamentStatEntity };
}

const FormArray: React.FC<FromArrayProps> = ({ pacthTournamentStat, postTournamentStat, tournamentStat }) => {
	return (
		<div>
			{Object.keys(tournamentStat).map((key: string) =>
				<Form
					onSubmit={pacthTournamentStat}
					initialValues={tournamentStat[key]}
					render={TournamentStatForm} />)}
		</div>
	)
}

export default FormArray;
