import {
  ApiPhase,
  ApiPhasePatchRequest,
  ApiPhasePostRequest,
  ApiStat,
  ApiPatchAndPostStat,
  ApiPhaseBatchPatchRequest
} from '../Shared/httpClient/apiTypes';
import { PhaseEntity, StatEntity } from './state';

export const mapApiEliminationStatToStatEntity = (
  apiStatEntity: ApiStat
): StatEntity => ({
  id: apiStatEntity.id,
  title: apiStatEntity.title
});

export const mapApiPhaseToPhaseEntity = (apiPhase: ApiPhase): PhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type,
  isInProgress: apiPhase.is_in_progress,
  eliminationStats: apiPhase.elimination_stats
    ? apiPhase.elimination_stats.map(mapApiEliminationStatToStatEntity)
    : []
});

export const mapStatEntityToApiEliminationStat = (
  stat: StatEntity
): ApiPatchAndPostStat => ({
  id: stat.id ? stat.id : undefined,
  title: stat.title
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
    tournament_id: tournamentId,
    is_in_progress: phase.isInProgress,
    elimination_stats:
      phase.eliminationStats.length > 0
        ? phase.eliminationStats.map(mapStatEntityToApiEliminationStat)
        : undefined
  }
});

export const mapPhaseEntityToApiPhasePatchRequest = (
  phase: PhaseEntity
): ApiPhasePatchRequest => ({
  phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type,
    is_in_progress: phase.isInProgress,
    elimination_stats:
      phase.eliminationStats.length > 0
        ? phase.eliminationStats.map(mapStatEntityToApiEliminationStat)
        : undefined
  }
});

export const mapPhaseEntitiesToApiPhasePatchBatchRequest = (
  phases: PhaseEntity[]
): ApiPhaseBatchPatchRequest => ({
  phases: phases.map(phase => ({
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type,
    is_in_progress: phase.isInProgress,
    elimination_stats:
      phase.eliminationStats.length > 0
        ? phase.eliminationStats.map(mapStatEntityToApiEliminationStat)
        : undefined
  }))
});
