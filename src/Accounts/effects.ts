import { Dispatch } from 'redux';
import { UserEntity, SignUpEntity } from './entity';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure
} from './actions';
import accountHttpClient from './accountHttpClient';

export const signIn = (user: UserEntity) => async (dispatch: Dispatch) => {
  dispatch(signInStart());

  try {
    const response = await accountHttpClient.signIn(user);

    dispatch(signInSuccess(response));
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
