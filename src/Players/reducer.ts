import {
  ApiPlayer,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import {
  ActionTypes,
  DELETE_PLAYER,
  DELETE_PLAYER_FAILURE,
  DELETE_PLAYER_SUCCESS,
  PATCH_PLAYER,
  PATCH_PLAYER_FAILURE,
  PATCH_PLAYER_SUCCESS,
  POST_PLAYER,
  POST_PLAYER_FAILURE,
  POST_PLAYER_SUCCESS
} from './actions';
import { mapApiPlayerToPlayerEntity } from './dataMappers';
import { initialState, PlayerEntity, PlayerState } from './state';

const playerMapEntities = mapEntities<PlayerEntity>(returnProperty('id'));

const apiPlayerToEntities = apiDataToEntitiesOverride<ApiPlayer, PlayerEntity>(
  mapApiPlayerToPlayerEntity,
  returnProperty('id')
);

const deletePlayer = (state: PlayerState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingDeletePlayer: true
});

const deletePlayerFailure = (
  state: PlayerState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePlayer: false
});

const deletePlayerSuccess = (
  state: PlayerState,
  action: HttpAction<ActionTypes, string>
) => {
  const players = Object.keys(state.players)
    .filter(entityById(state.players, action.payload!))
    .reduce(mapEntitiesByKey(state.players), {});
  return {
    ...state,
    players,
    isLoadingDeletePlayer: false
  };
};

const patchPlayer = (state: PlayerState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPatchPlayer: true
});

const patchPlayerFailure = (
  state: PlayerState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPlayer: false
});

const patchPlayerSuccess = (
  state: PlayerState,
  action: HttpAction<ActionTypes, PlayerEntity>
) => ({
  ...state,
  isLoadingPatchPlayer: false,
  players: [action.payload].reduce(playerMapEntities, state.players)
});

const postPlayer = (state: PlayerState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPostPlayer: true
});

const postPlayerFailure = (
  state: PlayerState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPlayer: false
});

const postPlayerSuccess = (
  state: PlayerState,
  action: HttpAction<ActionTypes, ApiPlayer>
) => ({
  ...state,
  isLoadingPostPlayer: false,
  players: [action.payload!].reduce(apiPlayerToEntities, state.players)
});

const getTournamentSuccess = (
  state: PlayerState,
  action: HttpAction<ActionTypes, ApiTournamentWithDependecies>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  players: action.payload!.players
    ? action.payload!.players.reduce(apiPlayerToEntities, {})
    : {}
});

export default createReducer(initialState, {
  [DELETE_PLAYER]: deletePlayer,
  [DELETE_PLAYER_FAILURE]: deletePlayerFailure,
  [DELETE_PLAYER_SUCCESS]: deletePlayerSuccess,
  [PATCH_PLAYER]: patchPlayer,
  [PATCH_PLAYER_FAILURE]: patchPlayerFailure,
  [PATCH_PLAYER_SUCCESS]: patchPlayerSuccess,
  [POST_PLAYER]: postPlayer,
  [POST_PLAYER_FAILURE]: postPlayerFailure,
  [POST_PLAYER_SUCCESS]: postPlayerSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
