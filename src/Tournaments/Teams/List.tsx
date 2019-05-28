import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentTeamEntity, TournamentTeamState } from "./state";

const TournamentTeamCard: React.FC<{ onDeleteTournamentTeam: any, url: string, tournamentTeam: TournamentTeamEntity }> = ({ onDeleteTournamentTeam, url, tournamentTeam }) => (
	<div>
		{tournamentTeam.name}
		<button onClick={() => onDeleteTournamentTeam(tournamentTeam)}>Delete</button>
		<Link to={`${url}/TournamentTeamEdit/${tournamentTeam.id}`}>Edit</Link>
	</div>
);

export const List: React.FC<{ currentOrganizationSlug: string, currentTournamentSlug: string, deleteTournamentTeam: any, tournamentTeamState: TournamentTeamState, tournamentState: TournamentState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentTeam, url, tournamentTeamState, tournamentState }) => {
	const tournament = tournamentState.tournaments[currentTournamentSlug];
	const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<NavBar
					organizationSlug={currentOrganizationSlug}
					tournament={tournament}
					tournamentSlug={currentTournamentSlug} />
			</header>
			<div className="column is-12">
				<h2 className="subtitle">
					Teams
				</h2>
				{Object.keys(tournamentTeamState.tournamentTeams).map((key: string) => <TournamentTeamCard key={key} url={baseTournamentUrl} tournamentTeam={tournamentTeamState.tournamentTeams[key]} onDeleteTournamentTeam={deleteTournamentTeam} />)}
			</div>
		</div>
	);
};

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const Wrapper: React.FC<{ deleteTournamentTeam: any, currentOrganizationSlug: string, currentTournamentSlug: string, tournamentState: TournamentState, tournamentTeamState: TournamentTeamState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentTeam, tournamentState, tournamentTeamState, url }) => {
	if (tournamentTeamState.isLoadingRequestTournament) {
		return <Loading />
	}

	return <List
		currentOrganizationSlug={currentOrganizationSlug}
		currentTournamentSlug={currentTournamentSlug}
		deleteTournamentTeam={deleteTournamentTeam}
		tournamentState={tournamentState}
		tournamentTeamState={tournamentTeamState}
		url={url} />;
};

export default Wrapper;