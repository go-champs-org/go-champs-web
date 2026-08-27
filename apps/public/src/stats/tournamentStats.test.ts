import { fixedStatsTableRows, tournamentStatRows } from './tournamentStats';

const team = (id: string, name: string) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
});

const player = (id: string, name: string, teamId: string, overrides = {}) => ({
  id,
  name,
  shirtName: '',
  shirtNumber: '',
  teamId,
  photoUrl: '',
  licenseNumber: '',
  ...overrides
});

const statsLog = (playerId: string, stats: Record<string, string>) => ({
  id: `log-${playerId}`,
  playerId,
  stats
});

const playerStat = (id: string, title: string, slug: string) => ({
  id,
  title,
  slug,
  visibility: 'public' as const
});

describe('tournamentStatRows', () => {
  it('joins a player who has a recorded stat with his team name', () => {
    const rows = tournamentStatRows(
      [player('p1', 'Camisa Um', 't1'), player('p2', 'Camisa Dois', 't2')],
      [statsLog('p1', { points: '10' })],
      [team('t1', 'Time A'), team('t2', 'Time B')]
    );

    expect(rows).toEqual([
      {
        playerId: 'p1',
        name: 'Camisa Um',
        shirtNumber: '',
        stats: { points: '10' },
        teamName: 'Time A'
      }
    ]);
  });

  it('excludes a player with no recorded stat', () => {
    const rows = tournamentStatRows(
      [player('p1', 'Camisa Um', 't1'), player('p2', 'Camisa Dois', 't2')],
      [statsLog('p1', { points: '10' })],
      [team('t1', 'Time A'), team('t2', 'Time B')]
    );

    expect(rows.map(row => row.playerId)).toEqual(['p1']);
  });

  it('leaves the team name blank when the player has no matching team', () => {
    const rows = tournamentStatRows(
      [player('p1', 'Camisa Um', 'unknown-team')],
      [statsLog('p1', { points: '10' })],
      [team('t1', 'Time A')]
    );

    expect(rows[0].teamName).toBe('');
  });
});

describe('fixedStatsTableRows', () => {
  it('resolves the table title from the tournament stat with matching id', () => {
    const rows = fixedStatsTableRows(
      [{ id: 'ft1', statId: 'stat1', playerStats: [] }],
      [playerStat('stat1', 'Pontos', 'points')],
      [],
      []
    );

    expect(rows[0].title).toBe('Pontos');
  });

  it('leaves the title blank when the tournament has no stat with that id', () => {
    const rows = fixedStatsTableRows(
      [{ id: 'ft1', statId: 'unknown-stat', playerStats: [] }],
      [playerStat('stat1', 'Pontos', 'points')],
      [],
      []
    );

    expect(rows[0].title).toBe('');
  });

  it('resolves each ranked entry to its player name and team, in API order', () => {
    const rows = fixedStatsTableRows(
      [
        {
          id: 'ft1',
          statId: 'stat1',
          playerStats: [
            { id: 'r1', playerId: 'p2', value: '22' },
            { id: 'r2', playerId: 'p1', value: '10' }
          ]
        }
      ],
      [playerStat('stat1', 'Pontos', 'points')],
      [player('p1', 'Camisa Um', 't1'), player('p2', 'Camisa Dois', 't2')],
      [team('t1', 'Time A'), team('t2', 'Time B')]
    );

    expect(rows[0].entries).toEqual([
      {
        id: 'r1',
        playerId: 'p2',
        playerName: 'Camisa Dois',
        teamName: 'Time B',
        value: '22'
      },
      {
        id: 'r2',
        playerId: 'p1',
        playerName: 'Camisa Um',
        teamName: 'Time A',
        value: '10'
      }
    ]);
  });

  it('leaves the player and team name blank when the roster has no such player', () => {
    const rows = fixedStatsTableRows(
      [
        {
          id: 'ft1',
          statId: 'stat1',
          playerStats: [{ id: 'r1', playerId: 'missing', value: '5' }]
        }
      ],
      [playerStat('stat1', 'Pontos', 'points')],
      [],
      []
    );

    expect(rows[0].entries).toEqual([
      { id: 'r1', playerId: 'missing', playerName: '', teamName: '', value: '5' }
    ]);
  });
});
