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

const deleteGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingDeleteGame: true
});

const deleteGameFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteGame: false
});

const deleteGameSuccess = (
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

const postGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPostGame: true
});

const postGameFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostGame: false
});

const postGameSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity>
) => ({
  ...state,
  isLoadingPostGame: false,
  games: [action.payload].reduce(tournamentGameMapEntities, state.games)
});

const getGame = (state: GameState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestGame: true
});

const getGameFailure = (state: GameState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestGame: false
});

const getGameSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity>
) => ({
  ...state,
  isLoadingRequestGame: false,
  games: [action.payload].reduce(tournamentGameMapEntities, {})
});

const getGamesByFilter = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGames: true
});

const getGamesByFilterFailure = (
  state: GameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestGames: false
});

const getGamesByFilterSuccess = (
  state: GameState,
  action: HttpAction<ActionTypes, GameEntity[]>
) => ({
  ...state,
  isLoadingRequestGames: false,
  games: action.payload!.reduce(tournamentGameMapEntities, {})
});

const loadDefaultPhasePayload = (state: GameState) => ({
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
  [GET_TOURNAMENT_GAME]: getGame,
  [GET_TOURNAMENT_GAME_FAILURE]: getGameFailure,
  [GET_TOURNAMENT_GAME_SUCCESS]: getGameSuccess,
  [GET_TOURNAMENT_GAMES_BY_FILTER]: getGamesByFilter,
  [GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE]: getGamesByFilterFailure,
  [GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS]: getGamesByFilterSuccess
});
