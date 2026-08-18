export interface ApiAboutStats {
  public_games_count: number;
  public_tournaments_count: number;
  organizations_with_public_tournaments_count: number;
}

export interface ApiAboutStatsResponse {
  data: ApiAboutStats;
}
