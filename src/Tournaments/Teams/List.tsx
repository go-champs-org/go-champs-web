import React from 'react';
import { TournamentTeamEntity, TournamentTeamState } from "./state";

const TournamentTeamCard: React.FC<{ tournamentTeam: TournamentTeamEntity }> = ({ tournamentTeam }) => (
	<div>
		{tournamentTeam.name}
		<button>Delete</button>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ tournamentTeamState: TournamentTeamState }> = ({ tournamentTeamState }) => (
	<div>
		{tournamentTeamState.isLoadingRequestTournament ?
			<Loading /> :
			Object.keys(tournamentTeamState.tournamentTeams).map((key: string) => <TournamentTeamCard key={key} tournamentTeam={tournamentTeamState.tournamentTeams[key]} />)
		}
	</div>
);