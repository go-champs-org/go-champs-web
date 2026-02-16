import {
  ApiGameAssetType,
  ApiGameLiveState,
  ApiGameResultType
} from '../Shared/httpClient/apiTypes';
import { DEFAULT_TEAM, TeamEntity } from '../Teams/state';

export const GAME_RESULT_TYPE: Record<string, ApiGameResultType> = {
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
  HOME_TEAM_WALKOVER: 'home_team_walkover',
  AWAY_TEAM_WALKOVER: 'away_team_walkover'
};

export const GAME_LIVE_STATE: Record<string, ApiGameLiveState> = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  ENDED: 'ended'
};

export const GAME_ASSET_TYPE: Record<string, ApiGameAssetType> = {
  FIBA_SCORESHEET: 'fiba-scoresheet',
  FIBA_BOXSCORE: 'fiba-boxscore',
  FOLDER_IMAGES: 'folder-images'
};

export interface GameAssetEntity {
  id?: string;
  type: 'fiba-scoresheet' | 'fiba-boxscore' | 'folder-images';
  url: string;
}

export interface GameOfficialEntity {
  id?: string;
  officialId: string;
  role: string;
}

export interface GameEntity {
  id: string;
  assets: GameAssetEntity[];
  awayPlaceholder: string;
  awayScore: number;
  awayTeam: TeamEntity;
  city?: string;
  datetime: string;
  homePlaceholder: string;
  homeScore: number;
  homeTeam: TeamEntity;
  info: string;
  isFinished: boolean;
  location: string;
  officials: GameOfficialEntity[];
  phaseId: string;
  liveState: ApiGameLiveState;
  resultType: ApiGameResultType;
  youTubeCode: string;
}

export interface GameState {
  isLoadingDeleteGame: boolean;
  isLoadingPatchGame: boolean;
  isLoadingPostGame: boolean;
  isLoadingRequestGame: boolean;
  isLoadingRequestGames: boolean;
  games: { [key: string]: GameEntity };
}

export const initialState: GameState = {
  isLoadingDeleteGame: false,
  isLoadingPatchGame: false,
  isLoadingPostGame: false,
  isLoadingRequestGame: false,
  isLoadingRequestGames: false,
  games: {}
};

export const DEFAULT_GAME: GameEntity = {
  id: '',
  assets: [],
  awayPlaceholder: '',
  awayScore: 0,
  awayTeam: DEFAULT_TEAM,
  city: '',
  datetime: '',
  homePlaceholder: '',
  homeScore: 0,
  homeTeam: DEFAULT_TEAM,
  info: '',
  isFinished: false,
  liveState: GAME_LIVE_STATE.NOT_STARTED,
  location: '',
  officials: [],
  phaseId: '',
  youTubeCode: '',
  resultType: GAME_RESULT_TYPE.MANUAL
};

export const DEFAULT_GAME_ASSET: GameAssetEntity = {
  type: GAME_ASSET_TYPE.FOLDER_IMAGES,
  url: ''
};

export const DEFAULT_GAME_OFFICIAL: GameOfficialEntity = {
  officialId: '',
  role: ''
};
