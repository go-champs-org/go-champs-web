import { HttpAction } from '../Shared/store/interfaces';
import { PlayerIdentityEntity } from './state';

export const DELETE_PLAYER_IDENTITY = 'API_DELETE_PLAYER_IDENTITY';
export const DELETE_PLAYER_IDENTITY_SUCCESS =
  'API_DELETE_PLAYER_IDENTITY_SUCCESS';
export const DELETE_PLAYER_IDENTITY_FAILURE =
  'API_DELETE_PLAYER_IDENTITY_FAILURE';
export const POST_PLAYER_IDENTITY = 'API_POST_PLAYER_IDENTITY';
export const POST_PLAYER_IDENTITY_SUCCESS = 'API_POST_PLAYER_IDENTITY_SUCCESS';
export const POST_PLAYER_IDENTITY_FAILURE = 'API_POST_PLAYER_IDENTITY_FAILURE';
export const PUT_PLAYER_IDENTITY = 'API_PUT_PLAYER_IDENTITY';
export const PUT_PLAYER_IDENTITY_SUCCESS = 'API_PUT_PLAYER_IDENTITY_SUCCESS';
export const PUT_PLAYER_IDENTITY_FAILURE = 'API_PUT_PLAYER_IDENTITY_FAILURE';
export const REQUEST_PLAYER_IDENTITY = 'API_REQUEST_PLAYER_IDENTITY';
export const REQUEST_PLAYER_IDENTITY_SUCCESS =
  'API_REQUEST_PLAYER_IDENTITY_SUCCESS';
export const REQUEST_PLAYER_IDENTITY_FAILURE =
  'API_REQUEST_PLAYER_IDENTITY_FAILURE';
export const REQUEST_PLAYER_IDENTITY_NOT_FOUND =
  'API_REQUEST_PLAYER_IDENTITY_NOT_FOUND';

export const deletePlayerIdentityStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER_IDENTITY
});

export const deletePlayerIdentitySuccess = (
  playerId: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PLAYER_IDENTITY_SUCCESS,
  payload: playerId
});

export const deletePlayerIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER_IDENTITY_FAILURE,
  payload
});

export const postPlayerIdentityStart = (): HttpAction<ActionTypes> => ({
  type: POST_PLAYER_IDENTITY
});

export const postPlayerIdentitySuccess = (
  payload: PlayerIdentityEntity
): HttpAction<ActionTypes, PlayerIdentityEntity> => ({
  type: POST_PLAYER_IDENTITY_SUCCESS,
  payload
});

export const postPlayerIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_PLAYER_IDENTITY_FAILURE,
  payload
});

export const putPlayerIdentityStart = (): HttpAction<ActionTypes> => ({
  type: PUT_PLAYER_IDENTITY
});

export const putPlayerIdentitySuccess = (
  payload: PlayerIdentityEntity
): HttpAction<ActionTypes, PlayerIdentityEntity> => ({
  type: PUT_PLAYER_IDENTITY_SUCCESS,
  payload
});

export const putPlayerIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PUT_PLAYER_IDENTITY_FAILURE,
  payload
});

export const requestPlayerIdentityStart = (): HttpAction<ActionTypes> => ({
  type: REQUEST_PLAYER_IDENTITY
});

export const requestPlayerIdentitySuccess = (
  payload: PlayerIdentityEntity
): HttpAction<ActionTypes, PlayerIdentityEntity> => ({
  type: REQUEST_PLAYER_IDENTITY_SUCCESS,
  payload
});

export const requestPlayerIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: REQUEST_PLAYER_IDENTITY_FAILURE,
  payload
});

export const requestPlayerIdentityNotFound = (
  playerId: string
): HttpAction<ActionTypes, string> => ({
  type: REQUEST_PLAYER_IDENTITY_NOT_FOUND,
  payload: playerId
});

export type ActionTypes =
  | typeof DELETE_PLAYER_IDENTITY
  | typeof DELETE_PLAYER_IDENTITY_SUCCESS
  | typeof DELETE_PLAYER_IDENTITY_FAILURE
  | typeof POST_PLAYER_IDENTITY
  | typeof POST_PLAYER_IDENTITY_SUCCESS
  | typeof POST_PLAYER_IDENTITY_FAILURE
  | typeof PUT_PLAYER_IDENTITY
  | typeof PUT_PLAYER_IDENTITY_SUCCESS
  | typeof PUT_PLAYER_IDENTITY_FAILURE
  | typeof REQUEST_PLAYER_IDENTITY
  | typeof REQUEST_PLAYER_IDENTITY_SUCCESS
  | typeof REQUEST_PLAYER_IDENTITY_FAILURE
  | typeof REQUEST_PLAYER_IDENTITY_NOT_FOUND;
export type Actions = HttpAction<ActionTypes>;
