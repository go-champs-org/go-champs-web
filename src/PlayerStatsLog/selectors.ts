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
  players: PlayerEntity[]
) =>
  players.map((player: PlayerEntity) => {
    const playerStatsLog =
      playerStatLogsByPlayerId(state, gameId, player.id) ||
      DEFAULT_PLAYER_STATS_LOG;
    return {
      ...playerStatsLog,
      playerId: player.id
    };
  });

export const playerStatLogsByPlayerId = (
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
        playerStatLogsByPlayerId(state, gameId, player.id) ||
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
