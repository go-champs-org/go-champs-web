import { AggregatedPlayerStatsLogState } from './state';

export const aggregatedPlayerStatLogs = (
  state: AggregatedPlayerStatsLogState
) =>
  Object.keys(state.aggregatedPlayerStatsLogs).map(
    (key: string) => state.aggregatedPlayerStatsLogs[key]
  );

export const aggregatedPlayerStatLogsLoading = (
  state: AggregatedPlayerStatsLogState
) => state.isLoadingRequestPlayerStatsLogs;
