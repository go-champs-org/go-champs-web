import { displayToast } from '../Shared/bulma/toast';
import {
  deleteFixedPlayerStatsTableFailure,
  deleteFixedPlayerStatsTableStart,
  deleteFixedPlayerStatsTableSuccess,
  patchFixedPlayerStatsTableFailure,
  patchFixedPlayerStatsTableStart,
  patchFixedPlayerStatsTableSuccess,
  postFixedPlayerStatsTableFailure,
  postFixedPlayerStatsTableStart,
  postFixedPlayerStatsTableSuccess,
  getFixedPlayerStatsTablesByFilterStart,
  getFixedPlayerStatsTablesByFilterSuccess,
  getFixedPlayerStatsTablesByFilterFailure
} from './actions';
import fixedPlayerStatsTableHttpClient from './fixedPlayerStatsTableHttpClient';
import { FixedPlayerStatsTableEntity } from './state';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';
import { RequestFilter } from '../Shared/httpClient/requestFilter';

export const deleteFixedPlayerStatsTable = (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity
) => async (dispatch: Dispatch) => {
  dispatch(deleteFixedPlayerStatsTableStart());

  try {
    const response = await fixedPlayerStatsTableHttpClient.delete(
      fixedPlayerStatsTable.id
    );

    dispatch(deleteFixedPlayerStatsTableSuccess(response));
    displayToast(`Fixed Player Stats Table deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteFixedPlayerStatsTableFailure(err));
  }
};

export const patchFixedPlayerStatsTable = (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(patchFixedPlayerStatsTableStart());

  try {
    const response = await fixedPlayerStatsTableHttpClient.patch(
      fixedPlayerStatsTable,
      tournamentId
    );

    dispatch(patchFixedPlayerStatsTableSuccess(response));
    displayToast(`Fixed Player Stats Table updated!`, 'is-success');
  } catch (err) {
    dispatch(patchFixedPlayerStatsTableFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postFixedPlayerStatsTable = (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postFixedPlayerStatsTableStart());

  try {
    const response = await fixedPlayerStatsTableHttpClient.post(
      fixedPlayerStatsTable,
      tournamentId
    );

    dispatch(postFixedPlayerStatsTableSuccess(response));
    displayToast(`Fixed Player Stats Table created!`, 'is-success');
  } catch (err) {
    dispatch(postFixedPlayerStatsTableFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const getFixedPlayerStatsTablesByFilter = (
  where: RequestFilter
) => async (dispatch: Dispatch) => {
  dispatch(getFixedPlayerStatsTablesByFilterStart());

  try {
    const response = await fixedPlayerStatsTableHttpClient.getByFilter(where);

    dispatch(getFixedPlayerStatsTablesByFilterSuccess(response));
  } catch (err) {
    dispatch(getFixedPlayerStatsTablesByFilterFailure(err));
  }
};
