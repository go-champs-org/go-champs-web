export interface PlayerStatsLogEntity {
  id: string;
  gameId: string;
  phaseId: string;
  playerId: string;
  stats: { [id: string]: string };
  teamId: string;
  tournamentId: string;
}

export interface PlayerStatsLogState {
  isLoadingDeletePlayerStatsLog: boolean;
  isLoadingPatchPlayerStatsLog: boolean;
  isLoadingPostPlayerStatsLog: boolean;
  isLoadingRequestPlayerStatsLogs: boolean;
  playerStatsLogs: { [key: string]: PlayerStatsLogEntity };
}

export const initialState: PlayerStatsLogState = {
  isLoadingDeletePlayerStatsLog: false,
  isLoadingPatchPlayerStatsLog: false,
  isLoadingPostPlayerStatsLog: false,
  isLoadingRequestPlayerStatsLogs: false,
  playerStatsLogs: {}
};

export const DEFAULT_PLAYER_STATS_LOG: PlayerStatsLogEntity = {
  id: '',
  gameId: '',
  phaseId: '',
  playerId: '',
  stats: {},
  teamId: '',
  tournamentId: ''
};
