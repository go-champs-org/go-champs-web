import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentGroupEntity, TournamentGroupState } from "./state";

const TournamentGroupCard: React.FC<{ onDeleteTournamentGroup: any, url: string, tournamentGroup: TournamentGroupEntity }> = ({ onDeleteTournamentGroup, url, tournamentGroup }) => (
	<div>
		{tournamentGroup.name}
		<button onClick={() => onDeleteTournamentGroup(tournamentGroup)}>Delete</button>
		<Link to={`${url}/TournamentGroupEdit/${tournamentGroup.id}`}>Edit</Link>
	</div>
);

export const List: React.FC<{ currentOrganizationSlug: string, currentTournamentSlug: string, deleteTournamentGroup: any, tournamentGroupState: TournamentGroupState, tournamentState: TournamentState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentGroup, url, tournamentGroupState, tournamentState }) => {
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
					Groups
				</h2>
				{Object.keys(tournamentGroupState.tournamentGroups).map((key: string) => <TournamentGroupCard key={key} url={baseTournamentUrl} tournamentGroup={tournamentGroupState.tournamentGroups[key]} onDeleteTournamentGroup={deleteTournamentGroup} />)}
			</div>
		</div>
	);
};

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const Wrapper: React.FC<{ deleteTournamentGroup: any, currentOrganizationSlug: string, currentTournamentSlug: string, tournamentState: TournamentState, tournamentGroupState: TournamentGroupState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentGroup, tournamentState, tournamentGroupState, url }) => {
	if (tournamentGroupState.isLoadingRequestTournament) {
		return <Loading />
	}

	return <List
		currentOrganizationSlug={currentOrganizationSlug}
		currentTournamentSlug={currentTournamentSlug}
		deleteTournamentGroup={deleteTournamentGroup}
		tournamentState={tournamentState}
		tournamentGroupState={tournamentGroupState}
		url={url} />;
};

export default Wrapper;