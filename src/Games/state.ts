import { TeamEntity } from '../Teams/state';

export interface TournamentGameEntity {
  id: string;
  awayScore: number;
  awayTeam: TeamEntity;
  datetime: string;
  homeScore: number;
  homeTeam: TeamEntity;
  location: string;
}

export interface TournamentGameState {
  isLoadingDeleteTournamentGame: boolean;
  isLoadingPostTournamentGame: boolean;
  isLoadingRequestTournamentGame: boolean;
  isLoadingRequestTournamentGames: boolean;
  tournamentGames: { [key: string]: TournamentGameEntity };
}

export const initialState: TournamentGameState = {
  isLoadingDeleteTournamentGame: false,
  isLoadingPostTournamentGame: false,
  isLoadingRequestTournamentGame: false,
  isLoadingRequestTournamentGames: false,
  tournamentGames: {}
};
