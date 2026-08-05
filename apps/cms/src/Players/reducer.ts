import {
  ActionTypes as PlayerIdentityActionTypes,
  DELETE_PLAYER_IDENTITY,
  DELETE_PLAYER_IDENTITY_FAILURE,
  DELETE_PLAYER_IDENTITY_SUCCESS,
  POST_PLAYER_IDENTITY,
  POST_PLAYER_IDENTITY_FAILURE,
  POST_PLAYER_IDENTITY_SUCCESS,
  PUT_PLAYER_IDENTITY,
  PUT_PLAYER_IDENTITY_FAILURE,
  PUT_PLAYER_IDENTITY_SUCCESS,
  REQUEST_PLAYER_IDENTITY,
  REQUEST_PLAYER_IDENTITY_FAILURE,
  REQUEST_PLAYER_IDENTITY_NOT_FOUND,
  REQUEST_PLAYER_IDENTITY_SUCCESS
} from '../PlayerIdentities/actions';
import {
  DEFAULT_PLAYER_IDENTITY,
  PlayerIdentityEntity
} from '../PlayerIdentities/state';
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

const playerIdentityMapEntities = mapEntities<PlayerIdentityEntity>(
  returnProperty('playerId')
);

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
  action: HttpAction<ActionTypes, PlayerEntity>
) => ({
  ...state,
  isLoadingPostPlayer: false,
  players: [action.payload!].reduce(playerMapEntities, state.players)
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

const deletePlayerIdentity = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingDeletePlayerIdentity: true
});

const deletePlayerIdentityFailure = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingDeletePlayerIdentity: false
});

const deletePlayerIdentitySuccess = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes, string>
) => {
  const playerIdentities = Object.keys(state.playerIdentities)
    .filter(playerId => playerId !== action.payload)
    .reduce(mapEntitiesByKey(state.playerIdentities), {});
  return {
    ...state,
    playerIdentities,
    isLoadingDeletePlayerIdentity: false
  };
};

const postPlayerIdentity = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: true
});

const postPlayerIdentityFailure = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: false
});

const postPlayerIdentitySuccess = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const putPlayerIdentity = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: true
});

const putPlayerIdentityFailure = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: false
});

const putPlayerIdentitySuccess = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const requestPlayerIdentity = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: true
});

const requestPlayerIdentityFailure = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false
});

const requestPlayerIdentitySuccess = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const requestPlayerIdentityNotFound = (
  state: PlayerState,
  action: HttpAction<PlayerIdentityActionTypes, string>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: [
    { ...DEFAULT_PLAYER_IDENTITY, playerId: action.payload! }
  ].reduce(playerIdentityMapEntities, state.playerIdentities)
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
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess,
  [DELETE_PLAYER_IDENTITY]: deletePlayerIdentity,
  [DELETE_PLAYER_IDENTITY_FAILURE]: deletePlayerIdentityFailure,
  [DELETE_PLAYER_IDENTITY_SUCCESS]: deletePlayerIdentitySuccess,
  [POST_PLAYER_IDENTITY]: postPlayerIdentity,
  [POST_PLAYER_IDENTITY_FAILURE]: postPlayerIdentityFailure,
  [POST_PLAYER_IDENTITY_SUCCESS]: postPlayerIdentitySuccess,
  [PUT_PLAYER_IDENTITY]: putPlayerIdentity,
  [PUT_PLAYER_IDENTITY_FAILURE]: putPlayerIdentityFailure,
  [PUT_PLAYER_IDENTITY_SUCCESS]: putPlayerIdentitySuccess,
  [REQUEST_PLAYER_IDENTITY]: requestPlayerIdentity,
  [REQUEST_PLAYER_IDENTITY_FAILURE]: requestPlayerIdentityFailure,
  [REQUEST_PLAYER_IDENTITY_SUCCESS]: requestPlayerIdentitySuccess,
  [REQUEST_PLAYER_IDENTITY_NOT_FOUND]: requestPlayerIdentityNotFound
});
