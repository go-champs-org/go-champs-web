'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdChromeReaderMode } from 'react-icons/md';
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
  // What the abbreviation stands for, for the glossary and the screen reader.
  description: string;
}

interface RosterStatsTableProps {
  rows: RosterStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  title: string;
  scopeLegend: string;
  glossaryLabel: string;
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
    ? `${SCOPE_CLASS} border-primary-dark bg-primary-dark text-neutral-100`
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

interface GlossaryToggleProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

// The abbreviations are only readable to someone who already knows the sport,
// so the design puts their meaning behind a toggle in the card header — closed
// until the visitor asks for it.
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
    // Kept in the DOM either way: what a column means is content a crawler and
    // a find-in-page should reach without a click.
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

// A scope with no columns of its own still renders its table: the roster is
// the point of the panel, the numbers are what it carries.
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

// What sits above the table: the name of the panel on one side, the controls
// on the other, and the glossary unfolding underneath both.
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
    <div className="flex flex-col gap-4 p-6">
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
      className="px-2 py-2 text-right font-bold last:pr-6"
    >
      <button
        type="button"
        onClick={() => onSort(column.slug)}
        title={column.description}
        aria-label={sortLabel.replace('{stat}', column.description)}
        className="cursor-pointer uppercase tracking-[0.5px] hover:underline"
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
    <tr className="border-b border-border/60 last:border-0">
      <td className="py-2.5 pl-6 pr-3 text-xs tabular-nums text-muted">
        {row.shirtNumber}
      </td>
      <td
        className="py-2.5 pr-3 text-sm font-semibold text-foreground"
        data-testid="roster-player-name"
      >
        {row.name}
      </td>
      {columns.map(column => (
        <td
          key={column.slug}
          className="notranslate px-2 py-2.5 text-right text-xs tabular-nums last:pr-6"
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
  title,
  scopeLegend,
  glossaryLabel,
  numberLabel,
  nameLabel,
  sortLabel
}: RosterStatsTableProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [sort, setSort] = useState<SortState>(NO_SORT);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  const columns = columnsFor(columnsByScope, scope);
  const sortedRows = sortRosterRows(rows, sort.slug, sort.direction);

  // The column a scope was ranked by does not exist in the other one: the per
  // game slugs are their own. Switching scopes drops back to roster order.
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
            <tr className="bg-primary/40 text-xs text-foreground">
              <th
                scope="col"
                className="w-12 py-2.5 pl-6 pr-3 font-bold uppercase tracking-[0.5px]"
              >
                {numberLabel}
              </th>
              <th
                scope="col"
                className="py-2.5 pr-3 font-bold uppercase tracking-[0.5px]"
              >
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
