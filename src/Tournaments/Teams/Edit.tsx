import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { default as TournamentTeamForm } from './Form';
import { TournamentTeamEntity } from './state';

interface TournamentTeamEditProps {
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	postTournamentTeam: any;
	tournamentState: TournamentState;
	tournamentTeam: TournamentTeamEntity;
}

export const Edit: React.FC<TournamentTeamEditProps> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	postTournamentTeam,
	tournamentState,
	tournamentTeam,
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
						<h2 className="subtitle">Edit Team</h2>
					</div>
				</div>
				<Form
					onSubmit={postTournamentTeam}
					initialValues={tournamentTeam}
					render={TournamentTeamForm}
				/>
			</div>
		</div>
	);
};

export default Edit;
