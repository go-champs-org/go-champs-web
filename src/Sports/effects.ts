import { getSportsFailure, getSportsStart, getSportsSuccess } from './actions';
import sportHttpClient from './sportHttpClient';
import { Dispatch } from 'redux';

export const getSports = () => async (dispatch: Dispatch) => {
  dispatch(getSportsStart());

  try {
    const response = await sportHttpClient.getAll();

    dispatch(getSportsSuccess(response));
  } catch (err) {
    dispatch(getSportsFailure(err));
  }
};
