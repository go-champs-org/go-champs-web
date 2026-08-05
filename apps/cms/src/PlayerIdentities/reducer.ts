import {
  createReducer,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
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
} from './actions';
import {
  DEFAULT_PLAYER_IDENTITY,
  initialState,
  PlayerIdentityEntity,
  PlayerIdentityState
} from './state';

const playerIdentityMapEntities = mapEntities<PlayerIdentityEntity>(
  returnProperty('playerId')
);

const deletePlayerIdentity = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePlayerIdentity: true
});

const deletePlayerIdentityFailure = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePlayerIdentity: false
});

const deletePlayerIdentitySuccess = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes, string>
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
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: true
});

const postPlayerIdentityFailure = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: false
});

const postPlayerIdentitySuccess = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingPostPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const putPlayerIdentity = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: true
});

const putPlayerIdentityFailure = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: false
});

const putPlayerIdentitySuccess = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingPutPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const requestPlayerIdentity = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: true
});

const requestPlayerIdentityFailure = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false
});

const requestPlayerIdentitySuccess = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes, PlayerIdentityEntity>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: [action.payload!].reduce(
    playerIdentityMapEntities,
    state.playerIdentities
  )
});

const requestPlayerIdentityNotFound = (
  state: PlayerIdentityState,
  action: HttpAction<ActionTypes, string>
) => ({
  ...state,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: [
    { ...DEFAULT_PLAYER_IDENTITY, playerId: action.payload! }
  ].reduce(playerIdentityMapEntities, state.playerIdentities)
});

export default createReducer(initialState, {
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
