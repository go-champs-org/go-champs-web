import { ApiPhase, ApiPhaseRequest } from '../../Shared/httpClient/apiTypes';
import { TournamentPhaseEntity } from './state';

export const mapApiPhaseToPhaseEntity = (
  apiPhase: ApiPhase
): TournamentPhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type
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
