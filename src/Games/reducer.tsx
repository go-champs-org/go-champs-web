import { createReducer, entityById, mapEntities, mapEntitiesByKey, returnProperty } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
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

const gameMapEntities = mapEntities(returnProperty('id'), mapGame);

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

export default createReducer(initialState, {
	[DELETE_GAME]: deleteGame,
	[DELETE_GAME_FAILURE]: deleteGameFailure,
	[DELETE_GAME_SUCCESS]: deleteGameSuccess,
	[POST_GAME]: postGame,
	[POST_GAME_FAILURE]: postGameFailure,
	[POST_GAME_SUCCESS]: postGameSuccess,
});