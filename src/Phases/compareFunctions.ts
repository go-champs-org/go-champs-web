import { PhaseEntity } from './state';

export const byOrder = (
  tournamentPhaseA: PhaseEntity,
  tournamentPhaseB: PhaseEntity
) => tournamentPhaseA.order - tournamentPhaseB.order;
