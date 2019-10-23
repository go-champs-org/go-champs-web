import { TournamentEntity, TournamentState } from './state';

export const tournamentsLoading = (state: TournamentState) =>
  state.isLoadingRequestTournaments;

export const tournamentLoading = (state: TournamentState, slug: string) =>
  !state.tournaments[slug] || state.isLoadingRequestTournament;

export const tournamentBySlug = (
  state: TournamentState,
  slug: string
): TournamentEntity => state.tournaments[slug];

export const tournaments = (state: TournamentState) =>
  Object.keys(state.tournaments).map((key: string) => state.tournaments[key]);
