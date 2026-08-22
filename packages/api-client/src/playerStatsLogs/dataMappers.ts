import { ApiPlayerStatsLog } from './apiTypes';

export interface PlayerStatsLogEntity {
  id: string;
  gameId: string;
  phaseId: string;
  playerId: string;
  teamId: string;
  tournamentId: string;
  stats: Record<string, string>;
}

export const mapApiPlayerStatsLogToEntity = (
  apiPlayerStatsLog: ApiPlayerStatsLog
): PlayerStatsLogEntity => ({
  id: apiPlayerStatsLog.id,
  gameId: apiPlayerStatsLog.game_id,
  phaseId: apiPlayerStatsLog.phase_id,
  playerId: apiPlayerStatsLog.player_id,
  teamId: apiPlayerStatsLog.team_id,
  tournamentId: apiPlayerStatsLog.tournament_id,
  stats: apiPlayerStatsLog.stats || {}
});
