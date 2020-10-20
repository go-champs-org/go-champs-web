import {
  PlayerStatsLogState,
  PlayerStatsLogEntity,
  PlayerStatsLogsForm,
  DEFAULT_PLAYER_STATS_LOG
} from './state';
import { PlayerEntity } from '../Players/state';

export const playerStatLogs = (state: PlayerStatsLogState) =>
  Object.keys(state.playerStatsLogs).map(
    (key: string) => state.playerStatsLogs[key]
  );

export const playerStatLogsByGameIdAndTeamId = (
  state: PlayerStatsLogState,
  gameId: string,
  teamId: string
) =>
  playerStatLogs(state).filter(
    (playerStatsLog: PlayerStatsLogEntity) =>
      playerStatsLog.gameId === gameId && playerStatsLog.teamId === teamId
  );

export const playerStatLogsByPlayerId = (
  state: PlayerStatsLogState,
  playerId: string
) =>
  playerStatLogs(state).find(
    (playerStatsLog: PlayerStatsLogEntity) =>
      playerStatsLog.playerId === playerId
  );

export const playerStatLogsFormByPlayers = (
  state: PlayerStatsLogState,
  gameId: string,
  phaseId: string,
  players: PlayerEntity[],
  teamId: string,
  tournamentId: string
): PlayerStatsLogsForm => {
  return {
    playerStatsLogs: players.map((player: PlayerEntity) => {
      const playerStatsLog =
        playerStatLogsByPlayerId(state, player.id) || DEFAULT_PLAYER_STATS_LOG;

      return {
        ...playerStatsLog,
        gameId,
        phaseId,
        playerId: player.id,
        teamId,
        tournamentId
      };
    })
  };
};
