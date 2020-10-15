import { ApiPlayerStatsLog } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { PlayerStatsLogEntity } from './state';

export const DELETE_PLAYER_STATS_LOG = 'API_DELETE_PLAYER_STATS_LOG';
export const DELETE_PLAYER_STATS_LOG_SUCCESS =
  'API_DELETE_PLAYER_STATS_LOG_SUCCESS';
export const DELETE_PLAYER_STATS_LOG_FAILURE =
  'API_DELETE_PLAYER_STATS_LOG_FAILURE';
export const PATCH_PLAYER_STATS_LOG = 'API_PATCH_PLAYER_STATS_LOG';
export const PATCH_PLAYER_STATS_LOG_SUCCESS =
  'API_PATCH_PLAYER_STATS_LOG_SUCCESS';
export const PATCH_PLAYER_STATS_LOG_FAILURE =
  'API_PATCH_PLAYER_STATS_LOG_FAILURE';
export const POST_PLAYER_STATS_LOG = 'API_POST_PLAYER_STATS_LOG';
export const POST_PLAYER_STATS_LOG_SUCCESS =
  'API_POST_PLAYER_STATS_LOG_SUCCESS';
export const POST_PLAYER_STATS_LOG_FAILURE =
  'API_POST_PLAYER_STATS_LOG_FAILURE';

export const deletePlayerStatsLogStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER_STATS_LOG
});

export const deletePlayerStatsLogSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PLAYER_STATS_LOG_SUCCESS,
  payload
});

export const deletePlayerStatsLogFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER_STATS_LOG_FAILURE,
  payload
});

export const patchPlayerStatsLogsStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_PLAYER_STATS_LOG
});

export const patchPlayerStatsLogsSuccess = (
  payload: PlayerStatsLogEntity[]
): HttpAction<ActionTypes, PlayerStatsLogEntity[]> => ({
  type: PATCH_PLAYER_STATS_LOG_SUCCESS,
  payload
});

export const patchPlayerStatsLogsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_PLAYER_STATS_LOG_FAILURE,
  payload
});

export const postPlayerStatsLogsStart = (): HttpAction<ActionTypes> => ({
  type: POST_PLAYER_STATS_LOG
});

export const postPlayerStatsLogsSuccess = (
  payload: PlayerStatsLogEntity[]
): HttpAction<ActionTypes, PlayerStatsLogEntity[]> => ({
  type: POST_PLAYER_STATS_LOG_SUCCESS,
  payload
});

export const postPlayerStatsLogsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_PLAYER_STATS_LOG_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_PLAYER_STATS_LOG
  | typeof DELETE_PLAYER_STATS_LOG_SUCCESS
  | typeof DELETE_PLAYER_STATS_LOG_FAILURE
  | typeof PATCH_PLAYER_STATS_LOG
  | typeof PATCH_PLAYER_STATS_LOG_SUCCESS
  | typeof PATCH_PLAYER_STATS_LOG_FAILURE
  | typeof POST_PLAYER_STATS_LOG
  | typeof POST_PLAYER_STATS_LOG_SUCCESS
  | typeof POST_PLAYER_STATS_LOG_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
