export interface ApiPlayerStatsLog {
  id: string;
  game_id: string;
  phase_id: string;
  player_id: string;
  team_id: string;
  tournament_id: string;
  stats: Record<string, string>;
}

export interface ApiPlayerStatsLogsResponse {
  data: ApiPlayerStatsLog[];
}
