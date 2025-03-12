import { ApiScoreboardSetting } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { ScoreboardSettingEntity } from './state';

export const DELETE_SCOREBOARD_SETTING = 'API_DELETE_SCOREBOARD_SETTING';
export const DELETE_SCOREBOARD_SETTING_SUCCESS =
  'API_DELETE_SCOREBOARD_SETTING_SUCCESS';
export const DELETE_SCOREBOARD_SETTING_FAILURE =
  'API_DELETE_SCOREBOARD_SETTING_FAILURE';
export const PATCH_SCOREBOARD_SETTING = 'API_PATCH_SCOREBOARD_SETTING';
export const PATCH_SCOREBOARD_SETTING_SUCCESS =
  'API_PATCH_SCOREBOARD_SETTING_SUCCESS';
export const PATCH_SCOREBOARD_SETTING_FAILURE =
  'API_PATCH_SCOREBOARD_SETTING_FAILURE';
export const POST_SCOREBOARD_SETTING = 'API_POST_SCOREBOARD_SETTING';
export const POST_SCOREBOARD_SETTING_SUCCESS =
  'API_POST_SCOREBOARD_SETTING_SUCCESS';
export const POST_SCOREBOARD_SETTING_FAILURE =
  'API_POST_SCOREBOARD_SETTING_FAILURE';

export const deleteScoreboardSettingStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_SCOREBOARD_SETTING
});

export const deleteScoreboardSettingSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_SCOREBOARD_SETTING_SUCCESS,
  payload
});

export const deleteScoreboardSettingFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_SCOREBOARD_SETTING_FAILURE,
  payload
});

export const patchScoreboardSettingStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_SCOREBOARD_SETTING
});

export const patchScoreboardSettingSuccess = (
  payload: ScoreboardSettingEntity
): HttpAction<ActionTypes, ScoreboardSettingEntity> => ({
  type: PATCH_SCOREBOARD_SETTING_SUCCESS,
  payload
});

export const patchScoreboardSettingFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_SCOREBOARD_SETTING_FAILURE,
  payload
});

export const postScoreboardSettingStart = (): HttpAction<ActionTypes> => ({
  type: POST_SCOREBOARD_SETTING
});

export const postScoreboardSettingSuccess = (
  payload: ScoreboardSettingEntity
): HttpAction<ActionTypes, ScoreboardSettingEntity> => ({
  type: POST_SCOREBOARD_SETTING_SUCCESS,
  payload
});

export const postScoreboardSettingFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_SCOREBOARD_SETTING_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_SCOREBOARD_SETTING
  | typeof DELETE_SCOREBOARD_SETTING_SUCCESS
  | typeof DELETE_SCOREBOARD_SETTING_FAILURE
  | typeof PATCH_SCOREBOARD_SETTING
  | typeof PATCH_SCOREBOARD_SETTING_SUCCESS
  | typeof PATCH_SCOREBOARD_SETTING_FAILURE
  | typeof POST_SCOREBOARD_SETTING
  | typeof POST_SCOREBOARD_SETTING_SUCCESS
  | typeof POST_SCOREBOARD_SETTING_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
