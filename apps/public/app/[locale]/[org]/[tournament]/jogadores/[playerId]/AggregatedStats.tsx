'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdChromeReaderMode } from 'react-icons/md';
import {
  playerStatTiles,
  type PlayerStatTile
} from '@/src/stats/playerAggregatedStats';
import type { StatColumnView, StatScope } from '@/src/stats/rosterStats';

interface AggregatedStatsProps {
  stats: Record<string, string>;
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  scopeLegend: string;
  glossaryLabel: string;
}

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
      data-testid="player-stats-scope"
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
      aria-controls="player-stats-glossary"
      className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground"
    >
      <MdChromeReaderMode
        aria-hidden="true"
        className="h-5 w-5 text-primary-dark"
      />
      {label}
      {isOpen ? (
        <FaChevronUp aria-hidden="true" className="h-4 w-4" />
      ) : (
        <FaChevronDown aria-hidden="true" className="h-4 w-4" />
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
      id="player-stats-glossary"
      hidden={!isOpen}
      data-testid="player-stats-glossary"
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

function StatTile({ tile }: { tile: PlayerStatTile }) {
  return (
    <div
      title={tile.description}
      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-3 py-4 text-center"
    >
      <span className="notranslate text-2xl font-extrabold tabular-nums text-foreground">
        {tile.value}
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.5px] text-muted">
        {tile.label}
      </span>
    </div>
  );
}

const columnsFor = (
  columnsByScope: Record<string, StatColumnView[]>,
  scope: StatScope
): StatColumnView[] => columnsByScope[scope] || [];

export function AggregatedStats({
  stats,
  columnsByScope,
  scopes,
  scopeLabels,
  scopeLegend,
  glossaryLabel
}: AggregatedStatsProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  const columns = columnsFor(columnsByScope, scope);
  const tiles = playerStatTiles(stats, columns);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {scopes.length > 1 && (
          <ScopeFilter
            scopes={scopes}
            scopeLabels={scopeLabels}
            legend={scopeLegend}
            activeScope={scope}
            onSelect={setScope}
          />
        )}

        {columns.length > 0 && (
          <GlossaryToggle
            label={glossaryLabel}
            isOpen={isGlossaryOpen}
            onToggle={() => setGlossaryOpen(!isGlossaryOpen)}
          />
        )}
      </div>

      {columns.length > 0 && (
        <GlossaryList columns={columns} isOpen={isGlossaryOpen} />
      )}

      <div
        data-testid="player-stat-tiles"
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
      >
        {tiles.map(tile => (
          <StatTile key={tile.slug} tile={tile} />
        ))}
      </div>
    </div>
  );
}
