export interface TeamStatsLogEntity {
  id: string;
  gameId: string;
  againstTeamId: string;
  phaseId: string;
  stats: { [id: string]: string };
  teamId: string;
  tournamentId: string;
}

export interface TeamStatsLogState {
  isLoadingDeleteTeamStatsLog: boolean;
  isLoadingPatchTeamStatsLog: boolean;
  isLoadingPostTeamStatsLog: boolean;
  isLoadingRequestTeamStatsLogs: boolean;
  teamStatsLogs: { [key: string]: TeamStatsLogEntity };
}

export const initialState: TeamStatsLogState = {
  isLoadingDeleteTeamStatsLog: false,
  isLoadingPatchTeamStatsLog: false,
  isLoadingPostTeamStatsLog: false,
  isLoadingRequestTeamStatsLogs: false,
  teamStatsLogs: {}
};

export const DEFAULT_TEAM_STATS_LOG: TeamStatsLogEntity = {
  id: '',
  gameId: '',
  phaseId: '',
  teamId: '',
  stats: {},
  againstTeamId: '',
  tournamentId: ''
};
