import {
  playerStatThatIsVisible,
  type PhaseEntity,
  type PlayerStatEntity,
  type PlayerStatsLogEntity,
  type SportEntity
} from '@gochamps/api-client';
import { boxScoreColumns } from '@/src/games/boxScore';
import type { StatScope } from './rosterStats';
import { playerProfileStatOrder } from './sportStatColumns';

// The columns the player profile shows: the curated set of the sport, in its
// order, narrowed to the statistics the tournament actually publishes. A sport
// with no curated set falls back to every game-level statistic it publishes,
// the same columns the box score shows.
export const playerProfileColumns = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null
): PlayerStatEntity[] => {
  const order = sport ? playerProfileStatOrder(sport.slug) : [];
  if (order.length === 0) return boxScoreColumns(playerStats, sport);

  const bySlug = new Map(
    playerStats.filter(playerStatThatIsVisible).map(stat => [stat.slug, stat])
  );

  return order
    .map(slug => bySlug.get(slug))
    .filter((stat): stat is PlayerStatEntity => stat !== undefined);
};

// One row of the player's per-phase stats table: a phase (or the total),
// how many games it covers, and the running sum and count of every stat in it.
// Counts are kept alongside the sums so a percentage can be averaged rather
// than added, since attempts are private and cannot be re-derived.
export interface PhaseStatRow {
  phaseId: string;
  label: string;
  games: number;
  sums: Record<string, number>;
  counts: Record<string, number>;
}

export interface PlayerPhaseTable {
  rows: PhaseStatRow[];
  total: PhaseStatRow;
}

const PERCENTAGE_SUFFIX = '_percentage';

const isPercentage = (slug: string): boolean =>
  slug.endsWith(PERCENTAGE_SUFFIX);

// An unrecorded stat arrives empty, which `Number` would read as a real zero;
// only a value that parses to a finite number counts toward the sum.
const parseNum = (value: string | undefined): number | null => {
  const parsed = Number(value);

  return value && Number.isFinite(parsed) ? parsed : null;
};

interface StatAcc {
  sums: Record<string, number>;
  counts: Record<string, number>;
}

const addStat = (target: StatAcc, slug: string, value: number): void => {
  target.sums[slug] = (target.sums[slug] || 0) + value;
  target.counts[slug] = (target.counts[slug] || 0) + 1;
};

const accumulate = (target: StatAcc, stats: Record<string, string>): void => {
  Object.entries(stats).forEach(([slug, value]) => {
    const parsed = parseNum(value);
    if (parsed !== null) addStat(target, slug, parsed);
  });
};

// The running totals of one set of game logs — a phase, or every phase for the
// total row. Games is the number of logs, one per game the player appeared in.
const aggregate = (
  phaseId: string,
  label: string,
  logs: PlayerStatsLogEntity[]
): PhaseStatRow => {
  const row: PhaseStatRow = { phaseId, label, games: logs.length, sums: {}, counts: {} };
  logs.forEach(log => accumulate(row, log.stats));

  return row;
};

const logsByPhase = (
  logs: PlayerStatsLogEntity[]
): Map<string, PlayerStatsLogEntity[]> =>
  logs.reduce((groups, log) => {
    const group = groups.get(log.phaseId) || [];
    return groups.set(log.phaseId, [...group, log]);
  }, new Map<string, PlayerStatsLogEntity[]>());

// The table: one row per phase that the player has a game in, in phase order,
// plus a total across all of them. A phase the player never played is left
// out rather than shown as an empty row.
export const playerPhaseTable = (
  logs: PlayerStatsLogEntity[],
  phases: PhaseEntity[]
): PlayerPhaseTable => {
  const grouped = logsByPhase(logs);

  const rows = [...phases]
    .sort((left, right) => left.order - right.order)
    .filter(phase => grouped.has(phase.id))
    .map(phase => aggregate(phase.id, phase.title, grouped.get(phase.id) || []));

  return { rows, total: aggregate('', '', logs) };
};

// A percentage is the average of the games it was recorded in; every other
// stat is a running count, shown whole as a total or divided by games played.
const percentageCell = (sum: number, count: number): string =>
  count > 0 ? `${(sum / count).toFixed(0)}%` : '-';

const countCell = (sum: number, games: number, scope: StatScope): string => {
  if (scope !== 'per_game') return sum.toFixed(0);

  return games > 0 ? (sum / games).toFixed(1) : '-';
};

// The formatted value of one column for one row, in the chosen scope. A column
// the row has no number for reads as a dash rather than a zero.
export const phaseCellValue = (
  slug: string,
  row: PhaseStatRow,
  scope: StatScope
): string => {
  const sum = row.sums[slug];
  if (sum === undefined) return '-';

  return isPercentage(slug)
    ? percentageCell(sum, row.counts[slug])
    : countCell(sum, row.games, scope);
};
