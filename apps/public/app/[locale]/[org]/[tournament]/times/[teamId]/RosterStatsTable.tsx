'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdChromeReaderMode } from 'react-icons/md';
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
  // The team page never leaves its own team, so it has no team column and no
  // link off the roster. The tournament-wide table (Task 12b) is the one
  // reader that needs both, so they arrive together and only there.
  teamNameOf?: (row: RosterStatRow) => string;
  teamColumnLabel?: string;
  playerHref?: (playerId: string) => string;
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

const SCOPE_CLASS =
  'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors';

const scopeClass = (isActive: boolean): string =>
  isActive
    ? `${SCOPE_CLASS} border-primary-dark bg-primary-dark text-neutral-100`
    : `${SCOPE_CLASS} border-border text-muted hover:bg-background`;

interface ScopeFilterProps {
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  legend: string;
  activeScope: StatScope;
  onSelect: (scope: StatScope) => void;
}

// A select in the CMS, a pair of pills here: two options never earn a dropdown.
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

interface GlossaryToggleProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

function GlossaryToggle({ label, isOpen, onToggle }: GlossaryToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="stats-glossary"
      className="flex cursor-pointer items-center gap-2 text-base font-semibold text-foreground"
    >
      <MdChromeReaderMode
        aria-hidden="true"
        className="h-6 w-6 text-primary-dark"
      />
      {label}
      {isOpen ? (
        <FaChevronUp aria-hidden="true" className="h-5 w-5" />
      ) : (
        <FaChevronDown aria-hidden="true" className="h-5 w-5" />
      )}
    </button>
  );
}

interface GlossaryListProps {
  columns: StatColumnView[];
  isOpen: boolean;
}

function GlossaryList({ columns, isOpen }: GlossaryListProps) {
  return (
    // Kept in the DOM while collapsed: what a column means is content a
    // crawler and a find-in-page should reach without a click.
    <ul
      id="stats-glossary"
      hidden={!isOpen}
      data-testid="stats-glossary"
      className="columns-1 list-disc gap-8 pl-5 text-xs font-bold leading-6 text-foreground sm:columns-2 lg:columns-4"
    >
      {columns.map(column => (
        <li key={column.slug} className="break-inside-avoid">
          {column.label} - {column.description}
        </li>
      ))}
    </ul>
  );
}

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
            />
          )}

          {columns.length > 0 && (
            <GlossaryToggle
              label={glossaryLabel}
              isOpen={isGlossaryOpen}
              onToggle={onToggleGlossary}
            />
          )}
        </div>
      </div>

      {columns.length > 0 && (
        <GlossaryList columns={columns} isOpen={isGlossaryOpen} />
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
  playerHref?: (playerId: string) => string;
}

// A plain name on the team page — its own roster has nowhere else to send the
// visitor — a link to the profile on the tournament-wide table, which leaves
// its own page to get there.
function PlayerNameCell({ row, playerHref }: PlayerNameCellProps) {
  return (
    <td
      className={`${NAME_CELL} bg-surface text-sm font-semibold text-foreground`}
      data-testid="roster-player-name"
    >
      {playerHref ? (
        <Link href={playerHref(row.playerId)} className="hover:underline">
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
  teamNameOf?: (row: RosterStatRow) => string;
  playerHref?: (playerId: string) => string;
}

function StatRow({ row, columns, teamNameOf, playerHref }: StatRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <td
        className={`${NUMBER_CELL} bg-surface text-xs tabular-nums text-muted`}
      >
        {row.shirtNumber}
      </td>
      <PlayerNameCell row={row} playerHref={playerHref} />
      {teamNameOf && <td className={TEAM_CELL}>{teamNameOf(row)}</td>}
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
  teamNameOf,
  teamColumnLabel,
  playerHref
}: RosterStatsTableProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [sort, setSort] = useState<SortState>(NO_SORT);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  const columns = columnsFor(columnsByScope, scope);
  const sortedRows = sortRosterRows(rows, sort.slug, sort.direction);
  const hasTeamColumn = Boolean(teamNameOf);

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
                teamNameOf={teamNameOf}
                playerHref={playerHref}
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
