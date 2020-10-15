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
  isLoadingRequestTournament: boolean;
  playerStatsLogs: { [key: string]: PlayerStatsLogEntity };
}

export const initialState: PlayerStatsLogState = {
  isLoadingDeletePlayerStatsLog: false,
  isLoadingPatchPlayerStatsLog: false,
  isLoadingPostPlayerStatsLog: false,
  isLoadingRequestTournament: false,
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
