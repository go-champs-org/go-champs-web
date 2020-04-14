import { createReducer } from '../Shared/store/helpers';
import { AccountState, initialState } from './state';
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  ActionTypes,
  SIGN_IN_FAILURE
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

export default createReducer<AccountState>(initialState, {
  [SIGN_IN]: signIn,
  [SIGN_IN_SUCCESS]: signInSuccess,
  [SIGN_IN_FAILURE]: signInFailure
});
