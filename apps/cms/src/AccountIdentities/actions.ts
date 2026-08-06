import { HttpAction } from '../Shared/store/interfaces';
import { AccountIdentityEntity } from './state';

export const DELETE_ACCOUNT_IDENTITY = 'API_DELETE_ACCOUNT_IDENTITY';
export const DELETE_ACCOUNT_IDENTITY_SUCCESS =
  'API_DELETE_ACCOUNT_IDENTITY_SUCCESS';
export const DELETE_ACCOUNT_IDENTITY_FAILURE =
  'API_DELETE_ACCOUNT_IDENTITY_FAILURE';
export const POST_ACCOUNT_IDENTITY = 'API_POST_ACCOUNT_IDENTITY';
export const POST_ACCOUNT_IDENTITY_SUCCESS =
  'API_POST_ACCOUNT_IDENTITY_SUCCESS';
export const POST_ACCOUNT_IDENTITY_FAILURE =
  'API_POST_ACCOUNT_IDENTITY_FAILURE';
export const PUT_ACCOUNT_IDENTITY = 'API_PUT_ACCOUNT_IDENTITY';
export const PUT_ACCOUNT_IDENTITY_SUCCESS = 'API_PUT_ACCOUNT_IDENTITY_SUCCESS';
export const PUT_ACCOUNT_IDENTITY_FAILURE = 'API_PUT_ACCOUNT_IDENTITY_FAILURE';
export const REQUEST_ACCOUNT_IDENTITY = 'API_REQUEST_ACCOUNT_IDENTITY';
export const REQUEST_ACCOUNT_IDENTITY_SUCCESS =
  'API_REQUEST_ACCOUNT_IDENTITY_SUCCESS';
export const REQUEST_ACCOUNT_IDENTITY_FAILURE =
  'API_REQUEST_ACCOUNT_IDENTITY_FAILURE';
export const REQUEST_ACCOUNT_IDENTITY_NOT_FOUND =
  'API_REQUEST_ACCOUNT_IDENTITY_NOT_FOUND';

export const deleteAccountIdentityStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_ACCOUNT_IDENTITY
});

export const deleteAccountIdentitySuccess = (): HttpAction<ActionTypes> => ({
  type: DELETE_ACCOUNT_IDENTITY_SUCCESS
});

export const deleteAccountIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_ACCOUNT_IDENTITY_FAILURE,
  payload
});

export const postAccountIdentityStart = (): HttpAction<ActionTypes> => ({
  type: POST_ACCOUNT_IDENTITY
});

export const postAccountIdentitySuccess = (
  payload: AccountIdentityEntity
): HttpAction<ActionTypes, AccountIdentityEntity> => ({
  type: POST_ACCOUNT_IDENTITY_SUCCESS,
  payload
});

export const postAccountIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_ACCOUNT_IDENTITY_FAILURE,
  payload
});

export const putAccountIdentityStart = (): HttpAction<ActionTypes> => ({
  type: PUT_ACCOUNT_IDENTITY
});

export const putAccountIdentitySuccess = (
  payload: AccountIdentityEntity
): HttpAction<ActionTypes, AccountIdentityEntity> => ({
  type: PUT_ACCOUNT_IDENTITY_SUCCESS,
  payload
});

export const putAccountIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PUT_ACCOUNT_IDENTITY_FAILURE,
  payload
});

export const requestAccountIdentityStart = (): HttpAction<ActionTypes> => ({
  type: REQUEST_ACCOUNT_IDENTITY
});

export const requestAccountIdentitySuccess = (
  payload: AccountIdentityEntity
): HttpAction<ActionTypes, AccountIdentityEntity> => ({
  type: REQUEST_ACCOUNT_IDENTITY_SUCCESS,
  payload
});

export const requestAccountIdentityFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: REQUEST_ACCOUNT_IDENTITY_FAILURE,
  payload
});

export const requestAccountIdentityNotFound = (): HttpAction<ActionTypes> => ({
  type: REQUEST_ACCOUNT_IDENTITY_NOT_FOUND
});

export type ActionTypes =
  | typeof DELETE_ACCOUNT_IDENTITY
  | typeof DELETE_ACCOUNT_IDENTITY_SUCCESS
  | typeof DELETE_ACCOUNT_IDENTITY_FAILURE
  | typeof POST_ACCOUNT_IDENTITY
  | typeof POST_ACCOUNT_IDENTITY_SUCCESS
  | typeof POST_ACCOUNT_IDENTITY_FAILURE
  | typeof PUT_ACCOUNT_IDENTITY
  | typeof PUT_ACCOUNT_IDENTITY_SUCCESS
  | typeof PUT_ACCOUNT_IDENTITY_FAILURE
  | typeof REQUEST_ACCOUNT_IDENTITY
  | typeof REQUEST_ACCOUNT_IDENTITY_SUCCESS
  | typeof REQUEST_ACCOUNT_IDENTITY_FAILURE
  | typeof REQUEST_ACCOUNT_IDENTITY_NOT_FOUND;
export type Actions = HttpAction<ActionTypes>;
