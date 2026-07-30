import { ApiTeamStatsLog } from '../Shared/httpClient/apiTypes';
import { TeamStatsLogEntity } from './state';

export const mapApiTeamStatsLogsToTeamStatsLogs = (
  apiTeamStatsLogs: ApiTeamStatsLog[]
): TeamStatsLogEntity[] => {
  return apiTeamStatsLogs.map(teamStatsLog => ({
    id: teamStatsLog.id,
    gameId: teamStatsLog.game_id,
    againstTeamId: teamStatsLog.against_team_id,
    phaseId: teamStatsLog.phase_id,
    stats: teamStatsLog.stats,
    teamId: teamStatsLog.team_id,
    tournamentId: teamStatsLog.tournament_id
  }));
};
