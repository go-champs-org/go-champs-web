import { createReducer } from '../Shared/store/helpers';
import { AccountState, initialState } from './state';
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  ActionTypes,
  SIGN_IN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE
} from './actions';
import { ApiUserResponse } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';

const signIn = (state: AccountState): AccountState => ({
  ...state,
  isLoadingSingIn: true
});

const signInSuccess = (
  state: AccountState,
  action: HttpAction<ActionTypes, ApiUserResponse>
): AccountState => ({
  ...state,
  isLoadingSingIn: false,
  account: { email: action.payload!.data.email }
});

const signInFailure = (state: AccountState): AccountState => ({
  ...state,
  isLoadingSingIn: false
});

const signUp = (state: AccountState): AccountState => ({
  ...state,
  isLoadingSingUp: true
});

const signUpSuccess = (
  state: AccountState,
  action: HttpAction<ActionTypes, ApiUserResponse>
): AccountState => ({
  ...state,
  isLoadingSingUp: false,
  account: { email: action.payload!.data.email }
});

const signUpFailure = (state: AccountState): AccountState => ({
  ...state,
  isLoadingSingUp: false
});

const passwordReset = (state: AccountState): AccountState => ({
  ...state,
  isLoadingPasswordReset: true
});

const passwordResetSuccess = (
  state: AccountState,
  action: HttpAction<ActionTypes, ApiUserResponse>
): AccountState => ({
  ...state,
  isLoadingPasswordReset: false,
  account: { email: action.payload!.data.email }
});

const passwordResetFailure = (state: AccountState): AccountState => ({
  ...state,
  isLoadingPasswordReset: false
});

export default createReducer<AccountState>(initialState, {
  [PASSWORD_RESET]: passwordReset,
  [PASSWORD_RESET_SUCCESS]: passwordResetSuccess,
  [PASSWORD_RESET_FAILURE]: passwordResetFailure,
  [SIGN_IN]: signIn,
  [SIGN_IN_SUCCESS]: signInSuccess,
  [SIGN_IN_FAILURE]: signInFailure,
  [SIGN_UP]: signUp,
  [SIGN_UP_SUCCESS]: signUpSuccess,
  [SIGN_UP_FAILURE]: signUpFailure
});
