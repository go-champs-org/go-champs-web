import {
  getSportSuccess,
  getSportFailure,
  getSportStart,
  getSportsFailure,
  getSportsStart,
  getSportsSuccess
} from './actions';
import sportHttpClient from './sportHttpClient';
import { Dispatch } from 'redux';

export const getSport = (slug: string) => async (dispatch: Dispatch) => {
  dispatch(getSportStart());

  try {
    const response = await sportHttpClient.get(slug);

    dispatch(getSportSuccess(response));
  } catch (err) {
    dispatch(getSportFailure(err));
  }
};

export const getSports = () => async (dispatch: Dispatch) => {
  dispatch(getSportsStart());

  try {
    const response = await sportHttpClient.getAll();

    dispatch(getSportsSuccess(response));
  } catch (err) {
    dispatch(getSportsFailure(err));
  }
};
