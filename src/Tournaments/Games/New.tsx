import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentTeamEntity } from '../Teams/state';
import { default as TournamentGameForm } from './Form';

interface TournamentGameNewProps {
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	postTournamentGame: any;
	tournamentState: TournamentState;
	tournamentTeams: { [key: string]: TournamentTeamEntity };
}

export const New: React.FC<TournamentGameNewProps> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	postTournamentGame,
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
						<h2 className="subtitle">New Game</h2>
					</div>
				</div>
				<Form
					onSubmit={postTournamentGame}
					initialValues={{ datetime: '', location: '' }}
					render={(props: any) => <TournamentGameForm {...props} tournamentTeams={tournamentTeams} />}
				/>
			</div>
		</div>
	);
};

export default New;
