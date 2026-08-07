import { ApiApplyNameFormatResponse } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { TournamentSettingEntity } from './state';

export const APPLY_NAME_FORMAT = 'API_APPLY_NAME_FORMAT';
export const APPLY_NAME_FORMAT_SUCCESS = 'API_APPLY_NAME_FORMAT_SUCCESS';
export const APPLY_NAME_FORMAT_FAILURE = 'API_APPLY_NAME_FORMAT_FAILURE';
export const DELETE_TOURNAMENT_SETTING = 'API_DELETE_TOURNAMENT_SETTING';
export const DELETE_TOURNAMENT_SETTING_SUCCESS =
  'API_DELETE_TOURNAMENT_SETTING_SUCCESS';
export const DELETE_TOURNAMENT_SETTING_FAILURE =
  'API_DELETE_TOURNAMENT_SETTING_FAILURE';
export const PATCH_TOURNAMENT_SETTING = 'API_PATCH_TOURNAMENT_SETTING';
export const PATCH_TOURNAMENT_SETTING_SUCCESS =
  'API_PATCH_TOURNAMENT_SETTING_SUCCESS';
export const PATCH_TOURNAMENT_SETTING_FAILURE =
  'API_PATCH_TOURNAMENT_SETTING_FAILURE';
export const POST_TOURNAMENT_SETTING = 'API_POST_TOURNAMENT_SETTING';
export const POST_TOURNAMENT_SETTING_SUCCESS =
  'API_POST_TOURNAMENT_SETTING_SUCCESS';
export const POST_TOURNAMENT_SETTING_FAILURE =
  'API_POST_TOURNAMENT_SETTING_FAILURE';

export const deleteTournamentSettingStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_SETTING
});

export const deleteTournamentSettingSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_TOURNAMENT_SETTING_SUCCESS,
  payload
});

export const deleteTournamentSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_SETTING_FAILURE,
  payload
});

export const patchTournamentSettingStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_SETTING
});

export const patchTournamentSettingSuccess = (
  payload: TournamentSettingEntity
): HttpAction<ActionTypes, TournamentSettingEntity> => ({
  type: PATCH_TOURNAMENT_SETTING_SUCCESS,
  payload
});

export const patchTournamentSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_SETTING_FAILURE,
  payload
});

export const postTournamentSettingStart = (): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_SETTING
});

export const postTournamentSettingSuccess = (
  payload: TournamentSettingEntity
): HttpAction<ActionTypes, TournamentSettingEntity> => ({
  type: POST_TOURNAMENT_SETTING_SUCCESS,
  payload
});

export const postTournamentSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_SETTING_FAILURE,
  payload
});

export const applyNameFormatStart = (): HttpAction<ActionTypes> => ({
  type: APPLY_NAME_FORMAT
});

export const applyNameFormatSuccess = (
  payload: ApiApplyNameFormatResponse
): HttpAction<ActionTypes, ApiApplyNameFormatResponse> => ({
  type: APPLY_NAME_FORMAT_SUCCESS,
  payload
});

export const applyNameFormatFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: APPLY_NAME_FORMAT_FAILURE,
  payload
});

export type ActionTypes =
  | typeof APPLY_NAME_FORMAT
  | typeof APPLY_NAME_FORMAT_SUCCESS
  | typeof APPLY_NAME_FORMAT_FAILURE
  | typeof DELETE_TOURNAMENT_SETTING
  | typeof DELETE_TOURNAMENT_SETTING_SUCCESS
  | typeof DELETE_TOURNAMENT_SETTING_FAILURE
  | typeof PATCH_TOURNAMENT_SETTING
  | typeof PATCH_TOURNAMENT_SETTING_SUCCESS
  | typeof PATCH_TOURNAMENT_SETTING_FAILURE
  | typeof POST_TOURNAMENT_SETTING
  | typeof POST_TOURNAMENT_SETTING_SUCCESS
  | typeof POST_TOURNAMENT_SETTING_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
