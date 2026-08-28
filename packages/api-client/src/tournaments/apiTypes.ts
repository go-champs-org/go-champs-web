import { ApiOrganization } from '../organizations/apiTypes';
import { ApiPhase } from '../phases/apiTypes';
import { ApiPlayer } from '../players/apiTypes';
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
  organization?: ApiOrganization;
  // The roster comes down with the tournament itself — there is no
  // players-by-team endpoint, and the CMS reads it from this same payload
  // (apps/cms/src/Shared/httpClient/apiTypes.ts, ApiTournamentWithDependecies).
  players?: ApiPlayer[];
  // The tournament's phases come down nested too, in order — the player
  // profile reads its per-phase stats table off these titles.
  phases?: ApiPhase[];
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
