import { PhaseEliminationStatEntity, PhaseEliminationStatState } from './state';

export const allEliminationStats = (
  state: PhaseEliminationStatState
): PhaseEliminationStatEntity[] =>
  Object.keys(state.eliminationStats).map(
    (key: string) => state.eliminationStats[key]
  );
