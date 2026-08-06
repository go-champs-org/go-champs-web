import { ApiPhase, ApiPhaseType } from './apiTypes';

export interface PhaseEntity {
  id: string;
  title: string;
  type: ApiPhaseType;
  order: number;
  isInProgress: boolean;
}

export const mapApiPhaseToPhaseEntity = (apiPhase: ApiPhase): PhaseEntity => ({
  id: apiPhase.id,
  title: apiPhase.title,
  type: apiPhase.type,
  order: apiPhase.order,
  isInProgress: apiPhase.is_in_progress
});
