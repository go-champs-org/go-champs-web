export interface EliminationTeamStatEntity {
  id: string;
  placeholder: string;
  teamId: string;
  stats: { [statId: string]: string };
}

export interface EliminationEntity {
  id: string;
  info: string;
  order: number;
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
  info: '',
  order: 0,
  title: '',
  teamStats: []
};

export const DEFAULT_ELIMINATION_TEAM_STAT: EliminationTeamStatEntity = {
  id: '',
  placeholder: '',
  teamId: '',
  stats: {}
};
