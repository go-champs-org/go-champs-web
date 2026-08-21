import { ApiTeamStatsLog } from './apiTypes';

export interface TeamStatsLogEntity {
  id: string;
  gameId: string;
  phaseId: string;
  teamId: string;
  againstTeamId: string;
  tournamentId: string;
  stats: Record<string, string>;
}

// Player logs arrive as strings and team logs as numbers, for the same stats
// and the same table. Normalizing here keeps that split out of the box score.
const stringifyStats = (stats: Record<string, number>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(stats || {}).map(([slug, value]) => [slug, String(value)])
  );

export const mapApiTeamStatsLogToEntity = (
  apiTeamStatsLog: ApiTeamStatsLog
): TeamStatsLogEntity => ({
  id: apiTeamStatsLog.id,
  gameId: apiTeamStatsLog.game_id,
  phaseId: apiTeamStatsLog.phase_id,
  teamId: apiTeamStatsLog.team_id,
  againstTeamId: apiTeamStatsLog.against_team_id,
  tournamentId: apiTeamStatsLog.tournament_id,
  stats: stringifyStats(apiTeamStatsLog.stats)
});
