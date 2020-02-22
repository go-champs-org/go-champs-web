export enum PhaseTypes {
  elimination = 'elimination',
  draw = 'draw'
}

export interface StatEntity {
  id: string;
  title: string;
}

export interface PhaseEntity {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  eliminationStats: StatEntity[];
  isInProgress: boolean;
}

export interface PhaseState {
  isLoadingDeletePhase: boolean;
  isLoadingPatchPhase: boolean;
  isLoadingPostPhase: boolean;
  isLoadingPhase: boolean;
  phases: { [key: string]: PhaseEntity };
  currentPhaseId: string;
}

export const initialState: PhaseState = {
  isLoadingDeletePhase: false,
  isLoadingPatchPhase: false,
  isLoadingPostPhase: false,
  isLoadingPhase: false,
  phases: {},
  currentPhaseId: ''
};

export const DEFAULT_PHASE: PhaseEntity = {
  id: '',
  title: '',
  type: PhaseTypes.elimination,
  order: 0,
  eliminationStats: [],
  isInProgress: false
};

export const DEFAULT_ELIMINATION_STAT: StatEntity = {
  id: '',
  title: ''
};
