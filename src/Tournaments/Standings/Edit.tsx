import React from 'react';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';

interface TournamentTeamEditProps {
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	postTournamentTeam: any;
	tournamentState: TournamentState;
}

export const Edit: React.FC<TournamentTeamEditProps> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	postTournamentTeam,
	tournamentState,
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
						<h2 className="subtitle">Edit Tournament Standings</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edit;
