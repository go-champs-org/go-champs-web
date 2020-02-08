import {
  ApiPhase,
  ApiPhasePatchRequest,
  ApiPhasePostRequest
} from '../Shared/httpClient/apiTypes';
import { PhaseEntity } from './state';

export const mapApiPhaseToPhaseEntity = (apiPhase: ApiPhase): PhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type,
  isInProgress: true
});

export const mapPhaseEntityToApiPhasePostRequest = (
  phase: PhaseEntity,
  tournamentId: string
): ApiPhasePostRequest => ({
  phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type,
    tournament_id: tournamentId
  }
});

export const mapPhaseEntityToApiPhasePatchRequest = (
  phase: PhaseEntity
): ApiPhasePatchRequest => ({
  phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type
  }
});
