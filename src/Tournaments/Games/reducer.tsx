import { createReducer, entityById, mapEntities, mapEntitiesByKey, returnProperty } from "../../Shared/store/helpers";
import { HttpAction } from "../../Shared/store/interfaces";
import { ActionTypes, DELETE_TOURNAMENT_GAME, DELETE_TOURNAMENT_GAME_FAILURE, DELETE_TOURNAMENT_GAME_SUCCESS, POST_TOURNAMENT_GAME, POST_TOURNAMENT_GAME_FAILURE, POST_TOURNAMENT_GAME_SUCCESS } from "./actions";
import { initialState, TournamentGameState } from "./state";

const mapTournamentGame = (apiData: any) => ({
	id: apiData.id,
	game: {
		awayScore: apiData.game.away_score,
		awayTeamName: apiData.game.away_team_name,
		datetime: apiData.game.datetime,
		homeScore: apiData.game.home_score,
		homeTeamName: apiData.game.home_team_name,
		location: apiData.game.location,
	},
});

const tournamentGameMapEntities = mapEntities(returnProperty('id'), mapTournamentGame);

export const deleteTournamentGame = (state: TournamentGameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournamentGame: true,
});

export const deleteTournamentGameFailure = (state: TournamentGameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournamentGame: false,
});

export const deleteTournamentGameSuccess = (state: TournamentGameState, action: HttpAction<ActionTypes>) => {
	const tournamentGames = Object.keys(state.tournamentGames)
		.filter(entityById(state.tournamentGames, action.payload))
		.reduce(mapEntitiesByKey(state.tournamentGames), {});
	return {
		...state,
		isLoadingDeleteTournamentGame: false,
		tournamentGames,
	}
};

export const postTournamentGame = (state: TournamentGameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGame: true,
});

export const postTournamentGameFailure = (state: TournamentGameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGame: false,
});

export const postTournamentGameSuccess = (state: TournamentGameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGame: false,
	tournamentGames: [action.payload.data].reduce(tournamentGameMapEntities, state.tournamentGames),
});

export default createReducer(initialState, {
	[DELETE_TOURNAMENT_GAME]: deleteTournamentGame,
	[DELETE_TOURNAMENT_GAME_FAILURE]: deleteTournamentGameFailure,
	[DELETE_TOURNAMENT_GAME_SUCCESS]: deleteTournamentGameSuccess,
	[POST_TOURNAMENT_GAME]: postTournamentGame,
	[POST_TOURNAMENT_GAME_FAILURE]: postTournamentGameFailure,
	[POST_TOURNAMENT_GAME_SUCCESS]: postTournamentGameSuccess,
});