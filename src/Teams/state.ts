export interface TeamEntity {
  id: string;
  name: string;
  logoUrl: string;
  triCode: string;
}

export interface TeamState {
  isLoadingDeleteTeam: boolean;
  isLoadingPatchTeam: boolean;
  isLoadingPostTeam: boolean;
  isLoadingRequestTournament: boolean;
  teams: { [key: string]: TeamEntity };
}

export interface TeamsMap {
  [id: string]: TeamEntity;
}

export const initialState: TeamState = {
  isLoadingDeleteTeam: false,
  isLoadingPatchTeam: false,
  isLoadingPostTeam: false,
  isLoadingRequestTournament: false,
  teams: {}
};

export const DEFAULT_TEAM: TeamEntity = {
  id: '',
  name: '',
  logoUrl: '',
  triCode: ''
};
