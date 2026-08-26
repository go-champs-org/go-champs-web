'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdChromeReaderMode } from 'react-icons/md';
import {
  phaseCellValue,
  type PhaseStatRow
} from '@/src/stats/playerPhaseStats';
import type { StatColumnView, StatScope } from '@/src/stats/rosterStats';

interface PlayerStatsTableProps {
  rows: PhaseStatRow[];
  total: PhaseStatRow;
  columns: StatColumnView[];
  scopeLabels: Record<string, string>;
  scopeLegend: string;
  title: string;
  glossaryLabel: string;
  phaseLabel: string;
  gamesLabel: string;
  totalLabel: string;
}

const SCOPES: StatScope[] = ['aggregate', 'per_game'];

const HEADER_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';
const TOTALS_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_60%,var(--color-surface))]';
// The phase name stays put while the statistics scroll under it — the pair the
// roster table pins too. It carries its own opaque band so nothing shows
// through as the numbers slide past.
const LABEL_CELL =
  'sticky left-0 z-10 whitespace-nowrap px-4 text-left shadow-[8px_0_6px_-6px_var(--shadow-elevated)] md:px-6';
const STAT_CELL = 'whitespace-nowrap px-3 text-right last:pr-6 md:px-4';
const ROW_HEIGHT = 'h-[43px] md:h-[49px]';
const BAND_LABEL = 'text-xs font-bold uppercase tracking-[0.5px]';

const SCOPE_CLASS =
  'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors';

const scopeClass = (isActive: boolean): string =>
  isActive
    ? `${SCOPE_CLASS} border-primary-dark bg-primary-dark text-neutral-100`
    : `${SCOPE_CLASS} border-border text-muted hover:bg-background`;

interface ScopeFilterProps {
  scopeLabels: Record<string, string>;
  legend: string;
  activeScope: StatScope;
  onSelect: (scope: StatScope) => void;
}

function ScopeFilter({
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
      {SCOPES.map(scope => (
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

interface GlossaryProps {
  columns: StatColumnView[];
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

function Glossary({ columns, label, isOpen, onToggle }: GlossaryProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="player-stats-glossary"
        className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground"
      >
        <MdChromeReaderMode aria-hidden="true" className="h-5 w-5 text-primary-dark" />
        {label}
        {isOpen ? (
          <FaChevronUp aria-hidden="true" className="h-4 w-4" />
        ) : (
          <FaChevronDown aria-hidden="true" className="h-4 w-4" />
        )}
      </button>

      {/* Kept in the DOM while collapsed so a crawler and find-in-page reach it. */}
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
    </div>
  );
}

interface StatsRowProps {
  row: PhaseStatRow;
  columns: StatColumnView[];
  scope: StatScope;
  isTotal?: boolean;
}

function StatsRow({ row, columns, scope, isTotal = false }: StatsRowProps) {
  const band = isTotal ? `${TOTALS_BAND} font-bold` : 'border-b border-border/60';
  const labelBand = isTotal ? TOTALS_BAND : 'bg-surface';

  return (
    <tr className={`${ROW_HEIGHT} ${band} text-foreground`}>
      <td className={`${LABEL_CELL} ${labelBand} text-sm font-semibold`}>
        {row.label}
      </td>
      <td className={`${STAT_CELL} notranslate text-xs tabular-nums`}>
        {row.games}
      </td>
      {columns.map(column => (
        <td
          key={column.slug}
          className={`${STAT_CELL} notranslate text-xs tabular-nums`}
        >
          {phaseCellValue(column.slug, row, scope)}
        </td>
      ))}
    </tr>
  );
}

export function PlayerStatsTable({
  rows,
  total,
  columns,
  scopeLabels,
  scopeLegend,
  title,
  glossaryLabel,
  phaseLabel,
  gamesLabel,
  totalLabel
}: PlayerStatsTableProps) {
  const [scope, setScope] = useState<StatScope>('aggregate');
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <ScopeFilter
              scopeLabels={scopeLabels}
              legend={scopeLegend}
              activeScope={scope}
              onSelect={setScope}
            />
            <Glossary
              columns={columns}
              label={glossaryLabel}
              isOpen={isGlossaryOpen}
              onToggle={() => setGlossaryOpen(!isGlossaryOpen)}
            />
          </div>
        </div>
      </div>

      {/* Narrow screens scroll the table instead of the page. */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th scope="col" className={`${LABEL_CELL} ${HEADER_BAND} ${BAND_LABEL}`}>
                {phaseLabel}
              </th>
              <th scope="col" className={`${STAT_CELL} ${BAND_LABEL}`}>
                {gamesLabel}
              </th>
              {columns.map(column => (
                <th
                  key={column.slug}
                  scope="col"
                  title={column.description}
                  className={`${STAT_CELL} ${BAND_LABEL}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <StatsRow
                key={row.phaseId}
                row={row}
                columns={columns}
                scope={scope}
              />
            ))}
          </tbody>
          <tfoot>
            <StatsRow
              row={{ ...total, label: totalLabel }}
              columns={columns}
              scope={scope}
              isTotal
            />
          </tfoot>
        </table>
      </div>
    </div>
  );
}
