import type { PlayerStatEntity, SportEntity } from '@gochamps/api-client';
import {
  boxScoreColumns,
  boxScoreRows,
  playerNamesById,
  shouldShowBoxScore,
  splitLogsByTeam,
  teamTotals
} from './boxScore';

const playerStat = (slug: string, title: string): PlayerStatEntity => ({
  id: `stat-${slug}`,
  title,
  slug,
  visibility: slug === 'efficiency' ? 'private' : 'public'
});

const sportStatistic = (slug: string, level: string) => ({
  slug,
  name: slug,
  level,
  scope: 'aggregate',
  valueType: 'manual'
});

const sport = (statistics: ReturnType<typeof sportStatistic>[]): SportEntity => ({
  slug: 'basketball_5x5',
  name: 'Basketball 5x5',
  playerStatistics: statistics
});

const player = (id: string, name: string, shirtName = '') => ({
  id,
  name,
  shirtName,
  shirtNumber: '',
  teamId: 'team1',
  photoUrl: '',
  licenseNumber: ''
});

const playerLog = (playerId: string, teamId: string, stats: Record<string, string> = {}) => ({
  id: `log-${playerId}`,
  gameId: 'g1',
  phaseId: 'ph1',
  playerId,
  teamId,
  tournamentId: 't1',
  stats
});

const teamLog = (teamId: string, stats: Record<string, string> = {}) => ({
  id: `team-log-${teamId}`,
  gameId: 'g1',
  phaseId: 'ph1',
  teamId,
  againstTeamId: '',
  tournamentId: 't1',
  stats
});

describe('splitLogsByTeam', () => {
  it('separates the logs of each side by team id', () => {
    const logs = [
      playerLog('p1', 'home'),
      playerLog('p2', 'away'),
      playerLog('p3', 'home')
    ];

    const split = splitLogsByTeam(logs, 'home', 'away');

    expect(split.home.map(log => log.playerId)).toEqual(['p1', 'p3']);
    expect(split.away.map(log => log.playerId)).toEqual(['p2']);
  });

  it('leaves out a log for neither side', () => {
    const split = splitLogsByTeam([playerLog('p1', 'other')], 'home', 'away');

    expect(split.home).toEqual([]);
    expect(split.away).toEqual([]);
  });
});

describe('teamTotals', () => {
  it('finds the totals log of the team', () => {
    const logs = [teamLog('home', { points: '82' }), teamLog('away', { points: '74' })];

    expect(teamTotals(logs, 'home')).toEqual({ points: '82' });
  });

  it('reads an empty totals row when the team has no log yet', () => {
    expect(teamTotals([], 'home')).toEqual({});
  });
});

describe('playerNamesById', () => {
  it('names a player by the shirt name over the given name', () => {
    const names = playerNamesById([player('p1', 'Ana Silva', 'Ana')]);

    expect(names.p1).toBe('Ana');
  });

  it('falls back to the given name when there is no shirt name', () => {
    const names = playerNamesById([player('p1', 'Ana Silva')]);

    expect(names.p1).toBe('Ana Silva');
  });
});

describe('boxScoreRows', () => {
  it('names each row from the map, preserving the order of the logs', () => {
    const logs = [playerLog('p2', 'home', { points: '10' }), playerLog('p1', 'home', { points: '20' })];

    const rows = boxScoreRows(logs, { p1: 'Ana', p2: 'Bia' });

    expect(rows).toEqual([
      { playerId: 'p2', name: 'Bia', stats: { points: '10' } },
      { playerId: 'p1', name: 'Ana', stats: { points: '20' } }
    ]);
  });

  it('reads an empty name for a log the roster no longer names', () => {
    const rows = boxScoreRows([playerLog('p9', 'home', { points: '5' })], {});

    expect(rows[0].name).toBe('');
  });
});

describe('shouldShowBoxScore', () => {
  it('hides a live game when the tournament does not allow full live updates', () => {
    expect(
      shouldShowBoxScore('in_progress', 'team-score-live-update', [playerLog('p1', 'home')], [])
    ).toBe(false);
  });

  it('shows a live game with logs when the tournament allows full live updates', () => {
    expect(
      shouldShowBoxScore('in_progress', 'full-live-update', [playerLog('p1', 'home')], [])
    ).toBe(true);
  });

  it('hides a live game with full live updates but no logs yet', () => {
    expect(shouldShowBoxScore('in_progress', 'full-live-update', [], [])).toBe(false);
  });

  it('shows a finished game with logs regardless of the live update setting', () => {
    expect(
      shouldShowBoxScore('ended', 'no-live-update', [playerLog('p1', 'home')], [])
    ).toBe(true);
  });

  it('hides a finished game with no logs at all', () => {
    expect(shouldShowBoxScore('ended', 'full-live-update', [], [])).toBe(false);
  });
});

describe('boxScoreColumns', () => {
  const tournamentStats = [
    playerStat('assists', 'Assistências'),
    playerStat('points', 'Pontos'),
    playerStat('efficiency', 'Eficiência'),
    playerStat('season_award', 'Prêmio da temporada')
  ];

  it('narrows the columns to the statistics the sport scores at the game level', () => {
    const basketball = sport([
      sportStatistic('assists', 'game'),
      sportStatistic('points', 'game'),
      sportStatistic('efficiency', 'game'),
      sportStatistic('season_award', 'tournament')
    ]);

    const columns = boxScoreColumns(tournamentStats, basketball);

    expect(columns.map(column => column.slug)).toEqual(['points', 'assists']);
  });

  it('drops a private statistic even when the sport scores it at the game level', () => {
    const basketball = sport([sportStatistic('efficiency', 'game')]);

    const columns = boxScoreColumns(
      [playerStat('efficiency', 'Eficiência')],
      basketball
    );

    expect(columns).toEqual([]);
  });

  it('orders the columns the way the sport reads them, not the way the API listed them', () => {
    const basketball = sport([
      sportStatistic('assists', 'game'),
      sportStatistic('points', 'game')
    ]);

    const columns = boxScoreColumns(tournamentStats, basketball);

    expect(columns.map(column => column.slug)).toEqual(['points', 'assists']);
  });

  it('falls back to every visible tournament statistic when the sport has none at the game level, still in the sport order', () => {
    const basketball = sport([]);

    const columns = boxScoreColumns(tournamentStats, basketball);

    expect(columns.map(column => column.slug)).toEqual([
      'points',
      'assists',
      'season_award'
    ]);
  });

  it('falls back to every visible statistic in API order when the sport is unavailable', () => {
    const columns = boxScoreColumns(tournamentStats, null);

    expect(columns.map(column => column.slug)).toEqual([
      'assists',
      'points',
      'season_award'
    ]);
  });
});
