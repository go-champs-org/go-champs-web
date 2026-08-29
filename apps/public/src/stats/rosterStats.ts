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
  // Set only by the tournament-wide table (Task 12b) — the team roster table
  // never carries it, so its team column stays off.
  teamName?: string;
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

// A sport with a table of its own shows that table and nothing else, the way
// the CMS does: a statistic the tournament configured outside it is not a
// column the reader of this sport expects.
const inSportTable = (order: string[], stat: PlayerStatEntity): boolean =>
  order.length === 0 || order.includes(baseStatSlug(stat.slug));

// The columns of the table: the tournament's own statistics, minus the ones
// it keeps private, narrowed to one scope and to the table of the sport.
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
  const order = sportStatOrder(sport.slug);

  return visible
    .filter(stat => scoped.has(stat.slug) && inSportTable(order, stat))
    .sort(bySportOrder(order));
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

  const scopes = STAT_SCOPES.filter(
    scope => statColumnsForScope(playerStats, sport, scope).length > 0
  );

  // A tournament that publishes no statistic at all still has a scope: the
  // table is then the roster it always was, and the island has a scope to
  // hold rather than `undefined`.
  return scopes.length > 0 ? scopes : ['aggregate'];
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

// Every statistic arrives as a string and an unrecorded one arrives empty,
// which `Number` would read as a real zero: the whole table reads a cell
// through here so the dash, the totals and the ranking agree on what missing
// means.
const parseStat = (value: string | undefined): number | null => {
  const parsed = Number(value);

  return value && Number.isFinite(parsed) ? parsed : null;
};

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
  const parsed = parseStat(value);

  return parsed === null ? '-' : formatBySlug(slug, parsed);
};

// Only counts add up. A percentage of the whole team is not the sum of the
// column, and neither is a per game average — the design draws the band, the
// arithmetic decides which of its cells can be filled.
const isSummable = (slug: string): boolean =>
  !slug.endsWith(PER_GAME_SUFFIX) &&
  !baseStatSlug(slug).endsWith(PERCENTAGE_SUFFIX);

const statSum = (rows: RosterStatRow[], slug: string): number | null => {
  const values = rows
    .map(row => parseStat(row.stats[slug]))
    .filter((value): value is number => value !== null);

  // A column no player has a number for stays empty rather than reading zero,
  // which would look like a team that scored none of it.
  return values.length > 0 ? values.reduce((sum, value) => sum + value, 0) : null;
};

// The totals band of the table, keyed by slug. A column missing from the
// result is a column the band leaves blank.
export const statTotals = (
  rows: RosterStatRow[],
  slugs: string[]
): Record<string, string> =>
  Object.fromEntries(
    slugs
      .filter(isSummable)
      .map(slug => [slug, statSum(rows, slug)] as const)
      .filter(([, total]) => total !== null)
      .map(([slug, total]) => [slug, (total as number).toFixed(0)])
  );

const MISSING = Number.NEGATIVE_INFINITY;

const statNumber = (row: RosterStatRow, slug: string): number =>
  parseStat(row.stats[slug]) ?? MISSING;

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

export interface StatColumnView {
  slug: string;
  label: string;
  description: string;
  // Set only by the box score's basketball columns (src/games/boxScore.ts): a
  // made/attempted pair renders as one column, "10 / 15".
  attemptedSlug?: string;
}

// The header of a column is the abbreviation its sport is read in — PTS, REB —
// and the tournament's own title of the statistic is what the tooltip, the
// glossary and the screen reader get. A statistic with no abbreviation of its
// own is headed by that title instead.
export const statColumnViews = (
  columns: PlayerStatEntity[],
  abbreviations: Record<string, string>
): StatColumnView[] =>
  columns.map(column => ({
    slug: column.slug,
    label: abbreviations[baseStatSlug(column.slug)] || column.title,
    description: column.title
  }));

export const columnViewsByScope = (
  columnsByScope: Record<string, PlayerStatEntity[]>,
  abbreviations: Record<string, string>
): Record<string, StatColumnView[]> =>
  Object.fromEntries(
    Object.entries(columnsByScope).map(([scope, columns]) => [
      scope,
      statColumnViews(columns, abbreviations)
    ])
  );

// The totals of a column do not change with the sort or the scope the visitor
// picks, so they are resolved once on the server instead of on every render of
// the island.
export const statTotalsByScope = (
  rows: RosterStatRow[],
  columnsByScope: Record<string, StatColumnView[]>
): Record<string, Record<string, string>> =>
  Object.fromEntries(
    Object.entries(columnsByScope).map(([scope, columns]) => [
      scope,
      statTotals(
        rows,
        columns.map(column => column.slug)
      )
    ])
  );
