import type { PlayerStatEntity, SportEntity } from '@gochamps/api-client';
import {
  boxScoreCellValue,
  boxScoreColumns,
  boxScoreColumnViews,
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

describe('boxScoreColumnViews', () => {
  const basketball: SportEntity = sport([sportStatistic('points', 'game')]);

  const labels = {
    minutes_played: { label: 'MIN', description: 'Minutos jogados' },
    points: { label: 'PTS', description: 'Pontos' },
    free_throws_made: { label: 'LL', description: 'Lances livres' }
  };

  it('uses the fixed basketball column set, ignoring what the tournament configured', () => {
    const columns = boxScoreColumnViews([], basketball, {}, labels);

    expect(columns.map(column => column.slug)).toEqual([
      'minutes_played',
      'points',
      'rebounds',
      'assists',
      'blocks',
      'steals',
      'turnovers',
      'efficiency',
      'plus_minus',
      'free_throws_made',
      'free_throw_percentage',
      'field_goals_made',
      'field_goal_percentage',
      'three_point_field_goals_made',
      'three_point_field_goal_percentage',
      'rebounds_offensive',
      'rebounds_defensive',
      'fouls_personal',
      'fouls_technical'
    ]);
    expect(columns.find(column => column.slug === 'minutes_played')).toEqual({
      slug: 'minutes_played',
      attemptedSlug: undefined,
      label: 'MIN',
      description: 'Minutos jogados'
    });
  });

  it('pairs a made column with its attempted counterpart', () => {
    const columns = boxScoreColumnViews([], basketball, {}, labels);

    expect(
      columns.find(column => column.slug === 'free_throws_made')?.attemptedSlug
    ).toBe('free_throws_attempted');
  });

  it('falls back to the tournament-driven columns for any other sport', () => {
    const otherSport: SportEntity = {
      ...sport([sportStatistic('assists', 'game')]),
      slug: 'volleyball_indoor'
    };

    const columns = boxScoreColumnViews(
      [playerStat('assists', 'Assistências')],
      otherSport,
      { assists: 'AST' },
      labels
    );

    expect(columns).toEqual([
      { slug: 'assists', label: 'AST', description: 'Assistências' }
    ]);
  });
});

describe('boxScoreCellValue', () => {
  it('reads minutes played as a clock', () => {
    const column = { slug: 'minutes_played', label: 'MIN', description: '' };

    expect(boxScoreCellValue(column, { minutes_played: '605' })).toBe('10:05');
  });

  it('shows a dash for minutes played with no value', () => {
    const column = { slug: 'minutes_played', label: 'MIN', description: '' };

    expect(boxScoreCellValue(column, {})).toBe('-');
  });

  it('combines a made/attempted pair into one cell', () => {
    const column = {
      slug: 'free_throws_made',
      attemptedSlug: 'free_throws_attempted',
      label: 'LL',
      description: ''
    };

    expect(
      boxScoreCellValue(column, {
        free_throws_made: '8',
        free_throws_attempted: '10'
      })
    ).toBe('8 / 10');
  });

  it('formats a plain column the same way every other table does', () => {
    const column = { slug: 'points', label: 'PTS', description: '' };

    expect(boxScoreCellValue(column, { points: '24' })).toBe('24');
  });
});
