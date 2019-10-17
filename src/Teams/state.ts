export interface TeamEntity {
  id: string;
  name: string;
  stats: { [key: string]: any };
}

export interface TeamState {
  isLoadingDeleteTeam: boolean;
  isLoadingPatchTeam: boolean;
  isLoadingPostTeam: boolean;
  isLoadingRequestTournament: boolean;
  teams: { [key: string]: TeamEntity };
}

export const initialState: TeamState = {
  isLoadingDeleteTeam: false,
  isLoadingPatchTeam: false,
  isLoadingPostTeam: false,
  isLoadingRequestTournament: false,
  teams: {}
};

export const DEFAULT_TEAM_ENTITY = {
  id: '',
  name: '',
  stats: {}
};
