import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { LOAD_DEFAULT_PHASE } from '../Shared/store/routerActions';
import {
  ActionTypes,
  DELETE_TOURNAMENT_GAME,
  DELETE_TOURNAMENT_GAME_FAILURE,
  DELETE_TOURNAMENT_GAME_SUCCESS,
  GET_TOURNAMENT_GAME,
  GET_TOURNAMENT_GAMES_BY_FILTER,
  GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE,
  GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  GET_TOURNAMENT_GAME_FAILURE,
  GET_TOURNAMENT_GAME_SUCCESS,
  POST_TOURNAMENT_GAME,
  POST_TOURNAMENT_GAME_FAILURE,
  POST_TOURNAMENT_GAME_SUCCESS
} from './actions';
import { GameEntity, GameState, initialState } from './state';

const tournamentGameMapEntities = mapEntities<GameEntity>(returnProperty('id'));

export const deleteGame = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteGame: true
});

export const deleteGameFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteGame: false
});

export const deleteGameSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => {
  const games = Object.keys(state.games)
    .filter(entityById(state.games, action.payload))
    .reduce(mapEntitiesByKey(state.games), {});
  return {
    ...state,
    isLoadingDeleteGame: false,
    games
  };
};

export const postGame = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostGame: true
});

export const postGameFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostGame: false
});

export const postGameSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity>
) => ({
  ...state,
  isLoadingPostGame: false,
  games: [action.payload].reduce(tournamentGameMapEntities, state.games)
});

export const requestGame = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGame: true
});

export const requestGameFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGame: false
});

export const requestGameSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity>
) => ({
  ...state,
  isLoadingRequestGame: false,
  games: [action.payload].reduce(tournamentGameMapEntities, {})
});

export const requestGamesByFilter = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGames: true
});

export const requestGamesByFilterFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGames: false
});

export const requestGamesByFilterSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity[]>
) => ({
  ...state,
  isLoadingRequestGames: false,
  games: action.payload!.reduce(tournamentGameMapEntities, {})
});

export const loadDefaultPhasePayload = (state: GameState) => ({
  ...state,
  isLoadingRequestGames: true
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_GAME]: deleteGame,
  [DELETE_TOURNAMENT_GAME_FAILURE]: deleteGameFailure,
  [DELETE_TOURNAMENT_GAME_SUCCESS]: deleteGameSuccess,
  [LOAD_DEFAULT_PHASE]: loadDefaultPhasePayload,
  [POST_TOURNAMENT_GAME]: postGame,
  [POST_TOURNAMENT_GAME_FAILURE]: postGameFailure,
  [POST_TOURNAMENT_GAME_SUCCESS]: postGameSuccess,
  [GET_TOURNAMENT_GAME]: requestGame,
  [GET_TOURNAMENT_GAME_FAILURE]: requestGameFailure,
  [GET_TOURNAMENT_GAME_SUCCESS]: requestGameSuccess,
  [GET_TOURNAMENT_GAMES_BY_FILTER]: requestGamesByFilter,
  [GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE]: requestGamesByFilterFailure,
  [GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS]: requestGamesByFilterSuccess
});
