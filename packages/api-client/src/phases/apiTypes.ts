export type ApiPhaseType = 'elimination' | 'draw';

export interface ApiPhase {
  id: string;
  title: string;
  type: ApiPhaseType;
  order: number;
  is_in_progress: boolean;
}

export interface ApiPhaseResponse {
  data: ApiPhase;
}
