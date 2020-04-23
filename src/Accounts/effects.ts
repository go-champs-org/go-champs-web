import { Dispatch } from 'redux';
import { UserEntity, SignUpEntity, PasswordResetEntity } from './entity';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFailure
} from './actions';
import accountHttpClient from './accountHttpClient';
import { History } from 'history';
import ApiError from '../Shared/httpClient/ApiError';
import { displayToast } from '../Shared/bulma/toast';

export const signIn = (user: UserEntity, history: History) => async (
  dispatch: Dispatch
) => {
  dispatch(signInStart());

  try {
    const response = await accountHttpClient.signIn(user);

    dispatch(signInSuccess(response));
    history.push('/Account');
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
    history.push('/Account');
  } catch (err) {
    dispatch(signUpFailure(err));
    displayToast(`Sign up failed :(`, 'is-primary');
  }
};

export const passwordReset = (
  user: PasswordResetEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(passwordResetStart());

  try {
    const response = await accountHttpClient.passwordReset(user);

    dispatch(passwordResetSuccess(response));
    history.push('/SignIn');
  } catch (err) {
    dispatch(passwordResetFailure(err));
    displayToast(`Password recovery failed :(`, 'is-primary');
  }
};
