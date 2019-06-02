import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentTeamEntity } from '../Teams/state';
import { default as TournamentGameForm } from './Form';
import { TournamentGameEntity } from './state';

interface TournamentGameEditProps {
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	patchTournamentGame: any;
	tournamentState: TournamentState;
	tournamentGame: TournamentGameEntity;
	tournamentTeams: { [key: string]: TournamentTeamEntity };
}

export const Edit: React.FC<TournamentGameEditProps> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	patchTournamentGame,
	tournamentGame,
	tournamentState,
	tournamentTeams,
}) => {
	const tournament = tournamentState.tournaments[currentTournamentSlug];
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<NavBar
					organizationSlug={currentOrganizationSlug}
					tournament={tournament}
					tournamentSlug={currentTournamentSlug}
				/>
			</header>
			<div className="column is-8">
				<div className="columns is-mobile is-vcentered">
					<div className="column is-8">
						<h2 className="subtitle">Edit Game</h2>
					</div>
				</div>
				<Form
					onSubmit={patchTournamentGame}
					initialValues={tournamentGame}
					render={(props: any) => <TournamentGameForm {...props} tournamentTeams={tournamentTeams} />}
				/>
			</div>
		</div>
	);
};

export default Edit;
