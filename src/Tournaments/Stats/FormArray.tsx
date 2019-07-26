import React from 'react';
import { Field, Form } from 'react-final-form';
import StringInput from '../../Shared/UI/Form/StringInput';
import { TournamentStatEntity } from './state';

interface FromProps {
	handleSubmit: any;
	submitting: boolean;
	pristine: boolean;
	values: TournamentStatEntity;
}
//// onClick={() => onDeleteTournamentGame(tournamentGame)}
const TournamentStatForm: React.FC<FromProps> = ({ handleSubmit, submitting, pristine, values }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="columns">
				<div className="column is-10">
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
				</div>
				<div className="column is-2 has-text-right">
					<button className="button is-primary"
						type="submit"
						disabled={submitting || pristine}>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

interface FromArrayProps {
	deleteTournamentStat: any;
	pacthTournamentStat: any;
	postTournamentStat: any;
	tournamentStat: { [key: string]: TournamentStatEntity };
}

const FormArray: React.FC<FromArrayProps> = ({ deleteTournamentStat, pacthTournamentStat, postTournamentStat, tournamentStat }) => {
	return (
		<div>
			<Form
				onSubmit={postTournamentStat}
				initialValues={{ id: '', title: '' }}
				render={TournamentStatForm} />
			{Object.keys(tournamentStat).map((key: string) => (
				<div className="columns">
					<div className="column is-10">
						<Form
							onSubmit={pacthTournamentStat}
							initialValues={tournamentStat[key]}
							render={TournamentStatForm} />
					</div>
					<div className="column is-2 has-text-right">
						<button className="button is-text"
							onClick={() => deleteTournamentStat(tournamentStat[key])}>
							<i className="fas fa-trash" />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default FormArray;
