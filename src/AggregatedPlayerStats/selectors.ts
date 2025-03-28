import {
  AggregatedPlayerStatsLogState,
  DEFAULT_AGGREGATED_PLAYER_STATS_LOG
} from './state';

export const aggregatedPlayerStatLogs = (
  state: AggregatedPlayerStatsLogState
) =>
  Object.keys(state.aggregatedPlayerStatsLogs).map(
    (key: string) => state.aggregatedPlayerStatsLogs[key]
  );

export const aggregatedPlayerStatsByPlayerId = (
  state: AggregatedPlayerStatsLogState,
  playerId?: string
) => {
  const aggregatedPlayerStats = Object.keys(
    state.aggregatedPlayerStatsLogs
  ).map((key: string) => state.aggregatedPlayerStatsLogs[key]);
  return (
    aggregatedPlayerStats.find(
      aggregatedPlayerStat => aggregatedPlayerStat.playerId === playerId
    ) || DEFAULT_AGGREGATED_PLAYER_STATS_LOG
  );
};

export const aggregatedPlayerStatLogsLoading = (
  state: AggregatedPlayerStatsLogState
) => state.isLoadingRequestPlayerStatsLogs;
