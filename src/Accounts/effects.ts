import { Dispatch } from 'redux';
import {
  SignInEntity,
  SignUpEntity,
  AccountRecoveryEntity,
  AccountResetEntity
} from './entity';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  accountResetStart,
  accountResetSuccess,
  accountResetFailure,
  accountRecoveryStart,
  accountRecoverySuccess,
  accountRecoveryFailure,
  getAccountStart,
  getAccountSuccess,
  getAccountFailure
} from './actions';
import accountHttpClient from './accountHttpClient';
import { History, Location } from 'history';
import ApiError from '../Shared/httpClient/ApiError';
import { displayToast } from '../Shared/bulma/toast';

export const signIn = (
  user: SignInEntity,
  { history, location }: { history: History; location: Location }
) => async (dispatch: Dispatch) => {
  dispatch(signInStart());

  try {
    const response = await accountHttpClient.signIn(user);

    dispatch(signInSuccess(response));
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    const search = new URLSearchParams(location.search);
    if (search.get('redirectTo')) {
      history.push(search.get('redirectTo')!);
    } else {
      history.push('/Account');
    }
  } catch (err) {
    dispatch(signInFailure(err));

    if (err instanceof ApiError) {
      if (err.payload.status === 404) {
        return {
          email: ['user not found']
        };
      }

      if (err.payload.status === 401) {
        return {
          email: ['invalid credentials'],
          password: ['invalid credentials']
        };
      }
    }
  }
};

export const signUp = (user: SignUpEntity, history: History) => async (
  dispatch: Dispatch
) => {
  dispatch(signUpStart());

  try {
    const response = await accountHttpClient.signUp(user);

    dispatch(signUpSuccess(response));
    history.push('/SignIn');
  } catch (err) {
    dispatch(signUpFailure(err));
    displayToast(`Sign up failed :(`, 'is-primary');
  }
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const accountReset = (
  user: AccountResetEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(accountResetStart());

  try {
    await accountHttpClient.reset(user);

    dispatch(accountResetSuccess());
    displayToast(`Account reset successful`, 'is-success');
    history.push('/SignIn');
  } catch (err) {
    dispatch(accountResetFailure(err));
    displayToast(`Account reset failed :(`, 'is-primary');
  }
};

export const accountRecovery = (
  accountRecovery: AccountRecoveryEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(accountRecoveryStart());

  try {
    await accountHttpClient.recovery(accountRecovery);

    dispatch(accountRecoverySuccess());
    displayToast(`Check your e-mail`, 'is-success');
    history.push('/SignIn');
  } catch (err) {
    dispatch(accountRecoveryFailure(err));
    displayToast(`Account recovery failed :(`, 'is-primary');
  }
};

export const getAccount = (username: string) => async (dispatch: Dispatch) => {
  dispatch(getAccountStart());

  try {
    const response = await accountHttpClient.getAccount(username);

    dispatch(getAccountSuccess(response));
  } catch (err) {
    dispatch(getAccountFailure(err));
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
};
