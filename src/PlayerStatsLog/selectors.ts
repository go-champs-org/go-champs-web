export interface PlayerStatLog {
  id: string;
  tournamentId: string;
  phaseId: string;
  gameId: string;
  playerId: string;
  stats: {
    [id: string]: number;
  };
}

const SAMPLE_PLAYER_STAT_LOGS: PlayerStatLog[] = [
  {
    id: 'first-log',
    gameId: 'game-id',
    phaseId: 'phase-id',
    playerId: '82697084-8bfd-481a-92bb-e46f832db3c2',
    stats: {
      '13465098-fb0e-41fb-aebf-b7d829aa8d07': 12,
      '6abda29e-e3bb-479e-8c61-50aaa9bb2fee': 8
    },
    tournamentId: 'tournament-id'
  },
  {
    id: 'second-log',
    gameId: 'game-id',
    phaseId: 'phase-id',
    playerId: 'c8828f6d-a7a5-4194-8c8b-78c9bc50dba3',
    stats: {
      '13465098-fb0e-41fb-aebf-b7d829aa8d07': 15,
      '6abda29e-e3bb-479e-8c61-50aaa9bb2fee': 10
    },
    tournamentId: 'tournament-id'
  }
];

export const playerStatLogBy = () => SAMPLE_PLAYER_STAT_LOGS;
