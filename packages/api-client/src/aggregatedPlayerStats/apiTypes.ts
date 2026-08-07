export interface ApiAggregatedPlayerStatsLog {
  id: string;
  player_id: string;
  stats: Record<string, string>;
}

export interface ApiAggregatedPlayerStatsLogsResponse {
  data: ApiAggregatedPlayerStatsLog[];
}
