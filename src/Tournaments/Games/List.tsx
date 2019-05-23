import React from 'react';
import { TournamentGameEntity, TournamentGameState } from "./state";

const TournamentGameCard: React.FC<{ onDeleteTournamentGame: any, tournamentGame: TournamentGameEntity }> = ({ onDeleteTournamentGame, tournamentGame }) => (
	<div>
		<br />
		<div style={{ background: 'red' }}>
			{tournamentGame.game.awayTeamName}
			-
			{tournamentGame.game.awayScore}
		</div>
		<div style={{ background: 'green' }}>
			{tournamentGame.game.homeTeamName}
			-
			{tournamentGame.game.homeScore}
		</div>
		<p>
			{tournamentGame.game.location}
		</p>
		<p>
			{tournamentGame.game.datetime}
		</p>
		<button onClick={() => onDeleteTournamentGame(tournamentGame)}>Delete</button>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ deleteTournamentGame: any, tournamentGameState: TournamentGameState, }> = ({ deleteTournamentGame, tournamentGameState }) => (
	<div>
		{tournamentGameState.isLoadingRequestTournamentGames ?
			<Loading /> :
			Object.keys(tournamentGameState.tournamentGames).map((key: string) => <TournamentGameCard key={key} tournamentGame={tournamentGameState.tournamentGames[key]} onDeleteTournamentGame={deleteTournamentGame} />)
		}
	</div>
);

export default List;