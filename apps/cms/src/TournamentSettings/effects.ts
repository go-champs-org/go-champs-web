import i18n from 'i18next';
import { displayToast } from '../Shared/bulma/toast';
import {
  applyNameFormatFailure,
  applyNameFormatStart,
  applyNameFormatSuccess,
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

export const applyNameFormat = (tournamentId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(applyNameFormatStart());

  try {
    const response = await tournamentSettingsHttpClient.applyNameFormat(
      tournamentId
    );

    dispatch(applyNameFormatSuccess(response));
    displayToast(
      i18n.t('nameFormatSettingsForm.applyNameFormatSuccess', {
        playersUpdated: response.players_updated,
        teamsUpdated: response.teams_updated
      }),
      'is-success'
    );
  } catch (err) {
    dispatch(applyNameFormatFailure(err));
    displayToast(
      i18n.t('nameFormatSettingsForm.applyNameFormatFailure'),
      'is-danger'
    );
  }
};

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
