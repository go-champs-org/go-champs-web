// The column order of the CMS table for the sport, minus the statistics the
// tournament keeps private
// (apps/cms/src/Sports/Basketball5x5/AggregatedPlayerStatsTableViewer.tsx).
// A dictionary keyed by sport slug: a sport that is not here falls back to the
// order the API sent, which is what keeps every other sport rendering.
//
// Only the aggregate slugs are listed: the per game column of a statistic is
// the same slug with a `_per_game` suffix, so one list orders both scopes.
const BASKETBALL_5X5_ORDER = [
  'points',
  'rebounds',
  'assists',
  'blocks',
  'steals',
  'turnovers',
  'free_throws_made',
  'free_throw_percentage',
  'field_goals_made',
  'field_goal_percentage',
  'three_point_field_goals_made',
  'three_point_field_goal_percentage',
  'rebounds_offensive',
  'rebounds_defensive'
];

const SPORT_STAT_ORDER: Record<string, string[]> = {
  basketball_5x5: BASKETBALL_5X5_ORDER
};

// The curated set the CMS player profile shows, and its order
// (apps/cms/src/Sports/Basketball5x5/AggregatedPlayerStatsViewer.tsx
// ABSOLUTE_STATS) — a subset of the full box score, minus game_played, which
// the table already carries as its games column. A sport that is not here has
// no curated set and falls back to every game-level statistic it publishes.
const BASKETBALL_5X5_PLAYER_PROFILE = [
  'points',
  'rebounds',
  'assists',
  'steals',
  'blocks',
  'free_throw_percentage',
  'field_goal_percentage',
  'three_point_field_goal_percentage'
];

const PLAYER_PROFILE_STAT_ORDER: Record<string, string[]> = {
  basketball_5x5: BASKETBALL_5X5_PLAYER_PROFILE
};

export const playerProfileStatOrder = (sportSlug: string): string[] =>
  PLAYER_PROFILE_STAT_ORDER[sportSlug] || [];

export const PER_GAME_SUFFIX = '_per_game';

// A per game slug orders where its total does, so the table keeps one shape
// across both scopes.
export const baseStatSlug = (slug: string): string =>
  slug.endsWith(PER_GAME_SUFFIX) ? slug.slice(0, -PER_GAME_SUFFIX.length) : slug;

export const sportStatOrder = (sportSlug: string): string[] =>
  SPORT_STAT_ORDER[sportSlug] || [];
