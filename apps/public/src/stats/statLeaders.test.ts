import type { PlayerStatEntity, StatLeadersEntity } from '@gochamps/api-client';
import { leaderCards, leaderStatKeys, leaderStatsFor } from './statLeaders';

const stat = (
  slug: string,
  visibility: PlayerStatEntity['visibility'] = 'public'
): PlayerStatEntity => ({
  id: `id-${slug}`,
  title: `Title ${slug}`,
  slug,
  visibility
});

const leader = (playerId: string, value: number, teamId = 'team1') => ({
  playerId,
  teamId,
  value,
  playerName: `Player ${playerId}`,
  shirtNumber: '',
  photoUrl: ''
});

describe('leaderStatsFor', () => {
  it('lists the basketball 5x5 stats in card order, with the total and the per-game key', () => {
    const playerStats = [
      stat('rebounds'),
      stat('points_per_game'),
      stat('points'),
      stat('rebounds_per_game')
    ];

    expect(leaderStatsFor('basketball_5x5', playerStats)).toEqual([
      {
        slug: 'points',
        title: 'Title points',
        statKeys: { aggregate: 'points', per_game: 'points_per_game' }
      },
      {
        slug: 'rebounds',
        title: 'Title rebounds',
        statKeys: { aggregate: 'rebounds', per_game: 'rebounds_per_game' }
      }
    ]);
  });

  it('ranks a percentage by its total only, its per-game ranking being the same list', () => {
    const playerStats = [
      stat('field_goal_percentage'),
      stat('field_goal_percentage_per_game'),
      stat('three_point_field_goal_percentage')
    ];

    expect(leaderStatsFor('basketball_5x5', playerStats)).toEqual([
      {
        slug: 'field_goal_percentage',
        title: 'Title field_goal_percentage',
        statKeys: { aggregate: 'field_goal_percentage' }
      },
      {
        slug: 'three_point_field_goal_percentage',
        title: 'Title three_point_field_goal_percentage',
        statKeys: { aggregate: 'three_point_field_goal_percentage' }
      }
    ]);
  });

  it('orders the nine basketball 5x5 cards three folds of three', () => {
    const slugs = [
      'points',
      'rebounds',
      'assists',
      'plus_minus',
      'steals',
      'blocks',
      'efficiency',
      'field_goal_percentage',
      'three_point_field_goal_percentage'
    ];

    expect(
      leaderStatsFor('basketball_5x5', [...slugs].reverse().map(slug => stat(slug))).map(
        leaderStat => leaderStat.slug
      )
    ).toEqual(slugs);
  });

  it('titles a stat in the page language when there is a translation', () => {
    expect(
      leaderStatsFor('basketball_5x5', [stat('points')], { points: 'Pontos' })
    ).toEqual([{ slug: 'points', title: 'Pontos', statKeys: { aggregate: 'points' } }]);
  });

  it('offers only the per-game ranking of a stat whose total is private', () => {
    const playerStats = [stat('efficiency', 'private'), stat('efficiency_per_game')];

    expect(leaderStatsFor('basketball_5x5', playerStats)).toEqual([
      {
        slug: 'efficiency',
        title: 'Title efficiency',
        statKeys: { per_game: 'efficiency_per_game' }
      }
    ]);
  });

  it('titles a stat recorded only per game after its per-game stat', () => {
    expect(leaderStatsFor('basketball_5x5', [stat('assists_per_game')])).toEqual([
      {
        slug: 'assists',
        title: 'Title assists_per_game',
        statKeys: { per_game: 'assists_per_game' }
      }
    ]);
  });

  it('leaves out a stat with nothing public to rank', () => {
    expect(leaderStatsFor('basketball_5x5', [stat('plus_minus', 'private')])).toEqual([]);
  });

  it('highlights nothing for a sport without a list', () => {
    expect(leaderStatsFor('basketball_3x3', [stat('points')])).toEqual([]);
  });
});

describe('leaderStatKeys', () => {
  it('lists every ranked key, total before per game', () => {
    expect(
      leaderStatKeys([
        {
          slug: 'points',
          title: 'Pontos',
          statKeys: { per_game: 'points_per_game', aggregate: 'points' }
        },
        { slug: 'efficiency', title: 'Eficiência', statKeys: { per_game: 'efficiency_per_game' } }
      ])
    ).toEqual(['points', 'points_per_game', 'efficiency_per_game']);
  });
});

describe('leaderCards', () => {
  const stats = [
    {
      slug: 'points',
      title: 'Pontos',
      statKeys: { aggregate: 'points', per_game: 'points_per_game' }
    },
    { slug: 'efficiency', title: 'Eficiência', statKeys: { per_game: 'efficiency_per_game' } }
  ];
  const teams = [{ id: 'team1', name: 'Recreio da Juventude' }];

  it('keeps the stats order and the first leaders of each scope, with team and formatted value', () => {
    const groups: StatLeadersEntity[] = [
      {
        statKey: 'points_per_game',
        qualifier: { game_played: 2 },
        leaders: [leader('p1', 21.46)]
      },
      {
        statKey: 'points',
        qualifier: null,
        leaders: [leader('p1', 303), leader('p2', 199), leader('p3', 160), leader('p4', 99)]
      },
      {
        statKey: 'efficiency_per_game',
        qualifier: { game_played: 2 },
        leaders: [leader('p2', 12.04)]
      }
    ];

    expect(leaderCards(stats, groups, teams, 3)).toEqual([
      {
        slug: 'points',
        title: 'Pontos',
        scopes: [
          {
            scope: 'aggregate',
            statKey: 'points',
            leaders: [
              {
                playerId: 'p1',
                playerName: 'Player p1',
                photoUrl: '',
                teamName: 'Recreio da Juventude',
                value: '303'
              },
              expect.objectContaining({ playerId: 'p2', value: '199' }),
              expect.objectContaining({ playerId: 'p3', value: '160' })
            ]
          },
          {
            scope: 'per_game',
            statKey: 'points_per_game',
            leaders: [expect.objectContaining({ playerId: 'p1', value: '21.5' })]
          }
        ]
      },
      {
        slug: 'efficiency',
        title: 'Eficiência',
        scopes: [
          {
            scope: 'per_game',
            statKey: 'efficiency_per_game',
            leaders: [expect.objectContaining({ playerId: 'p2', value: '12.0' })]
          }
        ]
      }
    ]);
  });

  it('drops a scope with no leaders, and a stat with no scope left', () => {
    const groups: StatLeadersEntity[] = [
      { statKey: 'points', qualifier: null, leaders: [] },
      { statKey: 'points_per_game', qualifier: null, leaders: [leader('p1', 10)] }
    ];

    expect(leaderCards(stats, groups, teams, 3)).toEqual([
      {
        slug: 'points',
        title: 'Pontos',
        scopes: [expect.objectContaining({ scope: 'per_game' })]
      }
    ]);
  });

  it('leaves the team name blank for a team the tournament does not list', () => {
    const groups: StatLeadersEntity[] = [
      { statKey: 'points', qualifier: null, leaders: [leader('p1', 10, 'gone')] }
    ];

    expect(leaderCards(stats, groups, teams, 3)[0].scopes[0].leaders[0].teamName).toBe('');
  });
});
