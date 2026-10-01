import { PRIVATE_STAT_SLUGS } from '@gochamps/api-client';
import {
  playerProfileStatOrder,
  sportStatOrder
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
});
