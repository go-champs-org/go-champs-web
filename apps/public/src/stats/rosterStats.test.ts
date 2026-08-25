import type { PlayerStatEntity, SportEntity } from '@gochamps/api-client';
import {
  availableScopes,
  formatStatValue,
  rosterStatRows,
  sortRosterRows,
  columnViewsByScope,
  statColumnsByScope,
  statColumnViews,
  statTotals,
  statTotalsByScope,
  statColumnsForScope,
  type RosterStatRow
} from './rosterStats';

const playerStat = (slug: string, title: string): PlayerStatEntity => ({
  id: `stat-${slug}`,
  title,
  slug,
  // The mapper is what decides visibility from the slug; the fixtures below
  // pass whatever a tournament payload would carry.
  visibility: slug === 'efficiency' ? 'private' : 'public'
});

const sportStatistic = (slug: string, scope: string) => ({
  slug,
  name: slug,
  level: 'tournament',
  scope,
  valueType: 'manual'
});

const sport = (statistics: ReturnType<typeof sportStatistic>[]): SportEntity => ({
  slug: 'basketball_5x5',
  name: 'Basketball 5x5',
  playerStatistics: statistics
});

const player = (id: string, name: string, shirtNumber = '') => ({
  id,
  name,
  shirtName: '',
  shirtNumber,
  teamId: 'team1',
  photoUrl: '',
  licenseNumber: ''
});

const statsLog = (playerId: string, stats: Record<string, string>) => ({
  id: `log-${playerId}`,
  playerId,
  stats
});

describe('statColumnsForScope', () => {
  const tournamentStats = [
    playerStat('assists', 'Assistências'),
    playerStat('points', 'Pontos'),
    playerStat('efficiency', 'Eficiência'),
    playerStat('points_per_game', 'Pontos por jogo')
  ];

  const basketball = sport([
    sportStatistic('assists', 'aggregate'),
    sportStatistic('points', 'aggregate'),
    sportStatistic('efficiency', 'aggregate'),
    sportStatistic('points_per_game', 'per_game')
  ]);

  it('keeps only the stats of the asked scope', () => {
    const columns = statColumnsForScope(tournamentStats, basketball, 'per_game');

    expect(columns.map(column => column.slug)).toEqual(['points_per_game']);
  });

  it('drops the stats the tournament keeps private', () => {
    const columns = statColumnsForScope(tournamentStats, basketball, 'aggregate');

    expect(columns.map(column => column.slug)).not.toContain('efficiency');
  });

  it('orders the columns the way the sport reads them, not the way the API listed them', () => {
    const columns = statColumnsForScope(tournamentStats, basketball, 'aggregate');

    expect(columns.map(column => column.slug)).toEqual(['points', 'assists']);
  });

  it('leaves out a stat the table of the sport does not carry', () => {
    const columns = statColumnsForScope(
      [...tournamentStats, playerStat('custom_stat', 'Estatística da casa')],
      sport([
        ...basketball.playerStatistics,
        sportStatistic('custom_stat', 'aggregate')
      ]),
      'aggregate'
    );

    expect(columns.map(column => column.slug)).toEqual(['points', 'assists']);
  });

  it('falls back to every visible stat when the sport is unavailable', () => {
    const columns = statColumnsForScope(tournamentStats, null, 'aggregate');

    expect(columns.map(column => column.slug)).toEqual([
      'assists',
      'points',
      'points_per_game'
    ]);
  });
});

describe('availableScopes', () => {
  it('offers both scopes when the tournament shows columns for each', () => {
    const scopes = availableScopes(
      [playerStat('points', 'Pontos'), playerStat('points_per_game', 'PPJ')],
      sport([
        sportStatistic('points', 'aggregate'),
        sportStatistic('points_per_game', 'per_game')
      ])
    );

    expect(scopes).toEqual(['aggregate', 'per_game']);
  });

  it('offers a single scope when the other one has no visible column', () => {
    const scopes = availableScopes(
      [playerStat('points', 'Pontos')],
      sport([
        sportStatistic('points', 'aggregate'),
        sportStatistic('points_per_game', 'per_game')
      ])
    );

    expect(scopes).toEqual(['aggregate']);
  });

  it('offers the aggregate scope when no statistic of the tournament is on the table', () => {
    const scopes = availableScopes(
      [playerStat('efficiency', 'Eficiência')],
      sport([sportStatistic('efficiency', 'aggregate')])
    );

    expect(scopes).toEqual(['aggregate']);
  });

  it('offers the aggregate scope alone when the sport is unavailable', () => {
    expect(availableScopes([playerStat('points', 'Pontos')], null)).toEqual([
      'aggregate'
    ]);
  });
});

describe('statColumnsByScope', () => {
  it('resolves the columns of every scope the table offers', () => {
    const columns = statColumnsByScope(
      [playerStat('points', 'Pontos'), playerStat('points_per_game', 'PPJ')],
      sport([
        sportStatistic('points', 'aggregate'),
        sportStatistic('points_per_game', 'per_game')
      ]),
      ['aggregate', 'per_game']
    );

    expect(columns.aggregate.map(column => column.slug)).toEqual(['points']);
    expect(columns.per_game.map(column => column.slug)).toEqual([
      'points_per_game'
    ]);
  });
});

describe('rosterStatRows', () => {
  it('keeps a row for a player the stats endpoint never returned', () => {
    const rows = rosterStatRows(
      [player('p1', 'Ana', '7'), player('p2', 'Bia', '9')],
      [statsLog('p1', { points: '10' })]
    );

    expect(rows).toEqual([
      { playerId: 'p1', name: 'Ana', shirtNumber: '7', stats: { points: '10' } },
      { playerId: 'p2', name: 'Bia', shirtNumber: '9', stats: {} }
    ]);
  });

  it('ignores a stats log for a player outside the roster', () => {
    const rows = rosterStatRows(
      [player('p1', 'Ana')],
      [statsLog('p1', { points: '10' }), statsLog('p9', { points: '99' })]
    );

    expect(rows.map(row => row.playerId)).toEqual(['p1']);
  });
});

describe('formatStatValue', () => {
  it('renders a percentage without decimals', () => {
    expect(formatStatValue('free_throw_percentage', '66.6')).toBe('67%');
  });

  it('renders a per game average with one decimal', () => {
    expect(formatStatValue('points_per_game', '12.34')).toBe('12.3');
  });

  it('renders a total as a whole number', () => {
    expect(formatStatValue('points', '12')).toBe('12');
  });

  it('renders a missing value as a dash', () => {
    expect(formatStatValue('points', undefined)).toBe('-');
  });

  it('renders a value that is not a number as a dash', () => {
    expect(formatStatValue('points', 'n/a')).toBe('-');
  });

  it('renders an unrecorded value as a dash, not as a zero', () => {
    expect(formatStatValue('points', '')).toBe('-');
  });
});

describe('sortRosterRows', () => {
  const rows: RosterStatRow[] = [
    { playerId: 'p1', name: 'Ana', shirtNumber: '7', stats: { points: '10' } },
    { playerId: 'p2', name: 'Bia', shirtNumber: '9', stats: {} },
    { playerId: 'p3', name: 'Cris', shirtNumber: '3', stats: { points: '22' } }
  ];

  it('sorts by the column descending', () => {
    expect(
      sortRosterRows(rows, 'points', 'desc').map(row => row.playerId)
    ).toEqual(['p3', 'p1', 'p2']);
  });

  it('sorts by the column ascending', () => {
    expect(
      sortRosterRows(rows, 'points', 'asc').map(row => row.playerId)
    ).toEqual(['p1', 'p3', 'p2']);
  });

  it('ranks an unrecorded value as missing rather than as a zero', () => {
    const withEmpty: RosterStatRow[] = [
      { playerId: 'p1', name: 'Ana', shirtNumber: '7', stats: { points: '' } },
      { playerId: 'p2', name: 'Bia', shirtNumber: '9', stats: { points: '-3' } }
    ];

    expect(
      sortRosterRows(withEmpty, 'points', 'desc').map(row => row.playerId)
    ).toEqual(['p2', 'p1']);
  });

  it('keeps the roster order when no column is chosen', () => {
    expect(sortRosterRows(rows, null, 'desc')).toBe(rows);
  });
});

describe('statTotals', () => {
  const rows: RosterStatRow[] = [
    {
      playerId: 'p1',
      name: 'Ana',
      shirtNumber: '7',
      stats: { points: '10', free_throw_percentage: '50', points_per_game: '5' }
    },
    {
      playerId: 'p2',
      name: 'Bia',
      shirtNumber: '9',
      stats: { points: '22', free_throw_percentage: '80', points_per_game: '11' }
    }
  ];

  it('adds up a column of counts', () => {
    expect(statTotals(rows, ['points']).points).toBe('32');
  });

  it('leaves a percentage column out: it is not the sum of its cells', () => {
    expect(statTotals(rows, ['free_throw_percentage'])).toEqual({});
  });

  it('leaves a per game average out for the same reason', () => {
    expect(statTotals(rows, ['points_per_game'])).toEqual({});
  });

  it('leaves out a column no player has a number for', () => {
    expect(statTotals(rows, ['blocks'])).toEqual({});
  });

  it('leaves out a column every player left unrecorded', () => {
    const unrecorded: RosterStatRow[] = [
      { playerId: 'p1', name: 'Ana', shirtNumber: '7', stats: { points: '' } }
    ];

    expect(statTotals(unrecorded, ['points'])).toEqual({});
  });
});

describe('statColumnViews', () => {
  const abbreviations = { points: 'PTS' };

  it('heads a column with the abbreviation of its sport', () => {
    const [column] = statColumnViews(
      [playerStat('points', 'Pontos')],
      abbreviations
    );

    expect(column).toEqual({
      slug: 'points',
      label: 'PTS',
      description: 'Pontos'
    });
  });

  it('reads a per game column by the abbreviation of its total', () => {
    const [column] = statColumnViews(
      [playerStat('points_per_game', 'Pontos por jogo')],
      abbreviations
    );

    expect(column.label).toBe('PTS');
  });

  it('falls back to the title of a statistic with no abbreviation', () => {
    const [column] = statColumnViews(
      [playerStat('custom_stat', 'Estatística da casa')],
      abbreviations
    );

    expect(column.label).toBe('Estatística da casa');
  });
});

describe('columnViewsByScope', () => {
  it('resolves the headers of every scope', () => {
    const views = columnViewsByScope(
      {
        aggregate: [playerStat('points', 'Pontos')],
        per_game: [playerStat('points_per_game', 'Pontos por jogo')]
      },
      { points: 'PTS' }
    );

    expect(views.aggregate[0].label).toBe('PTS');
    expect(views.per_game[0].slug).toBe('points_per_game');
  });
});

describe('statTotalsByScope', () => {
  it('adds up each scope against its own columns', () => {
    const rows: RosterStatRow[] = [
      { playerId: 'p1', name: 'Ana', shirtNumber: '7', stats: { points: '10', points_per_game: '5' } },
      { playerId: 'p2', name: 'Bia', shirtNumber: '9', stats: { points: '22', points_per_game: '11' } }
    ];

    const totals = statTotalsByScope(rows, {
      aggregate: [{ slug: 'points', label: 'PTS', description: 'Pontos' }],
      per_game: [
        { slug: 'points_per_game', label: 'PTS', description: 'Pontos por jogo' }
      ]
    });

    expect(totals.aggregate).toEqual({ points: '32' });
    expect(totals.per_game).toEqual({});
  });
});
