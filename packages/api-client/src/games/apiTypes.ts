import { ApiTeam } from '../teams/apiTypes';

export interface ApiGame {
  id: string;
  away_placeholder?: string;
  away_score: number;
  away_team?: ApiTeam;
  datetime?: string;
  home_placeholder?: string;
  home_score: number;
  home_team?: ApiTeam;
  info?: string;
  is_finished: boolean;
  location: string;
  city?: string;
  number?: string;
  phase_id: string;
  youtube_code?: string;
  live_state: string;
  result_type: string;
}

export interface ApiGameResponse {
  data: ApiGame;
}

export interface ApiGamesResponse {
  data: ApiGame[];
}
