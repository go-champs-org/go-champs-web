'use client';

import { useState } from 'react';
import { ScopeFilter, StatGlossaryToggle, StatGlossaryList } from '@gochamps/ui';
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
              scopes={SCOPES}
              scopeLabels={scopeLabels}
              legend={scopeLegend}
              activeScope={scope}
              onSelect={setScope}
              testId="player-stats-scope"
            />
            <StatGlossaryToggle
              label={glossaryLabel}
              isOpen={isGlossaryOpen}
              onToggle={() => setGlossaryOpen(open => !open)}
              controls="player-stats-glossary"
              size="sm"
            />
          </div>
        </div>

        <StatGlossaryList
          id="player-stats-glossary"
          columns={columns}
          isOpen={isGlossaryOpen}
        />
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
