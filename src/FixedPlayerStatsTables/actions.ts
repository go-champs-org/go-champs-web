import { ApiFixedPlayerStatsTable } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';

export const DELETE_FIXED_PLAYER_STATS_TABLE =
  'API_DELETE_FIXED_PLAYER_STATS_TABLE';
export const DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS =
  'API_DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS';
export const DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE =
  'API_DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE';
export const PATCH_FIXED_PLAYER_STATS_TABLE =
  'API_PATCH_FIXED_PLAYER_STATS_TABLE';
export const PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS =
  'API_PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS';
export const PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE =
  'API_PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE';
export const POST_FIXED_PLAYER_STATS_TABLE =
  'API_POST_FIXED_PLAYER_STATS_TABLE';
export const POST_FIXED_PLAYER_STATS_TABLE_SUCCESS =
  'API_POST_FIXED_PLAYER_STATS_TABLE_SUCCESS';
export const POST_FIXED_PLAYER_STATS_TABLE_FAILURE =
  'API_POST_FIXED_PLAYER_STATS_TABLE_FAILURE';

export const deleteFixedPlayerStatsTableStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_FIXED_PLAYER_STATS_TABLE
});

export const deleteFixedPlayerStatsTableSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  payload
});

export const deleteFixedPlayerStatsTableFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE,
  payload
});

export const patchFixedPlayerStatsTableStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_FIXED_PLAYER_STATS_TABLE
});

export const patchFixedPlayerStatsTableSuccess = (
  payload: ApiFixedPlayerStatsTable
): HttpAction<ActionTypes, ApiFixedPlayerStatsTable> => ({
  type: PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  payload
});

export const patchFixedPlayerStatsTableFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE,
  payload
});

export const postFixedPlayerStatsTableStart = (): HttpAction<ActionTypes> => ({
  type: POST_FIXED_PLAYER_STATS_TABLE
});

export const postFixedPlayerStatsTableSuccess = (
  payload: ApiFixedPlayerStatsTable
): HttpAction<ActionTypes, ApiFixedPlayerStatsTable> => ({
  type: POST_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  payload
});

export const postFixedPlayerStatsTableFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_FIXED_PLAYER_STATS_TABLE_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_FIXED_PLAYER_STATS_TABLE
  | typeof DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS
  | typeof DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE
  | typeof PATCH_FIXED_PLAYER_STATS_TABLE
  | typeof PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS
  | typeof PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE
  | typeof POST_FIXED_PLAYER_STATS_TABLE
  | typeof POST_FIXED_PLAYER_STATS_TABLE_SUCCESS
  | typeof POST_FIXED_PLAYER_STATS_TABLE_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
