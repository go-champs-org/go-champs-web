import { TeamEntity } from '../Teams/state';

export interface GameEntity {
  id: string;
  awayScore: number;
  awayTeam: TeamEntity;
  datetime: string;
  homeScore: number;
  homeTeam: TeamEntity;
  location: string;
}

export interface GameState {
  isLoadingDeleteGame: boolean;
  isLoadingPostGame: boolean;
  isLoadingRequestGame: boolean;
  isLoadingRequestGames: boolean;
  games: { [key: string]: GameEntity };
}

export const initialState: GameState = {
  isLoadingDeleteGame: false,
  isLoadingPostGame: false,
  isLoadingRequestGame: false,
  isLoadingRequestGames: false,
  games: {}
};
