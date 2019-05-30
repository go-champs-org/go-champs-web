import { GameEntity } from '../../Games/state';

export interface TournamentGameEntity {
  id: string;
  game: GameEntity;
}

export interface TournamentGameState {
  isLoadingDeleteTournamentGame: boolean;
  isLoadingPostTournamentGame: boolean;
  isLoadingRequestTournamentGame: boolean;
  isLoadingRequestTournamentGames: boolean;
  tournamentGames: { [key: string]: TournamentGameEntity };
  tournamentGamesByDate: {
    [key: string]: { [key: string]: GameEntity };
  };
}

export const initialState: TournamentGameState = {
  isLoadingDeleteTournamentGame: false,
  isLoadingPostTournamentGame: false,
  isLoadingRequestTournamentGame: false,
  isLoadingRequestTournamentGames: false,
  tournamentGames: {},
  tournamentGamesByDate: {}
};
