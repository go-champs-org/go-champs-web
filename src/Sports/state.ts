export type ValueType = 'manual' | 'calculated';
export type Level = 'game' | 'tournament';
export type Scope = 'aggregate' | 'per_game';

export interface CoachType {
  type: string;
}

export interface Statistic {
  name: string;
  slug: string;
  valueType: ValueType;
  level: Level;
  scope: Scope;
}

export interface SportEntity {
  name: string;
  slug: string;
  playerStatistics: Statistic[];
  coachTypes: CoachType[];
}

export interface SportState {
  isLoadingRequestSports: boolean;
  sports: { [key: string]: SportEntity };
}

export interface SportsMap {
  [id: string]: SportEntity;
}

export const initialState: SportState = {
  isLoadingRequestSports: false,
  sports: {}
};

export const DEFAULT_SPORT: SportEntity = {
  name: '',
  slug: '',
  playerStatistics: [],
  coachTypes: []
};
