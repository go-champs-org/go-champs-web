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
  'efficiency',
  'plus_minus',
  'free_throws_made',
  'free_throw_percentage',
  'field_goals_made',
  'field_goal_percentage',
  'three_point_field_goals_made',
  'three_point_field_goal_percentage',
  'rebounds_offensive',
  'rebounds_defensive'
];

const BASKETBALL_3X3_ORDER = [
  'points',
  'one_point_made',
  'one_point_attempted',
  'one_point_percentage',
  'two_point_made',
  'two_point_attempted',
  'two_point_percentage',
  'free_throw_made',
  'unsportsmanlike_fouls',
  'disqualifying_fouls'
];

const SPORT_STAT_ORDER: Record<string, string[]> = {
  basketball_5x5: BASKETBALL_5X5_ORDER,
  basketball_3x3: BASKETBALL_3X3_ORDER
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

const BASKETBALL_3X3_PLAYER_PROFILE = [
  'points',
  'one_point_made',
  'one_point_percentage',
  'two_point_made',
  'two_point_percentage',
  'free_throw_made'
];

const PLAYER_PROFILE_STAT_ORDER: Record<string, string[]> = {
  basketball_5x5: BASKETBALL_5X5_PLAYER_PROFILE,
  basketball_3x3: BASKETBALL_3X3_PLAYER_PROFILE
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

// The CMS opens every Basketball 5x5 stats table ranked by points, best first
// (apps/cms/src/Sports/Basketball5x5/GameBoxScoreViewer.tsx). Keyed by scope
// because the per game column is its own slug.
const DEFAULT_SORT_SLUGS: Record<string, Record<string, string>> = {
  basketball_5x5: { aggregate: 'points', per_game: `points${PER_GAME_SUFFIX}` }
};

export const defaultSortSlugs = (sportSlug: string): Record<string, string> =>
  DEFAULT_SORT_SLUGS[sportSlug] || {};

export const defaultSortSlug = (sportSlug: string, scope: string): string | null =>
  defaultSortSlugs(sportSlug)[scope] || null;
