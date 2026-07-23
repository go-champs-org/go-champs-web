export const BASKETBALL_5X5_CAREER_STAT_SLUGS = [
  'points',
  'rebounds',
  'assists',
  'steals',
  'blocks',
  'turnovers'
];

export interface CareerStatEntry {
  slug: string;
  total: number;
}

export const selectBasketball5x5CareerStatEntries = (
  stats: Record<string, number>
): CareerStatEntry[] =>
  BASKETBALL_5X5_CAREER_STAT_SLUGS.filter(
    slug => stats[slug] !== undefined
  ).map(slug => ({ slug, total: stats[slug] }));
