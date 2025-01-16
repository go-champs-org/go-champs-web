import { DEFAULT_TEAM, TeamEntity } from '../Teams/state';

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
  location: '',
  phaseId: '',
  youTubeCode: ''
};
