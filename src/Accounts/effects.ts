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
  }
};

export const signUp = (user: SignUpEntity) => async (dispatch: Dispatch) => {
  dispatch(signUpStart());

  try {
    const response = await accountHttpClient.signUp(user);

    dispatch(signUpSuccess(response));
  } catch (err) {
    dispatch(signUpFailure(err));
  }
};

export const passwordReset = (user: PasswordResetEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(passwordResetStart());

  try {
    const response = await accountHttpClient.passwordReset(user);

    dispatch(passwordResetSuccess(response));
  } catch (err) {
    dispatch(passwordResetFailure(err));
  }
};
