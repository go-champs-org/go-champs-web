'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ScopeFilter, StatGlossaryToggle, StatGlossaryList } from '@gochamps/ui';
import {
  formatStatValue,
  sortRosterRows,
  type RosterStatRow,
  type StatColumnView,
  type SortDirection,
  type StatScope
} from '@/src/stats/rosterStats';

interface RosterStatsTableProps {
  rows: RosterStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  totalsByScope: Record<string, Record<string, string>>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  title: string;
  scopeLegend: string;
  glossaryLabel: string;
  numberLabel: string;
  nameLabel: string;
  totalLabel: string;
  sortLabel: string;
  // Only the tournament-wide table needs a team column; the team page is
  // already on one team.
  //
  // Plain data, not callbacks: this component is a Client
  // Component, and a function passed from its Server Component caller can't
  // cross that boundary (Next throws "Functions cannot be passed directly to
  // Client Components" at request time — Jest never catches it, since a
  // component test renders in isolation and never actually crosses the RSC
  // boundary).
  hasTeamColumn?: boolean;
  teamColumnLabel?: string;
  playerHrefBase?: string;
}

interface SortState {
  slug: string | null;
  direction: SortDirection;
}

const NO_SORT: SortState = { slug: null, direction: 'desc' };

// A first click ranks the column, the best mark first. The same column again
// turns it around.
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

// Opaque mixes rather than translucent tints: the first two columns freeze
// over the scrolling ones, and anything see-through lets the numbers slide
// underneath them.
const HEADER_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';
const TOTALS_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_60%,var(--color-surface))]';

// The shirt number and the name stay put while the statistics scroll under
// them, the pair the CMS pins too. The width of the first cell is what the
// offset of the second is measured against, so the two move together.
const NUMBER_CELL = 'sticky left-0 z-20 w-12 pl-4 pr-2 md:w-16 md:pl-6';
const NAME_CELL =
  'sticky left-12 z-20 whitespace-nowrap pr-6 shadow-[8px_0_6px_-6px_var(--shadow-elevated)] md:left-16';
const TEAM_CELL = 'whitespace-nowrap px-3 text-left text-xs text-muted md:px-4';
const STAT_CELL = 'whitespace-nowrap px-3 text-right last:pr-6 md:px-4';
const ROW_HEIGHT = 'h-[43px] md:h-[49px]';
const BAND_LABEL = 'text-left text-xs font-bold uppercase tracking-[0.5px]';

const columnsFor = (
  columnsByScope: Record<string, StatColumnView[]>,
  scope: StatScope
): StatColumnView[] => columnsByScope[scope] || [];

interface StatsCardHeaderProps {
  title: string;
  columns: StatColumnView[];
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  scopeLegend: string;
  glossaryLabel: string;
  activeScope: StatScope;
  onSelectScope: (scope: StatScope) => void;
  isGlossaryOpen: boolean;
  onToggleGlossary: () => void;
}

function StatsCardHeader({
  title,
  columns,
  scopes,
  scopeLabels,
  scopeLegend,
  glossaryLabel,
  activeScope,
  onSelectScope,
  isGlossaryOpen,
  onToggleGlossary
}: StatsCardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          {title}
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {scopes.length > 1 && (
            <ScopeFilter
              scopes={scopes}
              scopeLabels={scopeLabels}
              legend={scopeLegend}
              activeScope={activeScope}
              onSelect={onSelectScope}
              testId="stats-scope"
            />
          )}

          {columns.length > 0 && (
            <StatGlossaryToggle
              label={glossaryLabel}
              isOpen={isGlossaryOpen}
              onToggle={onToggleGlossary}
              controls="stats-glossary"
            />
          )}
        </div>
      </div>

      {columns.length > 0 && (
        <StatGlossaryList id="stats-glossary" columns={columns} isOpen={isGlossaryOpen} />
      )}
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
      className={`${STAT_CELL} text-xs font-bold uppercase tracking-[0.5px]`}
    >
      <button
        type="button"
        onClick={() => onSort(column.slug)}
        title={column.description}
        aria-label={sortLabel.replace('{stat}', column.description)}
        className="cursor-pointer hover:underline"
      >
        {column.label}
      </button>
    </th>
  );
}

interface PlayerNameCellProps {
  row: RosterStatRow;
  playerHrefBase?: string;
}

// Links to the player's profile wherever a caller supplies the base path.
function PlayerNameCell({ row, playerHrefBase }: PlayerNameCellProps) {
  return (
    <td
      className={`${NAME_CELL} bg-surface text-sm font-semibold text-foreground`}
      data-testid="roster-player-name"
    >
      {playerHrefBase ? (
        <Link href={`${playerHrefBase}${row.playerId}`} className="hover:underline">
          {row.name}
        </Link>
      ) : (
        row.name
      )}
    </td>
  );
}

interface StatRowProps {
  row: RosterStatRow;
  columns: StatColumnView[];
  hasTeamColumn: boolean;
  playerHrefBase?: string;
}

function StatRow({ row, columns, hasTeamColumn, playerHrefBase }: StatRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <td
        className={`${NUMBER_CELL} bg-surface text-xs tabular-nums text-muted`}
      >
        {row.shirtNumber}
      </td>
      <PlayerNameCell row={row} playerHrefBase={playerHrefBase} />
      {hasTeamColumn && <td className={TEAM_CELL}>{row.teamName || ''}</td>}
      {columns.map(column => (
        <td
          key={column.slug}
          className={`${STAT_CELL} notranslate text-xs tabular-nums`}
        >
          {formatStatValue(column.slug, row.stats[column.slug])}
        </td>
      ))}
    </tr>
  );
}

interface TotalsRowProps {
  totals: Record<string, string>;
  columns: StatColumnView[];
  label: string;
  hasTeamColumn: boolean;
}

// Only counts add up, so a percentage and a per game average arrive missing
// from `totals` and read as a dash.
function TotalsRow({ totals, columns, label, hasTeamColumn }: TotalsRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} ${TOTALS_BAND} font-bold text-foreground`}>
      <td className={`${NUMBER_CELL} ${TOTALS_BAND}`} />
      <td className={`${NAME_CELL} ${TOTALS_BAND} text-sm`}>{label}</td>
      {hasTeamColumn && <td className={TEAM_CELL} />}
      {columns.map(column => (
        <td
          key={column.slug}
          className={`${STAT_CELL} notranslate text-xs tabular-nums`}
        >
          {totals[column.slug] || '-'}
        </td>
      ))}
    </tr>
  );
}

// The roster and its numbers are one table: the CMS team view has no plain
// list of names to keep them apart.
export function RosterStatsTable({
  rows,
  columnsByScope,
  totalsByScope,
  scopes,
  scopeLabels,
  title,
  scopeLegend,
  glossaryLabel,
  numberLabel,
  nameLabel,
  totalLabel,
  sortLabel,
  hasTeamColumn = false,
  teamColumnLabel,
  playerHrefBase
}: RosterStatsTableProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [sort, setSort] = useState<SortState>(NO_SORT);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  const columns = columnsFor(columnsByScope, scope);
  const sortedRows = sortRosterRows(rows, sort.slug, sort.direction);

  // The per game slugs are their own, so the column a scope was ranked by
  // does not exist in the other one.
  const selectScope = (next: StatScope) => {
    setScope(next);
    setSort(NO_SORT);
  };

  return (
    <div className="flex flex-col">
      <StatsCardHeader
        title={title}
        columns={columns}
        scopes={scopes}
        scopeLabels={scopeLabels}
        scopeLegend={scopeLegend}
        glossaryLabel={glossaryLabel}
        activeScope={scope}
        onSelectScope={selectScope}
        isGlossaryOpen={isGlossaryOpen}
        onToggleGlossary={() => setGlossaryOpen(!isGlossaryOpen)}
      />

      {/* Narrow screens scroll the table instead of the page. */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th
                scope="col"
                className={`${NUMBER_CELL} ${HEADER_BAND} ${BAND_LABEL}`}
              >
                {numberLabel}
              </th>
              <th
                scope="col"
                className={`${NAME_CELL} ${HEADER_BAND} ${BAND_LABEL}`}
              >
                {nameLabel}
              </th>
              {hasTeamColumn && (
                <th
                  scope="col"
                  className={`${HEADER_BAND} ${BAND_LABEL} px-3 md:px-4`}
                >
                  {teamColumnLabel}
                </th>
              )}
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
              <StatRow
                key={row.playerId}
                row={row}
                columns={columns}
                hasTeamColumn={hasTeamColumn}
                playerHrefBase={playerHrefBase}
              />
            ))}
          </tbody>
          <tfoot>
            <TotalsRow
              totals={totalsByScope[scope] || {}}
              columns={columns}
              label={totalLabel}
              hasTeamColumn={hasTeamColumn}
            />
          </tfoot>
        </table>
      </div>
    </div>
  );
}
