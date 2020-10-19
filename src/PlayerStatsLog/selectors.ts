import {
  PlayerStatsLogState,
  PlayerStatsLogEntity,
  PlayerStatsLogsForm,
  DEFAULT_PLAYER_STATS_LOG
} from './state';
import { PlayerEntity } from '../Players/state';

const SAMPLE_PLAYER_STAT_LOGS: PlayerStatsLogEntity[] = [
  {
    id: 'first-log',
    gameId: 'game-id',
    phaseId: 'phase-id',
    playerId: '82697084-8bfd-481a-92bb-e46f832db3c2',
    stats: {
      '13465098-fb0e-41fb-aebf-b7d829aa8d07': '12',
      '6abda29e-e3bb-479e-8c61-50aaa9bb2fee': '8'
    },
    tournamentId: 'tournament-id',
    teamId: 'team-id'
  },
  {
    id: 'second-log',
    gameId: 'game-id',
    phaseId: 'phase-id',
    playerId: 'c8828f6d-a7a5-4194-8c8b-78c9bc50dba3',
    stats: {
      '13465098-fb0e-41fb-aebf-b7d829aa8d07': '15',
      '6abda29e-e3bb-479e-8c61-50aaa9bb2fee': '10'
    },
    tournamentId: 'tournament-id',
    teamId: 'team-id'
  }
];

export const playerStatLogs = (state: PlayerStatsLogState) =>
  Object.keys(state.playerStatsLogs).map(
    (key: string) => state.playerStatsLogs[key]
  );

export const playerStatLogBy = () => SAMPLE_PLAYER_STAT_LOGS;
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
  players: PlayerEntity[]
): PlayerStatsLogsForm => {
  return {
    playerStatsLogs: players.map((player: PlayerEntity) => {
      const playerStatsLog =
        playerStatLogsByPlayerId(state, player.id) || DEFAULT_PLAYER_STATS_LOG;

      return {
        ...playerStatsLog,
        playerId: player.id
      };
    })
  };
};
