import { PhaseRoundEntity, PhaseRoundState } from './state';

const byOrder = (
  phaseRoundA: PhaseRoundEntity,
  phaseRoundB: PhaseRoundEntity
) => phaseRoundA.order - phaseRoundB.order;

export const allPhaseRounds = (state: PhaseRoundState): PhaseRoundEntity[] =>
  Object.keys(state.rounds)
    .map((key: string) => state.rounds[key])
    .sort(byOrder);
