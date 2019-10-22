import { byOrder } from './compareFunctions';
import { PhaseEntity, PhaseState } from './state';

export const phases = (state: PhaseState): PhaseEntity[] =>
  Object.keys(state.phases).map((key: string) => state.phases[key]);

export const sortedPhases = (state: PhaseState): PhaseEntity[] =>
  phases(state).sort(byOrder);

export const isInProgressPhase = (
  state: PhaseState
): PhaseEntity | undefined => {
  return phases(state).find((phase: PhaseEntity) => phase.isInProgress);
};

export const phaseById = (
  state: PhaseState,
  id: string
): PhaseEntity | undefined => state.phases[id];

export const phaseLoading = (state: PhaseState) => state.isLoadingPhase;
