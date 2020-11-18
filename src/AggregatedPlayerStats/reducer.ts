import {
  AggregatedPlayerStatsLogState,
  AggregatedPlayerStatsLogEntity,
  initialState
} from './state';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER,
  GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE,
  GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS
} from './actions';
import {
  mapEntities,
  returnProperty,
  createReducer
} from '../Shared/store/helpers';

const aggregatedPlayerStatsLogMapEntities = mapEntities<
  AggregatedPlayerStatsLogEntity
>(returnProperty('id'));

const getdAggregatedPlayerStatsByFilter = (
  state: AggregatedPlayerStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLogs: true
});

const getdAggregatedPlayerStatsByFilterFailure = (
  state: AggregatedPlayerStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLogs: false
});

const getdAggregatedPlayerStatsByFilterSuccess = (
  state: AggregatedPlayerStatsLogState,
  action: HttpAction<ActionTypes, AggregatedPlayerStatsLogEntity[]>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLogs: false,
  aggregatedPlayerStatsLogs: action.payload!.reduce(
    aggregatedPlayerStatsLogMapEntities,
    {}
  )
});
export default createReducer(initialState, {
  [GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER]: getdAggregatedPlayerStatsByFilter,
  [GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_FAILURE]: getdAggregatedPlayerStatsByFilterFailure,
  [GET_AGGREGATED_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS]: getdAggregatedPlayerStatsByFilterSuccess
});
