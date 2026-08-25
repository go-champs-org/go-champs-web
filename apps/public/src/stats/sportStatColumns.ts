// The order a sport reads its own box score in. The API lists a tournament's
// statistics in whatever order they were configured, which is why the CMS
// hard-codes a column order per sport
// (apps/cms/src/Sports/Basketball5x5/AggregatedPlayerStatsTableViewer.tsx).
// A dictionary keyed by sport slug rather than a chain of ifs: a sport that is
// not here falls back to the tournament's own order, which is what keeps every
// other sport rendering.
//
// Only the aggregate slugs are listed: the per game column of a statistic is
// the same slug with a `_per_game` suffix, so one list orders both scopes.
const BASKETBALL_5X5_ORDER = [
  'points',
  'rebounds',
  'rebounds_offensive',
  'rebounds_defensive',
  'assists',
  'blocks',
  'steals',
  'turnovers',
  'free_throws_made',
  'free_throw_percentage',
  'field_goals_made',
  'field_goal_percentage',
  'three_point_field_goals_made',
  'three_point_field_goal_percentage'
];

const SPORT_STAT_ORDER: Record<string, string[]> = {
  basketball_5x5: BASKETBALL_5X5_ORDER
};

export const PER_GAME_SUFFIX = '_per_game';

// A per game slug orders where its total does, so the table keeps one shape
// across both scopes.
export const baseStatSlug = (slug: string): string =>
  slug.endsWith(PER_GAME_SUFFIX) ? slug.slice(0, -PER_GAME_SUFFIX.length) : slug;

export const sportStatOrder = (sportSlug: string): string[] =>
  SPORT_STAT_ORDER[sportSlug] || [];
