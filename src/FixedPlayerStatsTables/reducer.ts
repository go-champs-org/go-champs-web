import {
  createReducer,
  entityById,
  mapEntitiesByKey,
  returnProperty,
  mapEntities
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_FIXED_PLAYER_STATS_TABLE,
  DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE,
  DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  PATCH_FIXED_PLAYER_STATS_TABLE,
  PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE,
  PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS,
  POST_FIXED_PLAYER_STATS_TABLE,
  POST_FIXED_PLAYER_STATS_TABLE_FAILURE,
  POST_FIXED_PLAYER_STATS_TABLE_SUCCESS
} from './actions';
import {
  FixedPlayerStatsTableEntity,
  FixedPlayerStatsTableState,
  initialState
} from './state';

const fixedPlayerStatsTableMapEntities = mapEntities<
  FixedPlayerStatsTableEntity
>(returnProperty('id'));

const deleteFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteFixedPlayerStatsTable: true
});

const deleteFixedPlayerStatsTableFailure = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteFixedPlayerStatsTable: false
});

const deleteFixedPlayerStatsTableSuccess = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes, string>
) => {
  const fixedPlayerStatsTables = Object.keys(state.fixedPlayerStatsTables)
    .filter(entityById(state.fixedPlayerStatsTables, action.payload!))
    .reduce(mapEntitiesByKey(state.fixedPlayerStatsTables), {});
  return {
    ...state,
    fixedPlayerStatsTables,
    isLoadingDeleteFixedPlayerStatsTable: false
  };
};

const patchFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchFixedPlayerStatsTable: true
});

const patchFixedPlayerStatsTableFailure = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchFixedPlayerStatsTable: false
});

const patchFixedPlayerStatsTableSuccess = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes, FixedPlayerStatsTableEntity>
) => ({
  ...state,
  isLoadingPatchFixedPlayerStatsTable: false,
  fixedPlayerStatsTables: [action.payload!].reduce(
    fixedPlayerStatsTableMapEntities,
    state.fixedPlayerStatsTables
  )
});

const postFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostFixedPlayerStatsTable: true
});

const postFixedPlayerStatsTableFailure = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostFixedPlayerStatsTable: false
});

const postFixedPlayerStatsTableSuccess = (
  state: FixedPlayerStatsTableState,
  action: HttpAction<ActionTypes, FixedPlayerStatsTableEntity>
) => ({
  ...state,
  isLoadingPostFixedPlayerStatsTable: false,
  fixedPlayerStatsTables: [action.payload!].reduce(
    fixedPlayerStatsTableMapEntities,
    state.fixedPlayerStatsTables
  )
});

export default createReducer<FixedPlayerStatsTableState>(initialState, {
  [DELETE_FIXED_PLAYER_STATS_TABLE]: deleteFixedPlayerStatsTable,
  [DELETE_FIXED_PLAYER_STATS_TABLE_FAILURE]: deleteFixedPlayerStatsTableFailure,
  [DELETE_FIXED_PLAYER_STATS_TABLE_SUCCESS]: deleteFixedPlayerStatsTableSuccess,
  [PATCH_FIXED_PLAYER_STATS_TABLE]: patchFixedPlayerStatsTable,
  [PATCH_FIXED_PLAYER_STATS_TABLE_FAILURE]: patchFixedPlayerStatsTableFailure,
  [PATCH_FIXED_PLAYER_STATS_TABLE_SUCCESS]: patchFixedPlayerStatsTableSuccess,
  [POST_FIXED_PLAYER_STATS_TABLE]: postFixedPlayerStatsTable,
  [POST_FIXED_PLAYER_STATS_TABLE_FAILURE]: postFixedPlayerStatsTableFailure,
  [POST_FIXED_PLAYER_STATS_TABLE_SUCCESS]: postFixedPlayerStatsTableSuccess
});
