import { PhaseEliminationState, TournamentEntity } from './state';

export const tournamentsLoading = (state: PhaseEliminationState) =>
  state.isLoadingRequestTournaments;

export const tournamentLoading = (state: PhaseEliminationState, slug: string) =>
  !state.tournaments[slug] || state.isLoadingRequestTournament;

export const tournamentBySlug = (
  state: PhaseEliminationState,
  slug: string
): TournamentEntity => state.tournaments[slug];
