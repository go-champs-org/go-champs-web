import { HttpAction } from '../Shared/store/interfaces';
import { AggregatedPlayerStatsLogEntity } from './state';

export const GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER =
  'API_GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER';
export const GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS =
  'API_GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS';
export const GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE =
  'API_GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE';

export const getAggregatedPlayerStatsLogsByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER
});

export const getAggregatedPlayerStatsLogsByFilterSuccess = (
  payload: AggregatedPlayerStatsLogEntity[]
): HttpAction<ActionTypes, AggregatedPlayerStatsLogEntity[]> => ({
  type: GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS,
  payload
});

export const getAggregatedPlayerStatsLogsByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE,
  payload
});

export type ActionTypes =
  | typeof GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER
  | typeof GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE
  | typeof GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
