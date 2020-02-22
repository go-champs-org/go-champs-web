import {
  EliminationEntity,
  EliminationState,
  DEFAULT_ELIMINATION
} from './state';

export const eliminations = (state: EliminationState): EliminationEntity[] =>
  Object.keys(state.eliminations).map((key: string) => state.eliminations[key]);

export const eliminationsLoading = (state: EliminationState): boolean =>
  state.isLoadingRequestTournament;

export const eliminationById = (
  state: EliminationState,
  eliminationId: string
) => {
  if (!eliminationId || !state.eliminations[eliminationId]) {
    return DEFAULT_ELIMINATION;
  }
  return state.eliminations[eliminationId];
};
