import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentGroupEntity, TournamentGroupState } from "./state";

const TournamentGroupCard: React.FC<{ onDeleteTournamentGroup: any, url: string, tournamentGroup: TournamentGroupEntity }> = ({ onDeleteTournamentGroup, url, tournamentGroup }) => (
	<div>
		{tournamentGroup.name}
		<button onClick={() => onDeleteTournamentGroup(tournamentGroup)}>Delete</button>
		<Link to={`${url}/TournamentGroupEdit/${tournamentGroup.id}`}>Edit</Link>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ deleteTournamentGroup: any, url: string, tournamentGroupState: TournamentGroupState, }> = ({ deleteTournamentGroup, url, tournamentGroupState }) => (
	<div>
		{tournamentGroupState.isLoadingRequestTournament ?
			<Loading /> :
			Object.keys(tournamentGroupState.tournamentGroups).map((key: string) => <TournamentGroupCard key={key} url={url} tournamentGroup={tournamentGroupState.tournamentGroups[key]} onDeleteTournamentGroup={deleteTournamentGroup} />)
		}
	</div>
);

export default List;