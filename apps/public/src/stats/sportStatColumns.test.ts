import { PRIVATE_STAT_SLUGS } from '@gochamps/api-client';
import {
  defaultSortSlug,
  defaultSortSlugs,
  playerProfileStatOrder,
  sportStatOrder,
  tournamentStatsOrder
} from './sportStatColumns';

describe('basketball_3x3', () => {
  it('orders the points first and the shooting by the arc', () => {
    expect(sportStatOrder('basketball_3x3').slice(0, 7)).toEqual([
      'points',
      'one_point_made',
      'one_point_attempted',
      'one_point_percentage',
      'two_point_made',
      'two_point_attempted',
      'two_point_percentage'
    ]);
  });

  it('curates the player profile from the 3x3 slugs', () => {
    expect(playerProfileStatOrder('basketball_3x3')).toEqual([
      'points',
      'one_point_made',
      'one_point_percentage',
      'two_point_made',
      'two_point_percentage',
      'free_throw_made'
    ]);
  });

  it('lists no statistic the public site keeps private', () => {
    const listed = [
      ...sportStatOrder('basketball_3x3'),
      ...playerProfileStatOrder('basketball_3x3')
    ];

    expect(listed.filter(slug => PRIVATE_STAT_SLUGS.includes(slug))).toEqual([]);
  });

  it('shares no shooting slug with basketball_5x5', () => {
    expect(sportStatOrder('basketball_3x3')).not.toContain('field_goals_made');
  });

  it('opens basketball_5x5 ranked by points in both scopes', () => {
    expect(defaultSortSlugs('basketball_5x5')).toEqual({
      aggregate: 'points',
      per_game: 'points_per_game'
    });
  });

  it('leaves a sport with no default ranking in the order it arrived', () => {
    expect(defaultSortSlug('basketball_3x3', 'aggregate')).toBeNull();
  });
});

describe('tournamentStatsOrder', () => {
  it('opens the basketball_5x5 stats page with games and minutes', () => {
    expect(tournamentStatsOrder('basketball_5x5').slice(0, 4)).toEqual([
      'game_played',
      'game_started',
      'minutes_played',
      'points'
    ]);
  });

  it('puts each attempt right after its made shot', () => {
    const order = tournamentStatsOrder('basketball_5x5');

    expect(order.indexOf('field_goals_attempted')).toBe(
      order.indexOf('field_goals_made') + 1
    );
    expect(order.indexOf('free_throws_attempted')).toBe(
      order.indexOf('free_throws_made') + 1
    );
    expect(order.indexOf('three_point_field_goals_attempted')).toBe(
      order.indexOf('three_point_field_goals_made') + 1
    );
  });

  it('ends with the fouls and leaves out the misses and the disqualifications', () => {
    const order = tournamentStatsOrder('basketball_5x5');

    expect(order.slice(-3)).toEqual([
      'fouls_personal',
      'fouls_technical',
      'fouls_flagrant'
    ]);
    expect(order).not.toContain('field_goals_missed');
    expect(order).not.toContain('disqualifications');
  });

  it('keeps the team roster columns for a sport with no stats page order', () => {
    expect(tournamentStatsOrder('basketball_3x3')).toEqual(
      sportStatOrder('basketball_3x3')
    );
  });
});
