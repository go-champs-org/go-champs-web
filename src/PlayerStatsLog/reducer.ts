import { ApiPlayerStatsLog } from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntitiesByKey,
  returnProperty,
  mapEntities
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_PLAYER_STATS_LOG,
  DELETE_PLAYER_STATS_LOG_FAILURE,
  DELETE_PLAYER_STATS_LOG_SUCCESS,
  GET_PLAYER_STATS_LOGS_BY_FILTER,
  GET_PLAYER_STATS_LOGS_BY_FILTER_FAILURE,
  GET_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS,
  PATCH_PLAYER_STATS_LOG,
  PATCH_PLAYER_STATS_LOG_FAILURE,
  PATCH_PLAYER_STATS_LOG_SUCCESS,
  POST_PLAYER_STATS_LOG,
  POST_PLAYER_STATS_LOG_FAILURE,
  POST_PLAYER_STATS_LOG_SUCCESS
} from './actions';
import {
  initialState,
  PlayerStatsLogEntity,
  PlayerStatsLogState
} from './state';

const playerStatsLogMapEntities = mapEntities<PlayerStatsLogEntity>(
  returnProperty('id')
);

const deletePlayerStatsLog = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingDeletePlayerStatsLog: true
});

const deletePlayerStatsLogFailure = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingDeletePlayerStatsLog: false
});

const deletePlayerStatsLogSuccess = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes, string>
) => {
  const playerStatsLogs = Object.keys(state.playerStatsLogs)
    .filter(entityById(state.playerStatsLogs, action.payload!))
    .reduce(mapEntitiesByKey(state.playerStatsLogs), {});
  return {
    ...state,
    isLoadingDeletePlayerStatsLog: false,
    playerStatsLogs
  };
};

const patchPlayerStatsLogs = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingPatchPlayerStatsLog: true
});

const patchPlayerStatsLogsFailure = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingPatchPlayerStatsLog: false
});

const patchPlayerStatsLogsSuccess = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes, PlayerStatsLogEntity[]>
) => ({
  ...state,
  isLoadingPatchPlayerStatsLog: false,
  playerStatsLogs: action.payload!.reduce(
    playerStatsLogMapEntities,
    state.playerStatsLogs
  )
});

const postPlayerStatsLogs = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingPostPlayerStatsLog: true
});

const postPlayerStatsLogsFailure = (state: PlayerStatsLogState) => ({
  ...state,
  isLoadingPostPlayerStatsLog: false
});

const postPlayerStatsLogsSuccess = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes, PlayerStatsLogEntity[]>
) => ({
  ...state,
  isLoadingPostPlayerStatsLog: false,
  playerStatsLogs: action.payload!.reduce(
    playerStatsLogMapEntities,
    state.playerStatsLogs
  )
});

const getPlayerStatsLogsByFilter = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLog: true,
  isLoadingRequestPlayerStatsLogs: true
});

const getPlayerStatsLogsByFilterFailure = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLogs: false
});

const getPlayerStatsLogsByFilterSuccess = (
  state: PlayerStatsLogState,
  action: HttpAction<ActionTypes, PlayerStatsLogEntity[]>
) => ({
  ...state,
  isLoadingRequestPlayerStatsLogs: false,
  playerStatsLogs: action.payload!.reduce(playerStatsLogMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_PLAYER_STATS_LOG]: deletePlayerStatsLog,
  [DELETE_PLAYER_STATS_LOG_FAILURE]: deletePlayerStatsLogFailure,
  [DELETE_PLAYER_STATS_LOG_SUCCESS]: deletePlayerStatsLogSuccess,
  [PATCH_PLAYER_STATS_LOG]: patchPlayerStatsLogs,
  [PATCH_PLAYER_STATS_LOG_FAILURE]: patchPlayerStatsLogsFailure,
  [PATCH_PLAYER_STATS_LOG_SUCCESS]: patchPlayerStatsLogsSuccess,
  [POST_PLAYER_STATS_LOG]: postPlayerStatsLogs,
  [POST_PLAYER_STATS_LOG_FAILURE]: postPlayerStatsLogsFailure,
  [POST_PLAYER_STATS_LOG_SUCCESS]: postPlayerStatsLogsSuccess,
  [GET_PLAYER_STATS_LOGS_BY_FILTER]: getPlayerStatsLogsByFilter,
  [GET_PLAYER_STATS_LOGS_BY_FILTER_FAILURE]: getPlayerStatsLogsByFilterFailure,
  [GET_PLAYER_STATS_LOGS_BY_FILTER_SUCCESS]: getPlayerStatsLogsByFilterSuccess
});
