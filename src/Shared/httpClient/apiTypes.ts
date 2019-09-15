import { PhaseTypes } from '../../Tournaments/Phases/state';

export interface ApiGroup {
  id: string;
  name: string;
}

export interface ApiGroupRequest {
  tournament_group: ApiGroup;
}

export interface ApiGroupResponse {
  data: ApiGroup;
}

export interface ApiGroupsResponse {
  data: ApiGroup[];
}

export interface ApiPhase {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
}

export interface ApiPhaseRequest {
  tournament_phase: ApiPhase;
}

export interface ApiPhaseResponse {
  data: ApiPhase;
}

export interface ApiPhasesResponse {
  data: ApiPhase[];
}
