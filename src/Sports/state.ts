export interface Statistic {
  name: string;
  slug: string;
}

export interface SportEntity {
  name: string;
  slug: string;
  playerStatistics: Statistic[];
}

export interface SportState {
  isLoadingRequestSports: boolean;
  sports: { [key: string]: SportEntity };
}

export interface PlayersMap {
  [id: string]: SportEntity;
}

export const initialState: SportState = {
  isLoadingRequestSports: false,
  sports: {}
};

export const DEFAULT_SPORT: SportEntity = {
  name: '',
  slug: '',
  playerStatistics: []
};
