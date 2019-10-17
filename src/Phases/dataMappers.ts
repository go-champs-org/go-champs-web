import { ApiPhase, ApiPhaseRequest } from '../Shared/httpClient/apiTypes';
import { PhaseEntity } from './state';

export const mapApiPhaseToPhaseEntity = (apiPhase: ApiPhase): PhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type,
  isInProgress: true
});

export const mapPhaseEntityToApiPhaseRequest = (
  phase: PhaseEntity
): ApiPhaseRequest => ({
  tournament_phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type
  }
});
