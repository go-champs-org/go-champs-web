import { ApiTeam } from '../teams/apiTypes';

export type ApiGameAssetType = 'fiba-scoresheet' | 'fiba-boxscore' | 'folder-images';

export interface ApiGameAsset {
  id?: string;
  type: ApiGameAssetType;
  url: string;
}

export interface ApiGame {
  id: string;
  assets?: ApiGameAsset[];
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
