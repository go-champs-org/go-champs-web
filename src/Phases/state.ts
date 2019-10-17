export enum PhaseTypes {
  elimination = 'elimination',
  draw = 'draw'
}

export interface PhaseEntity {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  isInProgress: boolean;
}

export interface PhaseState {
  isLoadingDeletePhase: boolean;
  isLoadingPatchPhase: boolean;
  isLoadingPostPhase: boolean;
  isLoadingRequestTournament: boolean;
  phases: { [key: string]: PhaseEntity };
}

export const initialState: PhaseState = {
  isLoadingDeletePhase: false,
  isLoadingPatchPhase: false,
  isLoadingPostPhase: false,
  isLoadingRequestTournament: false,
  phases: {}
};
