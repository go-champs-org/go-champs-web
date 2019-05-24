import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentTeamEntity, TournamentTeamState } from "./state";

const TournamentTeamCard: React.FC<{ onDeleteTournamentTeam: any, url: string, tournamentTeam: TournamentTeamEntity }> = ({ onDeleteTournamentTeam, url, tournamentTeam }) => (
	<div>
		{tournamentTeam.name}
		<button onClick={() => onDeleteTournamentTeam(tournamentTeam)}>Delete</button>
		<Link to={`${url}/TournamentTeamEdit/${tournamentTeam.id}`}>Edit</Link>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ deleteTournamentTeam: any, url: string, tournamentTeamState: TournamentTeamState, }> = ({ deleteTournamentTeam, url, tournamentTeamState }) => (
	<div>
		{tournamentTeamState.isLoadingRequestTournament ?
			<Loading /> :
			Object.keys(tournamentTeamState.tournamentTeams).map((key: string) => <TournamentTeamCard key={key} url={url} tournamentTeam={tournamentTeamState.tournamentTeams[key]} onDeleteTournamentTeam={deleteTournamentTeam} />)
		}
	</div>
);

export default List;