import { TournamentEntity, TournamentState, DEFAULT_TOURNAMENT } from './state';

export const tournamentBySlug = (
  state: TournamentState,
  slug?: string
): TournamentEntity => {
  if (!slug || !state.tournaments[slug]) {
    return DEFAULT_TOURNAMENT;
  }
  return state.tournaments[slug];
};

export const tournaments = (state: TournamentState) =>
  Object.keys(state.tournaments).map((key: string) => state.tournaments[key]);

export const tournamentsLoading = (state: TournamentState) =>
  state.isLoadingRequestTournaments;
export const tournamentLoading = (state: TournamentState) =>
  state.isLoadingRequestTournament;
export const patchingTournament = (state: TournamentState): boolean =>
  state.isLoadingPatchTournament;
export const postingTournament = (state: TournamentState): boolean =>
  state.isLoadingPostTournament;
export const deletingTournament = (state: TournamentState): boolean =>
  state.isLoadingDeleteTournament;
