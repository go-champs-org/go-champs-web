import { ApiTeam } from '../teams/apiTypes';

export interface ApiTournament {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  site_url?: string;
}

export interface ApiTournamentWithTeams extends ApiTournament {
  teams: ApiTeam[];
}

export interface ApiTournamentsResponse {
  data: ApiTournament[];
}

export interface ApiTournamentResponse {
  data: ApiTournamentWithTeams;
}
