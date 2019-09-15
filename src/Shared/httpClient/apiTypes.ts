import { PhaseTypes } from '../../Tournaments/Phases/state';

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
