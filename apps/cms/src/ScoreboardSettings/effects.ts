import { displayToast } from '../Shared/bulma/toast';
import {
  deleteScoreboardSettingFailure,
  deleteScoreboardSettingStart,
  deleteScoreboardSettingSuccess,
  patchScoreboardSettingFailure,
  patchScoreboardSettingStart,
  patchScoreboardSettingSuccess,
  postScoreboardSettingFailure,
  postScoreboardSettingStart,
  postScoreboardSettingSuccess
} from './actions';
import { ScoreboardSettingEntity } from './state';
import scoreboardSettingsHttpClient from './scoreboardSettingsHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteScoreboardSetting = (
  scoreboardSetting: ScoreboardSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(deleteScoreboardSettingStart());

  try {
    const response = await scoreboardSettingsHttpClient.delete(
      scoreboardSetting.id
    );

    dispatch(deleteScoreboardSettingSuccess(response));
    displayToast(`Scoreboard settings deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteScoreboardSettingFailure(err));
  }
};

export const patchScoreboardSetting = (
  scoreboardSetting: ScoreboardSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchScoreboardSettingStart());

  try {
    const response = await scoreboardSettingsHttpClient.patch(
      scoreboardSetting
    );

    dispatch(patchScoreboardSettingSuccess(response));
    displayToast(`Scoreboard settings updated!`, 'is-success');
  } catch (err) {
    dispatch(patchScoreboardSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postScoreboardSetting = (
  scoreboardSetting: ScoreboardSettingEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postScoreboardSettingStart());

  try {
    const response = await scoreboardSettingsHttpClient.post(
      scoreboardSetting,
      tournamentId
    );

    dispatch(postScoreboardSettingSuccess(response));
    displayToast(`Scoreboard settings created!`, 'is-success');
  } catch (err) {
    dispatch(postScoreboardSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
