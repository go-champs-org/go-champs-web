import type { AggregatedPlayerStatsLogEntity } from '@gochamps/api-client';
import { formatStatValue, type StatColumnView } from './rosterStats';

// The filter asks for one player's log inside one tournament, so the answer
// is a single entry or none — never the list the endpoint's shape suggests.
export const firstPlayerStats = (
  logs: AggregatedPlayerStatsLogEntity[]
): Record<string, string> | null => logs[0]?.stats || null;

export interface PlayerStatTile {
  slug: string;
  label: string;
  description: string;
  value: string;
}

// One tile per column of the active scope: the profile page reads as a grid
// of numbers, not a table with a single row for its one player.
export const playerStatTiles = (
  stats: Record<string, string>,
  columns: StatColumnView[]
): PlayerStatTile[] =>
  columns.map(column => ({
    slug: column.slug,
    label: column.label,
    description: column.description,
    value: formatStatValue(column.slug, stats[column.slug])
  }));

// A tournament whose catalogue has nothing visible in any scope leaves the
// island with no column to switch to; the page reads that as "no stats"
// rather than rendering a scope filter with an empty grid under it.
export const hasAnyColumns = (
  columnsByScope: Record<string, StatColumnView[]>
): boolean =>
  Object.values(columnsByScope).some(columns => columns.length > 0);
