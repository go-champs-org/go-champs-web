import { ApiTeam } from '../teams/apiTypes';

export interface ApiPlayerStat {
  id: string;
  title: string;
  slug?: string;
}

export interface ApiScoreboardSetting {
  id: string;
  live_site_update: string;
  initial_period_time?: number;
  initial_extra_period_time?: number;
}

export interface ApiTournament {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  site_url?: string;
}

export interface ApiTournamentWithTeams extends ApiTournament {
  teams: ApiTeam[];
  sport_slug?: string;
  sport_name?: string;
  player_stats?: ApiPlayerStat[];
  scoreboard_setting?: ApiScoreboardSetting;
}

export interface ApiTournamentsResponse {
  data: ApiTournament[];
}

export interface ApiTournamentResponse {
  data: ApiTournamentWithTeams;
}
