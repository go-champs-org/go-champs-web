import { displayToast } from '../Shared/bulma/toast';
import {
  deletePlayerStatsLogFailure,
  deletePlayerStatsLogStart,
  deletePlayerStatsLogSuccess,
  patchPlayerStatsLogsFailure,
  patchPlayerStatsLogsStart,
  patchPlayerStatsLogsSuccess,
  postPlayerStatsLogsFailure,
  postPlayerStatsLogsStart,
  postPlayerStatsLogsSuccess
} from './actions';
import { PlayerStatsLogEntity } from './state';
import playerStatsLogHttpClient from './playerStatsLogHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deletePlayerStatsLog = (
  playerStatsLog: PlayerStatsLogEntity
) => async (dispatch: Dispatch) => {
  dispatch(deletePlayerStatsLogStart());

  try {
    const response = await playerStatsLogHttpClient.delete(playerStatsLog.id);

    dispatch(deletePlayerStatsLogSuccess(response));
    displayToast(`Player stats log deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePlayerStatsLogFailure(err));
  }
};

export const patchPlayerStatsLogs = (
  playerStatsLogs: PlayerStatsLogEntity[]
) => async (dispatch: Dispatch) => {
  dispatch(patchPlayerStatsLogsStart());

  try {
    const response = await playerStatsLogHttpClient.patch(playerStatsLogs);

    dispatch(patchPlayerStatsLogsSuccess(response));
    displayToast(`Player stats logs updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPlayerStatsLogsFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postPlayerStatsLogs = (
  playerStatsLogs: PlayerStatsLogEntity[]
) => async (dispatch: Dispatch) => {
  dispatch(postPlayerStatsLogsStart());

  try {
    const response = await playerStatsLogHttpClient.post(playerStatsLogs);

    dispatch(postPlayerStatsLogsSuccess(response));
    displayToast(`Player stats logs created!`, 'is-success');
  } catch (err) {
    dispatch(postPlayerStatsLogsFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
