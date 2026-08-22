export interface ApiTeamStatsLog {
  id: string;
  game_id: string;
  phase_id: string;
  team_id: string;
  against_team_id: string;
  tournament_id: string;
  // Staging returns team totals as numbers while the CMS contract declares
  // them as strings, and the same endpoint has to serve both.
  stats: Record<string, string | number>;
}

export interface ApiTeamStatsLogsResponse {
  data: ApiTeamStatsLog[];
}
