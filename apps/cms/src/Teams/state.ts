import {
  CoachEntity as ImportedCoachEntity,
  TeamEntity as ImportedTeamEntity
} from '@gochamps/domain-types';

export interface CoachEntity extends ImportedCoachEntity {}
export interface TeamEntity extends ImportedTeamEntity {}

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
  triCode: '',
  primaryColor: '',
  coaches: []
};

export const DEFAULT_COACH: CoachEntity = {
  id: '',
  name: '',
  type: ''
};
