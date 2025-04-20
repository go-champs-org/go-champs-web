import {
  createReducer,
  mapEntities,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  GET_TEAM_STATS_LOGS_BY_FILTER,
  GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE,
  GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS
} from './actions';
import { initialState, TeamStatsLogEntity, TeamStatsLogState } from './state';

const teamStatsLogMapEntities = mapEntities<TeamStatsLogEntity>(
  returnProperty('id')
);

const getTeamStatsLogsByFilter = (
  state: TeamStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTeamStatsLog: true,
  isLoadingRequestTeamStatsLogs: true
});

const getTeamStatsLogsByFilterFailure = (
  state: TeamStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTeamStatsLogs: false
});

const getTeamStatsLogsByFilterSuccess = (
  state: TeamStatsLogState,
  action: HttpAction<ActionTypes, TeamStatsLogEntity[]>
) => ({
  ...state,
  isLoadingRequestTeamStatsLogs: false,
  teamStatsLogs: action.payload!.reduce(teamStatsLogMapEntities, {})
});

export default createReducer(initialState, {
  [GET_TEAM_STATS_LOGS_BY_FILTER]: getTeamStatsLogsByFilter,
  [GET_TEAM_STATS_LOGS_BY_FILTER_FAILURE]: getTeamStatsLogsByFilterFailure,
  [GET_TEAM_STATS_LOGS_BY_FILTER_SUCCESS]: getTeamStatsLogsByFilterSuccess
});
