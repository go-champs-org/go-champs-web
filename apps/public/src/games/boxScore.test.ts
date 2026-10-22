import type { PlayerStatEntity, SportEntity } from '@gochamps/api-client';
import {
  boxScoreCellValue,
  boxScoreColumns,
  boxScoreColumnViews,
  boxScoreRanking,
  boxScoreRows,
  didNotPlay,
  isStarter,
  playerNamesById,
  playerPhotosById,
  rankedLiveTeam,
  type BoxScoreRow,
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
      { playerId: 'p2', name: 'Bia', stats: { points: '10' }, photoUrl: '' },
      { playerId: 'p1', name: 'Ana', stats: { points: '20' }, photoUrl: '' }
    ]);
  });

  it('carries the roster photo of each player', () => {
    const rows = boxScoreRows(
      [playerLog('p1', 'home', { points: '5' })],
      { p1: 'Ana' },
      { p1: 'https://cdn/p1.png' }
    );

    expect(rows[0].photoUrl).toBe('https://cdn/p1.png');
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

  it('shows a live game with full live updates before any log is saved', () => {
    expect(shouldShowBoxScore('in_progress', 'full-live-update', [], [])).toBe(true);
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
      'fouls_technical',
      'fouls_flagrant',
      'disqualifications'
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

describe('rankedLiveTeam', () => {
  const staticTeam = {
    teamName: 'Lions',
    logoUrl: 'lions.png',
    rows: [{ playerId: 'old', name: 'Old', stats: { points: '99' } }],
    totals: { points: '99' }
  };
  const live = {
    rows: [
      { playerId: 'p1', name: 'Ana', stats: { points: '4' } },
      { playerId: 'p2', name: 'Bia', stats: { points: '12' } },
      { playerId: 'p3', name: 'Cris', stats: { points: '8' } }
    ],
    totals: { points: '24' }
  };

  it('ranks the live rows by the column, best first', () => {
    expect(
      rankedLiveTeam(staticTeam, live, ['points']).rows.map(row => row.playerId)
    ).toEqual(['p2', 'p3', 'p1']);
  });

  it('takes rows and totals from the live data and keeps the team metadata', () => {
    const result = rankedLiveTeam(staticTeam, live, ['points']);

    expect(result.totals).toEqual({ points: '24' });
    expect(result.teamName).toBe('Lions');
    expect(result.logoUrl).toBe('lions.png');
  });

  it('keeps the live order when there is no column to rank by', () => {
    expect(
      rankedLiveTeam(staticTeam, live, []).rows.map(row => row.playerId)
    ).toEqual(['p1', 'p2', 'p3']);
  });

  it('does not reorder the input rows', () => {
    rankedLiveTeam(staticTeam, live, ['points']);

    expect(live.rows.map(row => row.playerId)).toEqual(['p1', 'p2', 'p3']);
  });

  it('puts the starters first, then the most minutes, then the most points', () => {
    const rows: BoxScoreRow[] = [
      { playerId: 'bench-long', name: 'A', stats: { game_started: '0', minutes_played: '900', points: '2' } },
      { playerId: 'starter-short', name: 'B', stats: { game_started: '1', minutes_played: '600', points: '20' } },
      { playerId: 'dnp', name: 'C', stats: { game_played: '0', game_started: '0' } },
      { playerId: 'starter-long', name: 'D', stats: { game_started: '1', minutes_played: '1200', points: '4' } },
      { playerId: 'bench-tie', name: 'E', stats: { game_started: '0', minutes_played: '900', points: '9' } }
    ];

    expect(
      rankedLiveTeam(staticTeam, { rows, totals: {} }, boxScoreRanking('basketball_5x5')).rows.map(
        row => row.playerId
      )
    ).toEqual(['starter-long', 'starter-short', 'bench-tie', 'bench-long', 'dnp']);
  });

  it('gives a live row the photo the page arrived with', () => {
    const team = {
      ...staticTeam,
      rows: [{ playerId: 'p2', name: 'Bia', stats: {}, photoUrl: 'bia.png' }]
    };

    const result = rankedLiveTeam(team, live, []);

    expect(result.rows.find(row => row.playerId === 'p2')?.photoUrl).toBe('bia.png');
    expect(result.rows.find(row => row.playerId === 'p1')?.photoUrl).toBe('');
  });
});

describe('boxScoreRanking', () => {
  it('ranks a sport with no ranking of its own by its default column', () => {
    expect(boxScoreRanking('basketball_3x3')).toEqual([]);
  });
});

describe('playerPhotosById', () => {
  it('maps each player to the photo, empty without one', () => {
    expect(
      playerPhotosById([
        { ...player('p1', 'Ana'), photoUrl: 'ana.png' },
        player('p2', 'Bia')
      ])
    ).toEqual({ p1: 'ana.png', p2: '' });
  });
});

describe('didNotPlay', () => {
  it('reads a game played of 0 as a player who never got in', () => {
    expect(didNotPlay({ game_played: '0' })).toBe(true);
  });

  it('reads a game played of 1 as a player who played', () => {
    expect(didNotPlay({ game_played: '1', points: '0' })).toBe(false);
  });

  it('reads a log without the stat as played', () => {
    expect(didNotPlay({ points: '4' })).toBe(false);
  });
});

describe('isStarter', () => {
  it('marks a player who started the game', () => {
    expect(isStarter({ game_started: '1' })).toBe(true);
  });

  it('leaves a bench player or a log without the stat unmarked', () => {
    expect(isStarter({ game_started: '0' })).toBe(false);
    expect(isStarter({})).toBe(false);
  });
});
