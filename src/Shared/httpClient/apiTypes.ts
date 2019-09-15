import { PhaseTypes } from '../../Tournaments/Phases/state';

export interface ApiTeam {
  id: string;
  name: string;
  group?: ApiGroup;
}

interface ApiGame {
  id: string;
  away_score: number;
  datetime: string;
  home_score: number;
  location: string;
}

export interface ApiGameWithDepedencies extends ApiGame {
  away_team?: ApiTeam;
  home_team?: ApiTeam;
}

export interface ApiGameWithDepedenciesIds extends ApiGame {
  away_team_id: string;
  home_team_id: string;
}

export interface ApiGameRequest {
  tournament_game: ApiGameWithDepedenciesIds;
}

export interface ApiGameResponse {
  data: ApiGameWithDepedencies;
}

export interface ApiGamesResponse {
  data: ApiGameWithDepedencies[];
}

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
