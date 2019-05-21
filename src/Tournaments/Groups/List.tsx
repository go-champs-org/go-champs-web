import React from 'react';
import { TournamentGroupEntity, TournamentGroupState } from "./state";

const TournamentGroupCard: React.FC<{ onDeleteTournamentGroup: any, tournamentGroup: TournamentGroupEntity }> = ({ onDeleteTournamentGroup, tournamentGroup }) => (
	<div>
		{tournamentGroup.name}
		<button onClick={() => onDeleteTournamentGroup(tournamentGroup)}>Delete</button>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ deleteTournamentGroup: any, tournamentGroupState: TournamentGroupState, }> = ({ deleteTournamentGroup, tournamentGroupState }) => (
	<div>
		{tournamentGroupState.isLoadingRequestTournament ?
			<Loading /> :
			Object.keys(tournamentGroupState.tournamentGroups).map((key: string) => <TournamentGroupCard key={key} tournamentGroup={tournamentGroupState.tournamentGroups[key]} onDeleteTournamentGroup={deleteTournamentGroup} />)
		}
	</div>
);

export default List;