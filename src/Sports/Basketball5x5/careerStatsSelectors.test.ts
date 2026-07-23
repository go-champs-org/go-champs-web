import {
  BASKETBALL_5X5_CAREER_STAT_SLUGS,
  selectBasketball5x5CareerStatEntries
} from './careerStatsSelectors';

describe('BASKETBALL_5X5_CAREER_STAT_SLUGS', () => {
  it('is the fixed, ordered list of stat slugs', () => {
    expect(BASKETBALL_5X5_CAREER_STAT_SLUGS).toEqual([
      'points',
      'rebounds',
      'assists',
      'steals',
      'blocks',
      'turnovers'
    ]);
  });
});

describe('selectBasketball5x5CareerStatEntries', () => {
  it('returns entries in the fixed order, ignoring keys outside the list', () => {
    const stats = {
      turnovers: 12,
      points: 340,
      threePointers: 40,
      assists: 88,
      rebounds: 210,
      steals: 30,
      blocks: 15
    };

    expect(selectBasketball5x5CareerStatEntries(stats)).toEqual([
      { slug: 'points', total: 340 },
      { slug: 'rebounds', total: 210 },
      { slug: 'assists', total: 88 },
      { slug: 'steals', total: 30 },
      { slug: 'blocks', total: 15 },
      { slug: 'turnovers', total: 12 }
    ]);
  });

  it('skips a fixed slug missing from stats without throwing', () => {
    const stats = {
      points: 340,
      rebounds: 210,
      assists: 88,
      steals: 30,
      blocks: 15
      // turnovers absent
    };

    expect(selectBasketball5x5CareerStatEntries(stats)).toEqual([
      { slug: 'points', total: 340 },
      { slug: 'rebounds', total: 210 },
      { slug: 'assists', total: 88 },
      { slug: 'steals', total: 30 },
      { slug: 'blocks', total: 15 }
    ]);
  });

  it('returns an empty array when stats is empty', () => {
    expect(selectBasketball5x5CareerStatEntries({})).toEqual([]);
  });
});
