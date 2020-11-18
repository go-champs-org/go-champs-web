import { AggregatedPlayerStatsLogState } from './state';

export const aggregatedPlayerStatLogs = (
  state: AggregatedPlayerStatsLogState
) =>
  Object.keys(state.aggregatedPlayerStatsLogs).map(
    (key: string) => state.aggregatedPlayerStatsLogs[key]
  );
