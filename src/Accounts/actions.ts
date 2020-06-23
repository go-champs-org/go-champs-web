import { HttpAction } from '../Shared/store/interfaces';
import {
  ApiUserResponse,
  ApiAccountResponse
} from '../Shared/httpClient/apiTypes';

export const ACCOUNT_RECOVERY = 'API_ACCOUNT_RECOVERY';
export const ACCOUNT_RECOVERY_SUCCESS = 'API_ACCOUNT_RECOVERY_SUCCESS';
export const ACCOUNT_RECOVERY_FAILURE = 'API_ACCOUNT_RECOVERY_FAILURE';
export const ACCOUNT_RESET = 'API_ACCOUNT_RESET';
export const ACCOUNT_RESET_SUCCESS = 'API_ACCOUNT_RESET_SUCCESS';
export const ACCOUNT_RESET_FAILURE = 'API_ACCOUNT_RESET_FAILURE';
export const SIGN_IN = 'API_SIGN_IN';
export const SIGN_IN_SUCCESS = 'API_SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'API_SIGN_IN_FAILURE';
export const SIGN_UP = 'API_SIGN_UP';
export const SIGN_UP_SUCCESS = 'API_SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'API_SIGN_UP_FAILURE';
export const GET_ACCOUNT = 'API_GET_ACCOUNT';
export const GET_ACCOUNT_SUCCESS = 'API_GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILURE = 'API_GET_ACCOUNT_FAILURE';

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

export const accountResetStart = (): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RESET
});

export const accountResetSuccess = (): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RESET_SUCCESS
});

export const accountResetFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RESET_FAILURE,
  payload
});

export const accountRecoveryStart = (): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RECOVERY
});

export const accountRecoverySuccess = (): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RECOVERY_SUCCESS
});

export const accountRecoveryFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: ACCOUNT_RECOVERY_FAILURE,
  payload
});

export const getAccountStart = (): HttpAction<ActionTypes> => ({
  type: GET_ACCOUNT
});

export const getAccountSuccess = (
  payload: ApiAccountResponse
): HttpAction<ActionTypes, ApiAccountResponse> => ({
  type: GET_ACCOUNT_SUCCESS,
  payload
});

export const getAccountFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_ACCOUNT_FAILURE,
  payload
});

export type ActionTypes =
  | typeof ACCOUNT_RECOVERY
  | typeof ACCOUNT_RECOVERY_SUCCESS
  | typeof ACCOUNT_RECOVERY_FAILURE
  | typeof ACCOUNT_RESET
  | typeof ACCOUNT_RESET_SUCCESS
  | typeof ACCOUNT_RESET_FAILURE
  | typeof GET_ACCOUNT
  | typeof GET_ACCOUNT_SUCCESS
  | typeof GET_ACCOUNT_FAILURE
  | typeof SIGN_IN
  | typeof SIGN_IN_SUCCESS
  | typeof SIGN_IN_FAILURE
  | typeof SIGN_UP
  | typeof SIGN_UP_SUCCESS
  | typeof SIGN_UP_FAILURE;
export type Actions = HttpAction<ActionTypes>;
