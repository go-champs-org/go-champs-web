import { PhaseEliminationStatEntity, PhaseEliminationStatState } from './state';

export const eliminationStats = (
  state: PhaseEliminationStatState
): PhaseEliminationStatEntity[] =>
  Object.keys(state.eliminationStats).map(
    (key: string) => state.eliminationStats[key]
  );
