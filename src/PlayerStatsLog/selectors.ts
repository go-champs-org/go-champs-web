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

export const playerStatLogsByPlayerId = (
  state: PlayerStatsLogState,
  playerId: string
) =>
  playerStatLogs(state).filter(
    (playerStatLog: PlayerStatsLogEntity) => playerStatLog.playerId === playerId
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

export const playerStatLogsByGameIdAndPlayerId = (
  state: PlayerStatsLogState,
  gameId: string,
  playerId: string
) =>
  playerStatLogs(state).find(
    (playerStatsLog: PlayerStatsLogEntity) =>
      playerStatsLog.gameId === gameId && playerStatsLog.playerId === playerId
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
        playerStatLogsByGameIdAndPlayerId(state, gameId, player.id) ||
        DEFAULT_PLAYER_STATS_LOG;

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

export const playerStatLogsLoading = (state: PlayerStatsLogState) =>
  state.isLoadingRequestPlayerStatsLogs;
