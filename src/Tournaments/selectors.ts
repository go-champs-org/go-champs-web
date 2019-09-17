import { TournamentState } from './state';

export const tournamentsLoading = (state: TournamentState) =>
  state.isLoadingRequestTournaments;

export const tournamentLoading = (state: TournamentState) =>
  state.isLoadingRequestTournament;
