import { TournamentPhaseEntity } from './state';

export const byOrder = (
  tournamentPhaseA: TournamentPhaseEntity,
  tournamentPhaseB: TournamentPhaseEntity
) => tournamentPhaseA.order - tournamentPhaseB.order;
