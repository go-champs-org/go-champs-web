import { EliminationEntity, EliminationState } from './state';

export const allElimination = (state: EliminationState): EliminationEntity[] =>
  Object.keys(state.eliminations).map((key: string) => state.eliminations[key]);
