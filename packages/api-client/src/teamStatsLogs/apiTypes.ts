export interface ApiTeamStatsLog {
  id: string;
  game_id: string;
  phase_id: string;
  team_id: string;
  against_team_id: string;
  tournament_id: string;
  // Team totals come back as numbers, unlike the player logs, which are
  // already strings.
  stats: Record<string, number>;
}

export interface ApiTeamStatsLogsResponse {
  data: ApiTeamStatsLog[];
}
