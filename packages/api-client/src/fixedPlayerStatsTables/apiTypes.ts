export interface ApiFixedPlayerStatsTableRecord {
  id: string;
  player_id: string;
  value: string;
}

export interface ApiFixedPlayerStatsTable {
  id: string;
  stat_id: string;
  player_stats: ApiFixedPlayerStatsTableRecord[];
  tournament_id: string;
}

export interface ApiFixedPlayerStatsTablesResponse {
  data: ApiFixedPlayerStatsTable[];
}
