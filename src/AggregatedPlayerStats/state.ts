export interface AggregatedPlayerStatsLogEntity {
  id: string;
  playerId: string;
  stats: { [id: string]: string };
}

export interface PlayerStatsLogState {
  isLoadingRequestPlayerStatsLogs: boolean;
  aggregatedPlayerStatsLogs: { [key: string]: AggregatedPlayerStatsLogEntity };
}

export const initialState: PlayerStatsLogState = {
  isLoadingRequestPlayerStatsLogs: false,
  aggregatedPlayerStatsLogs: {}
};

export const DEFAULT_PLAYER_STATS_LOG: AggregatedPlayerStatsLogEntity = {
  id: '',
  playerId: '',
  stats: {}
};
