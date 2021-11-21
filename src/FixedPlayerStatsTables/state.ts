export interface FixedPlayerStatsRecordEntity {
  id: string;
  playerId: string;
  value: string;
}

export interface FixedPlayerStatsTableEntity {
  id: string;
  statId: string;
  playerStats: FixedPlayerStatsRecordEntity[];
}

export interface FixedPlayerStatsTableState {
  isLoadingDeleteFixedPlayerStatsTable: boolean;
  isLoadingPatchFixedPlayerStatsTable: boolean;
  isLoadingPostFixedPlayerStatsTable: boolean;
  isLoadingRequestTournament: boolean;
  fixedPlayerStatsTables: { [key: string]: FixedPlayerStatsTableEntity };
}

export const initialState: FixedPlayerStatsTableState = {
  isLoadingDeleteFixedPlayerStatsTable: false,
  isLoadingPatchFixedPlayerStatsTable: false,
  isLoadingPostFixedPlayerStatsTable: false,
  isLoadingRequestTournament: false,
  fixedPlayerStatsTables: {}
};

export const DEFAULT_FIXED_PLAYER_STATS_TABLE: FixedPlayerStatsTableEntity = {
  id: '',
  statId: '',
  playerStats: []
};
