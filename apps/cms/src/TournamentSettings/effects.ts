import { displayToast } from '../Shared/bulma/toast';
import {
  deleteTournamentSettingFailure,
  deleteTournamentSettingStart,
  deleteTournamentSettingSuccess,
  patchTournamentSettingFailure,
  patchTournamentSettingStart,
  patchTournamentSettingSuccess,
  postTournamentSettingFailure,
  postTournamentSettingStart,
  postTournamentSettingSuccess
} from './actions';
import { TournamentSettingEntity } from './state';
import tournamentSettingsHttpClient from './tournamentSettingsHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteTournamentSetting = (
  tournamentSetting: TournamentSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(deleteTournamentSettingStart());

  try {
    const response = await tournamentSettingsHttpClient.delete(
      tournamentSetting.id
    );

    dispatch(deleteTournamentSettingSuccess(response));
    displayToast(`Tournament settings deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentSettingFailure(err));
  }
};

export const patchTournamentSetting = (
  tournamentSetting: TournamentSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchTournamentSettingStart());

  try {
    const response = await tournamentSettingsHttpClient.patch(
      tournamentSetting
    );

    dispatch(patchTournamentSettingSuccess(response));
    displayToast(`Tournament settings updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postTournamentSetting = (
  tournamentSetting: TournamentSettingEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postTournamentSettingStart());

  try {
    const response = await tournamentSettingsHttpClient.post(
      tournamentSetting,
      tournamentId
    );

    dispatch(postTournamentSettingSuccess(response));
    displayToast(`Tournament settings created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
