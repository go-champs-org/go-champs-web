import { createReducer, entityById, mapEntities, mapEntitiesByKey, returnProperty } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { REQUEST_TOURNAMENT_GAME, REQUEST_TOURNAMENT_GAMES, REQUEST_TOURNAMENT_GAMES_FAILURE, REQUEST_TOURNAMENT_GAMES_SUCCESS, REQUEST_TOURNAMENT_GAME_FAILURE, REQUEST_TOURNAMENT_GAME_SUCCESS } from "../Tournaments/Games/actions";
import { ActionTypes, DELETE_GAME, DELETE_GAME_FAILURE, DELETE_GAME_SUCCESS, POST_GAME, POST_GAME_FAILURE, POST_GAME_SUCCESS } from "./actions";
import { GameState, initialState } from "./state";

const mapGame = (apiData: any) => ({
	id: apiData.id,
	awayScore: apiData.away_score,
	awayTeamName: apiData.away_team_name,
	datetime: apiData.datetime,
	homeScore: apiData.home_score,
	homeTeamName: apiData.home_team_name,
	location: apiData.location,
});

const mapTournamentGame = (apiData: any) => ({
	id: apiData.game.id,
	awayScore: apiData.game.away_score,
	awayTeamName: apiData.game.away_team_name,
	datetime: apiData.game.datetime,
	homeScore: apiData.game.home_score,
	homeTeamName: apiData.game.home_team_name,
	location: apiData.game.location,
});

const returnTournamentGameId = (apiData: any) => (
	apiData.game.id
);

const gameMapEntities = mapEntities(returnProperty('id'), mapGame);
const tournamentGameMapEntities = mapEntities(returnTournamentGameId, mapTournamentGame);

export const deleteGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteGame: true,
});

export const deleteGameFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteGame: false,
});

export const deleteGameSuccess = (state: GameState, action: HttpAction<ActionTypes>) => {
	const games = Object.keys(state.games)
		.filter(entityById(state.games, action.payload))
		.reduce(mapEntitiesByKey(state.games), {});
	return {
		...state,
		isLoadingDeleteGame: false,
		games,
	}
};

export const patchGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchGame: true,
});

export const patchGameFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchGame: false,
});

export const patchGameSuccess = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchGame: false,
	games: [action.payload.data].reduce(gameMapEntities, state.games),
});

export const postGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostGame: true,
});

export const postGameFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostGame: false,
});

export const postGameSuccess = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostGame: false,
	games: [action.payload.data].reduce(gameMapEntities, state.games),
});

export const requestTournamentGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGame: true,
});

export const requestTournamentGameFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGame: false,
});

export const requestTournamentGameSuccess = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGame: false,
	games: [action.payload.data].reduce(tournamentGameMapEntities, {}),
});

export const requestTournamentGames = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGames: true,
});

export const requestTournamentGamesFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGames: false,
});

export const requestTournamentGamesSuccess = (state: GameState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournamentGames: false,
	games: action.payload.data.reduce(tournamentGameMapEntities, {}),
});

export default createReducer(initialState, {
	[DELETE_GAME]: deleteGame,
	[DELETE_GAME_FAILURE]: deleteGameFailure,
	[DELETE_GAME_SUCCESS]: deleteGameSuccess,
	[POST_GAME]: postGame,
	[POST_GAME_FAILURE]: postGameFailure,
	[POST_GAME_SUCCESS]: postGameSuccess,
	[REQUEST_TOURNAMENT_GAME]: requestTournamentGame,
	[REQUEST_TOURNAMENT_GAME_FAILURE]: requestTournamentGameFailure,
	[REQUEST_TOURNAMENT_GAME_SUCCESS]: requestTournamentGameSuccess,
	[REQUEST_TOURNAMENT_GAMES]: requestTournamentGames,
	[REQUEST_TOURNAMENT_GAMES_FAILURE]: requestTournamentGamesFailure,
	[REQUEST_TOURNAMENT_GAMES_SUCCESS]: requestTournamentGamesSuccess,
});