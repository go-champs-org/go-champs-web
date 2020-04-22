import { HttpAction } from '../Shared/store/interfaces';
import { ApiUserResponse } from '../Shared/httpClient/apiTypes';

export const PASSWORD_RESET = 'API_PASSWORD_RESET';
export const PASSWORD_RESET_SUCCESS = 'API_PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'API_PASSWORD_RESET_FAILURE';
export const SIGN_IN = 'API_SIGN_IN';
export const SIGN_IN_SUCCESS = 'API_SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'API_SIGN_IN_FAILURE';
export const SIGN_UP = 'API_SIGN_UP';
export const SIGN_UP_SUCCESS = 'API_SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'API_SIGN_UP_FAILURE';

export const signInStart = (): HttpAction<ActionTypes> => ({
  type: SIGN_IN
});

export const signInSuccess = (
  payload: ApiUserResponse
): HttpAction<ActionTypes, ApiUserResponse> => ({
  type: SIGN_IN_SUCCESS,
  payload
});

export const signInFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: SIGN_IN_FAILURE,
  payload
});

export const signUpStart = (): HttpAction<ActionTypes> => ({
  type: SIGN_UP
});

export const signUpSuccess = (
  payload: ApiUserResponse
): HttpAction<ActionTypes, ApiUserResponse> => ({
  type: SIGN_UP_SUCCESS,
  payload
});

export const signUpFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: SIGN_UP_FAILURE,
  payload
});

export const passwordResetStart = (): HttpAction<ActionTypes> => ({
  type: PASSWORD_RESET
});

export const passwordResetSuccess = (
  payload: ApiUserResponse
): HttpAction<ActionTypes, ApiUserResponse> => ({
  type: PASSWORD_RESET_SUCCESS,
  payload
});

export const passwordResetFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PASSWORD_RESET_FAILURE,
  payload
});

export type ActionTypes =
  | typeof PASSWORD_RESET
  | typeof PASSWORD_RESET_SUCCESS
  | typeof PASSWORD_RESET_FAILURE
  | typeof SIGN_IN
  | typeof SIGN_IN_SUCCESS
  | typeof SIGN_IN_FAILURE
  | typeof SIGN_UP
  | typeof SIGN_UP_SUCCESS
  | typeof SIGN_UP_FAILURE;
export type Actions = HttpAction<ActionTypes>;
