import { mapApiDrawToRoundEntity } from '../Draws/dataMappers';
import { mapApiEliminationToStandingsEntity } from '../Eliminations/dataMappers';
import { ApiPhase, ApiPhaseRequest } from '../Shared/httpClient/apiTypes';
import { mapApiStatToStatEntity } from '../Tournaments/Stats/dataMappers';
import { TournamentPhaseEntity } from './state';

export const mapApiPhaseToPhaseEntity = (
  apiPhase: ApiPhase
): TournamentPhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type,
  isInProgress: true,
  draws: apiPhase.draws ? apiPhase.draws.map(mapApiDrawToRoundEntity) : [],
  stats: apiPhase.stats ? apiPhase.stats.map(mapApiStatToStatEntity) : [],
  eliminations: apiPhase.eliminations
    ? apiPhase.eliminations.map(mapApiEliminationToStandingsEntity)
    : []
});

export const mapPhaseEntityToApiPhaseRequest = (
  phase: TournamentPhaseEntity
): ApiPhaseRequest => ({
  tournament_phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type
  }
});
