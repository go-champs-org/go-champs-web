import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentTeamEntity, TournamentTeamState } from "./state";

const TournamentTeamCard: React.FC<{ onDeleteTournamentTeam: any, url: string, tournamentTeam: TournamentTeamEntity }> = ({ onDeleteTournamentTeam, url, tournamentTeam }) => (
	<div className="card item">
		<div className="card-header">
			<Link className="card-header-title" to={`${url}/TournamentTeamEdit/${tournamentTeam.id}`}>
				<span className="title is-6">
					{tournamentTeam.name}
				</span>
			</Link>
			<div className="card-header-icon">
				<button className="button is-text"
					onClick={() => onDeleteTournamentTeam(tournamentTeam)}>
					<i className="fas fa-trash"></i>
				</button>
			</div>
		</div>
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
			<div className="column is-8">
				<div className="columns is-mobile is-vcentered">
					<div className="column is-8">
						<h2 className="subtitle">
							Teams
						</h2>
					</div>
					<div className="column is-4 has-text-right">
						<Link className="button" to={`./TournamentTeamNew`}>
							New team
						</Link>
					</div>
				</div>
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