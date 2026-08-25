import {
  playerStatThatIsVisible,
  type AggregatedPlayerStatsLogEntity,
  type PlayerEntity,
  type PlayerStatEntity,
  type SportEntity
} from '@gochamps/api-client';
import { baseStatSlug, PER_GAME_SUFFIX, sportStatOrder } from './sportStatColumns';

// Totals across the tournament, or the same statistics divided by games
// played. The sport says which of its statistics belongs to which scope
// (apps/cms/src/Sports/useStatistics.ts).
export type StatScope = 'aggregate' | 'per_game';

export const STAT_SCOPES: StatScope[] = ['aggregate', 'per_game'];

export interface RosterStatRow {
  playerId: string;
  name: string;
  shirtNumber: string;
  stats: Record<string, string>;
}

const slugsInScope = (sport: SportEntity, scope: StatScope): Set<string> =>
  new Set(
    sport.playerStatistics
      .filter(statistic => statistic.scope === scope)
      .map(statistic => statistic.slug)
  );

// A statistic the sport does not list sorts after every one it does, keeping
// the columns the order knows about first and the rest in the order the
// tournament configured them — Array#sort is stable.
const orderIndex = (order: string[], slug: string): number => {
  const index = order.indexOf(baseStatSlug(slug));
  return index === -1 ? order.length : index;
};

const bySportOrder =
  (order: string[]) =>
  (left: PlayerStatEntity, right: PlayerStatEntity): number =>
    orderIndex(order, left.slug) - orderIndex(order, right.slug);

// The columns of the table: the tournament's own statistics, minus the ones
// it keeps private, narrowed to one scope and read in the sport's order.
// A tournament whose sport could not be loaded still gets its visible
// statistics — one column each, in the order the API sent them.
export const statColumnsForScope = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null,
  scope: StatScope
): PlayerStatEntity[] => {
  const visible = playerStats.filter(playerStatThatIsVisible);

  if (!sport) return visible;

  const scoped = slugsInScope(sport, scope);

  return visible
    .filter(stat => scoped.has(stat.slug))
    .sort(bySportOrder(sportStatOrder(sport.slug)));
};

// Only a scope with columns of its own is worth offering: a tournament that
// publishes no per game statistic has nothing to switch to. Without the sport
// there is no scope to switch by either, and the single table is read as the
// totals it is.
export const availableScopes = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null
): StatScope[] => {
  if (!sport) return ['aggregate'];

  return STAT_SCOPES.filter(
    scope => statColumnsForScope(playerStats, sport, scope).length > 0
  );
};

// The table switches scopes in the browser, so every scope it offers has to
// arrive with its columns already resolved.
export const statColumnsByScope = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null,
  scopes: StatScope[]
): Record<string, PlayerStatEntity[]> =>
  Object.fromEntries(
    scopes.map(scope => [scope, statColumnsForScope(playerStats, sport, scope)])
  );

// The roster is what the table lists, not the stats endpoint: a player who
// has not played yet still belongs on his team's page, with a dash in every
// column.
export const rosterStatRows = (
  players: PlayerEntity[],
  statsLogs: AggregatedPlayerStatsLogEntity[]
): RosterStatRow[] => {
  const statsByPlayer = new Map(
    statsLogs.map(statsLog => [statsLog.playerId, statsLog.stats])
  );

  return players.map(player => ({
    playerId: player.id,
    name: player.name,
    shirtNumber: player.shirtNumber,
    stats: statsByPlayer.get(player.id) || {}
  }));
};

const PERCENTAGE_SUFFIX = '_percentage';

// A percentage is a whole number with a sign, an average carries one decimal,
// and everything else is a count — the same three cells the CMS renders
// (apps/cms/src/Shared/UI/TableCells.tsx).
const formatBySlug = (slug: string, value: number): string => {
  const base = baseStatSlug(slug);

  if (base.endsWith(PERCENTAGE_SUFFIX)) return `${value.toFixed(0)}%`;
  if (slug.endsWith(PER_GAME_SUFFIX)) return value.toFixed(1);
  return value.toFixed(0);
};

export const formatStatValue = (
  slug: string,
  value: string | undefined
): string => {
  const parsed = Number(value);

  // An empty string parses as 0, so the missing value has to be caught before
  // the number is trusted.
  if (!value || !Number.isFinite(parsed)) return '-';

  return formatBySlug(slug, parsed);
};

const MISSING = Number.NEGATIVE_INFINITY;

const statNumber = (row: RosterStatRow, slug: string): number => {
  const parsed = Number(row.stats[slug]);
  return Number.isFinite(parsed) ? parsed : MISSING;
};

const DIRECTION_SIGN: Record<SortDirection, number> = { asc: 1, desc: -1 };

export type SortDirection = 'asc' | 'desc';

// A player with no value for the column sorts to the bottom of both
// directions: he is on the roster, not in the ranking. That is a rank of its
// own, decided before the values are compared.
const missingRank = (value: number): number => (value === MISSING ? 1 : 0);

// Two missing values would subtract to NaN, which sorts nothing at all.
const compareValues = (left: number, right: number, sign: number): number =>
  left === MISSING ? 0 : sign * (left - right);

const byStat =
  (slug: string, direction: SortDirection) =>
  (left: RosterStatRow, right: RosterStatRow): number => {
    const leftValue = statNumber(left, slug);
    const rightValue = statNumber(right, slug);
    const rankDelta = missingRank(leftValue) - missingRank(rightValue);

    return (
      rankDelta ||
      compareValues(leftValue, rightValue, DIRECTION_SIGN[direction])
    );
  };

// No column chosen means the roster order the page arrived with — shirt
// number first, the way a printed roster reads.
export const sortRosterRows = (
  rows: RosterStatRow[],
  slug: string | null,
  direction: SortDirection
): RosterStatRow[] => (slug ? [...rows].sort(byStat(slug, direction)) : rows);
