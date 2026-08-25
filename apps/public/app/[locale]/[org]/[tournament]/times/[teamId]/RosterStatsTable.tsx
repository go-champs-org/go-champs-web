'use client';

import { useState } from 'react';
import {
  formatStatValue,
  sortRosterRows,
  type RosterStatRow,
  type SortDirection,
  type StatScope
} from '@/src/stats/rosterStats';

export interface StatColumnView {
  slug: string;
  // The abbreviation the column is headed with — 'PTS', 'REB'.
  label: string;
  // What the abbreviation stands for, for the tooltip and the screen reader.
  description: string;
}

interface RosterStatsTableProps {
  rows: RosterStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  scopeLegend: string;
  numberLabel: string;
  nameLabel: string;
  sortLabel: string;
}

interface SortState {
  slug: string | null;
  direction: SortDirection;
}

const NO_SORT: SortState = { slug: null, direction: 'desc' };

// A first click ranks the column, the best mark first — that is what a table
// of statistics is read for. Clicking the same column again turns it around.
const nextSort = (sort: SortState, slug: string): SortState =>
  sort.slug === slug
    ? { slug, direction: sort.direction === 'desc' ? 'asc' : 'desc' }
    : { slug, direction: 'desc' };

const ARIA_SORT: Record<SortDirection, 'ascending' | 'descending'> = {
  asc: 'ascending',
  desc: 'descending'
};

const ariaSort = (
  sort: SortState,
  slug: string
): 'ascending' | 'descending' | 'none' =>
  sort.slug === slug ? ARIA_SORT[sort.direction] : 'none';

const SCOPE_CLASS =
  'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors';

const scopeClass = (isActive: boolean): string =>
  isActive
    ? `${SCOPE_CLASS} border-primary bg-primary text-white`
    : `${SCOPE_CLASS} border-border text-muted hover:bg-background`;

interface ScopeFilterProps {
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  legend: string;
  activeScope: StatScope;
  onSelect: (scope: StatScope) => void;
}

// The scope filter of the CMS team view, which is a select there and a pair of
// pills here: two options never earn a dropdown.
function ScopeFilter({
  scopes,
  scopeLabels,
  legend,
  activeScope,
  onSelect
}: ScopeFilterProps) {
  return (
    <div
      role="group"
      aria-label={legend}
      className="flex flex-wrap gap-2"
      data-testid="stats-scope"
    >
      {scopes.map(scope => (
        <button
          key={scope}
          type="button"
          aria-pressed={scope === activeScope}
          onClick={() => onSelect(scope)}
          className={scopeClass(scope === activeScope)}
        >
          {scopeLabels[scope]}
        </button>
      ))}
    </div>
  );
}

interface StatHeaderProps {
  column: StatColumnView;
  sort: SortState;
  sortLabel: string;
  onSort: (slug: string) => void;
}

function StatHeader({ column, sort, sortLabel, onSort }: StatHeaderProps) {
  return (
    <th
      scope="col"
      aria-sort={ariaSort(sort, column.slug)}
      className="py-2 px-2 text-center font-medium"
    >
      <button
        type="button"
        onClick={() => onSort(column.slug)}
        title={column.description}
        aria-label={sortLabel.replace('{stat}', column.description)}
        className="cursor-pointer font-semibold uppercase tracking-wide hover:text-foreground"
      >
        {column.label}
      </button>
    </th>
  );
}

interface StatRowProps {
  row: RosterStatRow;
  columns: StatColumnView[];
}

function StatRow({ row, columns }: StatRowProps) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-2 pr-3 tabular-nums text-muted">{row.shirtNumber}</td>
      <td
        className="py-2 pr-3 font-medium text-foreground"
        data-testid="roster-player-name"
      >
        {row.name}
      </td>
      {columns.map(column => (
        <td
          key={column.slug}
          className="py-2 px-2 text-center tabular-nums notranslate"
        >
          {formatStatValue(column.slug, row.stats[column.slug])}
        </td>
      ))}
    </tr>
  );
}

// The roster and its numbers are one table: the CMS team view has no plain
// list of names to keep them apart, and repeating every player twice on the
// same panel is what splitting them would cost.
export function RosterStatsTable({
  rows,
  columnsByScope,
  scopes,
  scopeLabels,
  scopeLegend,
  numberLabel,
  nameLabel,
  sortLabel
}: RosterStatsTableProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [sort, setSort] = useState<SortState>(NO_SORT);

  const columns = columnsByScope[scope] || [];
  const sortedRows = sortRosterRows(rows, sort.slug, sort.direction);

  // The column a scope was ranked by does not exist in the other one: the per
  // game slugs are their own. Switching scopes drops back to roster order.
  const selectScope = (next: StatScope) => {
    setScope(next);
    setSort(NO_SORT);
  };

  return (
    <div className="flex flex-col gap-4">
      {scopes.length > 1 && (
        <ScopeFilter
          scopes={scopes}
          scopeLabels={scopeLabels}
          legend={scopeLegend}
          activeScope={scope}
          onSelect={selectScope}
        />
      )}

      {/* Narrow screens scroll the table instead of the page. */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th scope="col" className="w-12 py-2 pr-3 font-medium">
                {numberLabel}
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                {nameLabel}
              </th>
              {columns.map(column => (
                <StatHeader
                  key={column.slug}
                  column={column}
                  sort={sort}
                  sortLabel={sortLabel}
                  onSort={slug => setSort(nextSort(sort, slug))}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map(row => (
              <StatRow key={row.playerId} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
