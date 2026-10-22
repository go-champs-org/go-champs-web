import type { PlayerStatEntity } from '@gochamps/api-client';

// The statistics the tournament stats page offers a "minimum" filter for, per
// sport. The API takes a minimum for any stat (`where[<slug>][gte]`); this list is
// only which of them a sport puts in front of the visitor. A sport that is
// not here gets no minimum filter.
const SPORT_MIN_STAT_FILTERS: Record<string, string[]> = {
  basketball_5x5: ['game_played'],
  basketball_3x3: ['game_played']
};

// Narrowed to the statistics the tournament actually records: a minimum on a
// stat it doesn't have would leave every player out.
export const minStatFilterSlugs = (
  sportSlug: string,
  playerStats: PlayerStatEntity[]
): string[] => {
  const recorded = new Set(playerStats.map(stat => stat.slug));

  return (SPORT_MIN_STAT_FILTERS[sportSlug] || []).filter(slug =>
    recorded.has(slug)
  );
};
