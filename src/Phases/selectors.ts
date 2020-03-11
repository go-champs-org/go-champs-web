import { byOrder } from './compareFunctions';
import { PhaseEntity, PhaseState, DEFAULT_PHASE } from './state';

export const phases = (state: PhaseState): PhaseEntity[] => {
  return Object.keys(state.phases).map((key: string) => state.phases[key]);
};

export const sortedPhases = (state: PhaseState): PhaseEntity[] =>
  phases(state).sort(byOrder);

export const phaseByIdOrDefault = (state: PhaseState, phaseId?: string) => {
  if (phaseId && state.phases[phaseId]) {
    return state.phases[phaseId];
  } else if (state.phases[state.currentPhaseId]) {
    return state.phases[state.currentPhaseId];
  }
  return DEFAULT_PHASE;
};

export const selectedPhase = (state: PhaseState): PhaseEntity | undefined =>
  state.phases[state.currentPhaseId];

export const currentPhaseId = (state: PhaseState): string =>
  state.currentPhaseId;

export const phaseLoading = (state: PhaseState): boolean =>
  state.isLoadingPhase;
export const patchingPhase = (state: PhaseState): boolean =>
  state.isLoadingPatchPhase;
export const postingPhase = (state: PhaseState): boolean =>
  state.isLoadingPostPhase;
export const deletingPhase = (state: PhaseState): boolean =>
  state.isLoadingDeletePhase;
