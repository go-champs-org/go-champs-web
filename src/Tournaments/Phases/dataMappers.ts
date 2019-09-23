import { ApiPhase, ApiPhaseRequest } from '../../Shared/httpClient/apiTypes';
import { mapApiStatToStatEntity } from '../Stats/dataMappers';
import { TournamentPhaseEntity } from './state';

export const mapApiPhaseToPhaseEntity = (
  apiPhase: ApiPhase
): TournamentPhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type,
  isInProgress: true,
  stats: apiPhase.stats ? apiPhase.stats.map(mapApiStatToStatEntity) : []
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
