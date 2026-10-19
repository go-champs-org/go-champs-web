import type { PlayerStatEntity } from '@gochamps/api-client';
import { minStatFilterSlugs } from './sportStatFilters';

const stat = (slug: string): PlayerStatEntity => ({
  id: `id-${slug}`,
  title: slug,
  slug,
  visibility: 'public'
});

describe('minStatFilterSlugs', () => {
  it('offers a games played minimum for basketball 5x5 and 3x3', () => {
    const playerStats = [stat('points'), stat('game_played')];

    expect(minStatFilterSlugs('basketball_5x5', playerStats)).toEqual(['game_played']);
    expect(minStatFilterSlugs('basketball_3x3', playerStats)).toEqual(['game_played']);
  });

  it('leaves out a stat the tournament does not record', () => {
    expect(minStatFilterSlugs('basketball_5x5', [stat('points')])).toEqual([]);
  });

  it('offers nothing for a sport without minimum filters', () => {
    expect(minStatFilterSlugs('volleyball', [stat('game_played')])).toEqual([]);
  });
});
