import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import { LOAD_DEFAULT_PHASE } from '../../Shared/store/routerActions';
import {
  ActionTypes,
  DELETE_TOURNAMENT_GAME,
  DELETE_TOURNAMENT_GAME_FAILURE,
  DELETE_TOURNAMENT_GAME_SUCCESS,
  POST_TOURNAMENT_GAME,
  POST_TOURNAMENT_GAME_FAILURE,
  POST_TOURNAMENT_GAME_SUCCESS,
  REQUEST_TOURNAMENT_GAME,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE,
  REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  REQUEST_TOURNAMENT_GAME_FAILURE,
  REQUEST_TOURNAMENT_GAME_SUCCESS
} from './actions';
import {
  initialState,
  TournamentGameEntity,
  TournamentGameState
} from './state';

const tournamentGameMapEntities = mapEntities<TournamentGameEntity>(
  returnProperty('id')
);

export const deleteTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGame: true
});

export const deleteTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGame: false
});

export const deleteTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => {
  const tournamentGames = Object.keys(state.tournamentGames)
    .filter(entityById(state.tournamentGames, action.payload))
    .reduce(mapEntitiesByKey(state.tournamentGames), {});
  return {
    ...state,
    isLoadingDeleteTournamentGame: false,
    tournamentGames
  };
};

export const postTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGame: true
});

export const postTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGame: false
});

export const postTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes, TournamentGameEntity>
) => ({
  ...state,
  isLoadingPostTournamentGame: false,
  tournamentGames: [action.payload].reduce(
    tournamentGameMapEntities,
    state.tournamentGames
  )
});

export const requestTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGame: true
});

export const requestTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGame: false
});

export const requestTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes, TournamentGameEntity>
) => ({
  ...state,
  isLoadingRequestTournamentGame: false,
  tournamentGames: [action.payload].reduce(tournamentGameMapEntities, {})
});

export const requestTournamentGamesByFilter = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGames: true
});

export const requestTournamentGamesByFilterFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGames: false
});

export const requestTournamentGamesByFilterSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes, TournamentGameEntity[]>
) => ({
  ...state,
  isLoadingRequestTournamentGames: false,
  tournamentGames: action.payload!.reduce(tournamentGameMapEntities, {})
});

export const loadDefaultPhasePayload = (state: TournamentGameState) => ({
  ...state,
  isLoadingRequestTournamentGames: true
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_GAME]: deleteTournamentGame,
  [DELETE_TOURNAMENT_GAME_FAILURE]: deleteTournamentGameFailure,
  [DELETE_TOURNAMENT_GAME_SUCCESS]: deleteTournamentGameSuccess,
  [LOAD_DEFAULT_PHASE]: loadDefaultPhasePayload,
  [POST_TOURNAMENT_GAME]: postTournamentGame,
  [POST_TOURNAMENT_GAME_FAILURE]: postTournamentGameFailure,
  [POST_TOURNAMENT_GAME_SUCCESS]: postTournamentGameSuccess,
  [REQUEST_TOURNAMENT_GAME]: requestTournamentGame,
  [REQUEST_TOURNAMENT_GAME_FAILURE]: requestTournamentGameFailure,
  [REQUEST_TOURNAMENT_GAME_SUCCESS]: requestTournamentGameSuccess,
  [REQUEST_TOURNAMENT_GAMES_BY_FILTER]: requestTournamentGamesByFilter,
  [REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE]: requestTournamentGamesByFilterFailure,
  [REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS]: requestTournamentGamesByFilterSuccess
});
