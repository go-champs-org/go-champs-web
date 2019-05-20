import React from 'react';
import { TournamentTeamEntity, TournamentTeamState } from "./state";

const TournamentTeamCard: React.FC<{ onDeleteTournamentTeam: any, tournamentTeam: TournamentTeamEntity }> = ({ onDeleteTournamentTeam, tournamentTeam }) => (
	<div>
		{tournamentTeam.name}
		<button onClick={() => onDeleteTournamentTeam(tournamentTeam)}>Delete</button>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ deleteTournamentTeam: any, tournamentTeamState: TournamentTeamState, }> = ({ deleteTournamentTeam, tournamentTeamState }) => (
	<div>
		{tournamentTeamState.isLoadingRequestTournament ?
			<Loading /> :
			Object.keys(tournamentTeamState.tournamentTeams).map((key: string) => <TournamentTeamCard key={key} tournamentTeam={tournamentTeamState.tournamentTeams[key]} onDeleteTournamentTeam={deleteTournamentTeam} />)
		}
	</div>
);