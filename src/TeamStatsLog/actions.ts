import { HttpAction } from '../Shared/store/interfaces';
import { TeamStatsLogEntity } from './state';

export const GET_TEAM_STATS_LOGS_BY_FILTER =
  'API_GET_TEAM_STATS_LOGS_BY_FILTER';
export const GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS =
  'API_GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS';
export const GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE =
  'API_GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE';

export const getTeamStatsLogsByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_TEAM_STATS_LOGS_BY_FILTER
});

export const getTeamStatsLogsByFilterSuccess = (
  payload: TeamStatsLogEntity[]
): HttpAction<ActionTypes, TeamStatsLogEntity[]> => ({
  type: GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS,
  payload
});

export const getTeamStatsLogsByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE,
  payload
});

export type ActionTypes =
  | typeof GET_TEAM_STATS_LOGS_BY_FILTER
  | typeof GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE
  | typeof GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
