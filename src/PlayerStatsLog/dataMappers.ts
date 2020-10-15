import { PlayerStatsLogEntity } from './state';
import {
  ApiPlayerStatsLog,
  ApiPlayerStatsLogRequest,
  ApiPlayerStatsLogPatchPostResponse
} from '../Shared/httpClient/apiTypes';

export const mapPlayerStatsLogEntityToApiPlayerStatsLog = (
  playerStatsLog: PlayerStatsLogEntity
): ApiPlayerStatsLog => ({
  id: playerStatsLog.id,
  game_id: playerStatsLog.gameId,
  phase_id: playerStatsLog.phaseId,
  player_id: playerStatsLog.playerId,
  stats: playerStatsLog.stats,
  team_id: playerStatsLog.teamId,
  tournament_id: playerStatsLog.tournamentId
});

export const mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest = (
  playerStatsLogs: PlayerStatsLogEntity[]
): ApiPlayerStatsLogRequest => ({
  player_stats_logs: playerStatsLogs.map(
    mapPlayerStatsLogEntityToApiPlayerStatsLog
  )
});

export const mapApiPlayerStatsLogToPlayerStatsLog = (
  apiPlayerStatsLog: ApiPlayerStatsLog
): PlayerStatsLogEntity => ({
  gameId: apiPlayerStatsLog.game_id,
  id: apiPlayerStatsLog.id,
  phaseId: apiPlayerStatsLog.phase_id,
  playerId: apiPlayerStatsLog.player_id,
  stats: apiPlayerStatsLog.stats,
  teamId: apiPlayerStatsLog.team_id,
  tournamentId: apiPlayerStatsLog.tournament_id
});

export const mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs = (
  apiPlayerStatsLogs: ApiPlayerStatsLogPatchPostResponse
): PlayerStatsLogEntity[] =>
  Object.keys(apiPlayerStatsLogs).map((key: string) =>
    mapApiPlayerStatsLogToPlayerStatsLog(apiPlayerStatsLogs[key])
  );
