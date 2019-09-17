import { TournamentGameState } from './state';

export const gamesLoading = (state: TournamentGameState) =>
  state.isLoadingRequestTournamentGames;
