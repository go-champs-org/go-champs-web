export interface EliminationTeamStatEntity {
  id: string;
  teamId: string;
  stats: { [statId: string]: string };
}

export interface EliminationEntity {
  id: string;
  title: string;
  teamStats: EliminationTeamStatEntity[];
}

export interface EliminationState {
  isLoadingDeleteElimination: boolean;
  isLoadingPatchElimination: boolean;
  isLoadingPostElimination: boolean;
  isLoadingRequestTournament: boolean;
  eliminations: { [key: string]: EliminationEntity };
}

export const initialState: EliminationState = {
  isLoadingDeleteElimination: false,
  isLoadingPatchElimination: false,
  isLoadingPostElimination: false,
  isLoadingRequestTournament: false,
  eliminations: {}
};

export const DEFAULT_ELIMINATION: EliminationEntity = {
  id: '',
  title: '',
  teamStats: []
};
