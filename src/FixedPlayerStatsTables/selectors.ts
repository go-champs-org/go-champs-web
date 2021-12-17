import {
  FixedPlayerStatsTableEntity,
  FixedPlayerStatsTableState,
  DEFAULT_FIXED_PLAYER_STATS_TABLE
} from './state';

export const fixedPlayerStatsTables = (
  state: FixedPlayerStatsTableState
): FixedPlayerStatsTableEntity[] =>
  Object.keys(state.fixedPlayerStatsTables).map(
    (key: string) => state.fixedPlayerStatsTables[key]
  );

export const fixedPlayerStatsTableById = (
  state: FixedPlayerStatsTableState,
  fixedPlayerStatsTableId: string
) => {
  if (
    !fixedPlayerStatsTableId ||
    !state.fixedPlayerStatsTables[fixedPlayerStatsTableId]
  ) {
    return DEFAULT_FIXED_PLAYER_STATS_TABLE;
  }
  return state.fixedPlayerStatsTables[fixedPlayerStatsTableId];
};

export const hasSummaryStatistics = (state: FixedPlayerStatsTableState) =>
  fixedPlayerStatsTables(state).length > 0;

export const fixedPlayerStatsTablesLoading = (
  state: FixedPlayerStatsTableState
): boolean => state.isLoadingRequestFixedPlayerStatsTables;
export const patchingFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState
): boolean => state.isLoadingPatchFixedPlayerStatsTable;
export const postingFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState
): boolean => state.isLoadingPostFixedPlayerStatsTable;
export const deletingFixedPlayerStatsTable = (
  state: FixedPlayerStatsTableState
): boolean => state.isLoadingDeleteFixedPlayerStatsTable;
