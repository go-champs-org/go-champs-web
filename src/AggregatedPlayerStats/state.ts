export interface AggregatedPlayerStatsLogEntity {
  id: string;
  playerId: string;
  stats: { [id: string]: string };
}

export interface AggregatedPlayerStatsLogState {
  isLoadingRequestPlayerStatsLogs: boolean;
  aggregatedPlayerStatsLogs: { [key: string]: AggregatedPlayerStatsLogEntity };
}

export const initialState: AggregatedPlayerStatsLogState = {
  isLoadingRequestPlayerStatsLogs: false,
  aggregatedPlayerStatsLogs: {}
};

export const DEFAULT_AGGREGATED_PLAYER_STATS_LOG: AggregatedPlayerStatsLogEntity = {
  id: '',
  playerId: '',
  stats: {}
};
