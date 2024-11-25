import {
  getSportFailure,
  getSportsFailure,
  getSportsStart,
  getSportsSuccess,
  getSportStart,
  getSportSuccess
} from './actions';
import sportHttpClient from './sportHttpClient';
import { Dispatch } from 'redux';

export const getSport = (sportSlug: string) => async (dispatch: Dispatch) => {
  dispatch(getSportStart());

  try {
    const response = await sportHttpClient.get(sportSlug);

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
