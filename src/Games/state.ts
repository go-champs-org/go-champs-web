import {
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

export interface GameEntity {
  id: string;
  awayPlaceholder: string;
  awayScore: number;
  awayTeam: TeamEntity;
  datetime: string;
  homePlaceholder: string;
  homeScore: number;
  homeTeam: TeamEntity;
  info: string;
  isFinished: boolean;
  location: string;
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
  awayPlaceholder: '',
  awayScore: 0,
  awayTeam: DEFAULT_TEAM,
  datetime: '',
  homePlaceholder: '',
  homeScore: 0,
  homeTeam: DEFAULT_TEAM,
  info: '',
  isFinished: false,
  liveState: 'not_started',
  location: '',
  phaseId: '',
  youTubeCode: '',
  resultType: GAME_RESULT_TYPE.MANUAL
};
