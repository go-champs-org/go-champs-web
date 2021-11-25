import { HttpAction } from '../Shared/store/interfaces';
import { FixedPlayerStatsTableEntity } from './state';

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
export const GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER =
  'API_GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER';
export const GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_SUCCESS =
  'API_GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_SUCCESS';
export const GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_FAILURE =
  'API_GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_FAILURE';

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
  payload: FixedPlayerStatsTableEntity
): HttpAction<ActionTypes, FixedPlayerStatsTableEntity> => ({
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
  payload: FixedPlayerStatsTableEntity
): HttpAction<ActionTypes, FixedPlayerStatsTableEntity> => ({
  type: POST_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  payload
});

export const postFixedPlayerStatsTableFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_FIXED_PLAYER_STATS_TABLE_FAILURE,
  payload
});

export const getFixedPlayerStatsTablesByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER
});

export const getFixedPlayerStatsTablesByFilterSuccess = (
  payload: any
): HttpAction<ActionTypes, FixedPlayerStatsTableEntity[]> => ({
  type: GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_SUCCESS,
  payload
});

export const getFixedPlayerStatsTablesByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_FAILURE,
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
  | typeof GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER
  | typeof GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_SUCCESS
  | typeof GET_FIXED_PLAYER_STATS_TABLES_BY_FILTER_FAILURE;
export type Actions = HttpAction<ActionTypes>;
