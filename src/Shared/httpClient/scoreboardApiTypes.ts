interface ApiPlayerStatsValues {
  assists: number;
  blocks: number;
  disqualifications: number;
  efficiency: number;
  ejections: number;
  field_goal_percentage: number;
  field_goals_attempted: number;
  field_goals_made: number;
  field_goals_missed: number;
  fouls: number;
  fouls_flagrant: number;
  fouls_personal: number;
  fouls_technical: number;
  free_throw_percentage: number;
  free_throws_attempted: number;
  free_throws_made: number;
  free_throws_missed: number;
  game_played: number;
  game_started: number;
  minutes_played: number;
  plus_minus: number;
  points: number;
  rebounds: number;
  rebounds_defensive: number;
  rebounds_offensive: number;
  steals: number;
  three_point_field_goal_percentage: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_made: number;
  three_point_field_goals_missed: number;
  turnovers: number;
}

interface ApiPlayer {
  id: string;
  name: string;
  number: string | null;
  state: 'available' | 'playing' | 'not_available';
  stats_values: ApiPlayerStatsValues;
}

export interface ApiTeam {
  logo_url: string;
  name: string;
  players: ApiPlayer[];
  stats_values: Record<string, any>;
  total_player_stats: Record<string, any>;
  tri_code: string;
}

export interface ApiClockState {
  initial_period_time: number | null;
  period: number;
  state: 'not_started' | 'running' | 'stopped' | 'ended';
  time: number;
}

interface ApiLiveState {
  ended_at: string | null;
  started_at: string;
  state: 'not_started' | 'in_progress' | 'ended';
}

interface ApiViewSettingsState {
  view: string;
}

interface ApiGameState {
  away_team: ApiTeam;
  clock_state: ApiClockState;
  home_team: ApiTeam;
  id: string;
  live_state: ApiLiveState;
  sport_id: string;
  view_settings_state: ApiViewSettingsState;
}

export interface ApiGameGetResponse {
  data: ApiGameState;
}
