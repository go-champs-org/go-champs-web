'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  RemoteImage,
  ScopeFilter,
  StatGlossaryToggle,
  StatGlossaryList
} from '@gochamps/ui';
import {
  formatStatValue,
  initialSort,
  sortRosterRows,
  type SortState,
  type RosterStatRow,
  type StatColumnView,
  type SortDirection,
  type StatScope
} from '@/src/stats/rosterStats';
import { SortArrow } from '@/src/components/SortArrow';

interface RosterStatsTableProps {
  rows: RosterStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  // Set only by the team roster: a roster adds up to its team, while the
  // tournament stats page ranks players and has no totals band.
  totalsByScope?: Record<string, Record<string, string>>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  title: string;
  scopeLegend: string;
  glossaryLabel: string;
  numberLabel: string;
  nameLabel: string;
  totalLabel?: string;
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
  // The tournament-wide table ranks players, so its first column is the
  // position in the current ordering instead of the shirt number.
  showPosition?: boolean;
  teamColumnLabel?: string;
  playerHrefBase?: string;
  teamHrefBase?: string;
  // Set only by the tournament-wide table: a header click asks the API for
  // freshly sorted rows instead of reordering rows in memory.
  onSortRequest?: (slug: string) => Promise<RosterStatRow[]>;
  // The column each scope opens ranked by; a sport with none opens in the
  // order the rows arrived.
  defaultSortSlugs?: Record<string, string>;
  // Set with `onSortRequest`: a new key asks it again for the column already
  // ranked, e.g. once the tournament-wide table's filters change what it
  // returns. A plain string so it can tell a change from a re-render.
  refetchKey?: string;
  // Shown in place of the rows when there are none, e.g. a filter nobody meets.
  emptyLabel?: string;
  // Rendered under the card's title, for controls that narrow the rows.
  filters?: ReactNode;
  // A column asked for from outside the table — the "see all" link of a stat
  // highlight — opened in its scope and ranked best first. A slug no scope
  // has a column for is ignored.
  requestedSortSlug?: string;
}

const NO_DEFAULT_SORTS: Record<string, string> = {};

const rankedRows = (rows: RosterStatRow[], sort: SortState): RosterStatRow[] =>
  sortRosterRows(rows, sort.slug, sort.direction);

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

// The first column and the name stay put while the statistics scroll under
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

// The scope a column belongs to: per game slugs are their own, so at most one
// scope carries it.
const scopeWithColumn = (
  scopes: StatScope[],
  columnsByScope: Record<string, StatColumnView[]>,
  slug: string
): StatScope | undefined =>
  scopes.find(scope =>
    columnsFor(columnsByScope, scope).some(column => column.slug === slug)
  );

interface StatsCardHeaderProps {
  title: string;
  filters?: ReactNode;
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
  filters,
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

      {filters}

      {columns.length > 0 && (
        <StatGlossaryList id="stats-glossary" columns={columns} isOpen={isGlossaryOpen} />
      )}
    </div>
  );
}

const sortDirection = (
  sort: SortState | null,
  slug: string
): SortDirection | null => (sort?.slug === slug ? sort.direction : null);

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
        className="inline-flex cursor-pointer items-center gap-1 hover:underline"
      >
        {column.label}
        <SortArrow direction={sortDirection(sort, column.slug)} />
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

interface TeamNameCellProps {
  row: RosterStatRow;
  teamHrefBase?: string;
}

function TeamCrest({ logoUrl }: { logoUrl: string }) {
  return (
    <RemoteImage
      src={logoUrl}
      alt=""
      width={20}
      height={20}
      className="h-5 w-5 shrink-0 object-contain"
    />
  );
}

interface TeamLabelProps {
  label: string;
  teamName: string;
  href: string;
}

function TeamLabel({ label, teamName, href }: TeamLabelProps) {
  return href ? (
    <Link href={href} title={teamName} className="hover:underline">
      {label}
    </Link>
  ) : (
    <>{label}</>
  );
}

// A stat row can name a team the tournament's roster no longer carries —
// its id survives on the player but the name lookup comes up empty, so only
// a real team id AND name together are worth a link.
const teamHref = (
  teamHrefBase: string | undefined,
  teamId: string | undefined,
  teamName: string
): string => (teamHrefBase && teamId && teamName ? `${teamHrefBase}${teamId}` : '');

// The tri code leads and the full name only stands in for a team without one,
// next to the crest, the same way a game card names its sides.
function TeamNameCell({ row, teamHrefBase }: TeamNameCellProps) {
  const { teamName = '', teamShortName = '', teamLogoUrl = '', teamId } = row;

  return (
    <td className={TEAM_CELL}>
      <span className="flex items-center gap-2">
        {teamLogoUrl && <TeamCrest logoUrl={teamLogoUrl} />}
        <TeamLabel
          label={teamShortName || teamName}
          teamName={teamName}
          href={teamHref(teamHrefBase, teamId, teamName)}
        />
      </span>
    </td>
  );
}

interface StatRowProps {
  row: RosterStatRow;
  leadingCell: string;
  columns: StatColumnView[];
  hasTeamColumn: boolean;
  playerHrefBase?: string;
  teamHrefBase?: string;
}

function StatRow({
  row,
  leadingCell,
  columns,
  hasTeamColumn,
  playerHrefBase,
  teamHrefBase
}: StatRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <td
        className={`${NUMBER_CELL} bg-surface text-xs tabular-nums text-muted`}
      >
        {leadingCell}
      </td>
      <PlayerNameCell row={row} playerHrefBase={playerHrefBase} />
      {hasTeamColumn && (
        <TeamNameCell row={row} teamHrefBase={teamHrefBase} />
      )}
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

// Bars where the text goes, pulsing, while the rows wait on the API — the
// same placeholder the tournament grid waits for its cards with.
const SHIMMER_BAR = 'inline-block h-3 rounded bg-border';

// At least a handful of rows, and otherwise as many as the table already
// shows, so it keeps its height while it waits.
const MIN_SHIMMER_ROWS = 5;

interface ShimmerRowProps {
  columns: StatColumnView[];
  hasTeamColumn: boolean;
}

function ShimmerRow({ columns, hasTeamColumn }: ShimmerRowProps) {
  return (
    <tr
      className={`${ROW_HEIGHT} animate-pulse border-b border-border/60`}
      data-testid="stats-shimmer-row"
    >
      <td className={`${NUMBER_CELL} bg-surface`}>
        <span className={`${SHIMMER_BAR} w-4`} />
      </td>
      <td className={`${NAME_CELL} bg-surface`}>
        <span className={`${SHIMMER_BAR} w-28`} />
      </td>
      {hasTeamColumn && (
        <td className={TEAM_CELL}>
          <span className={`${SHIMMER_BAR} w-10`} />
        </td>
      )}
      {columns.map(column => (
        <td key={column.slug} className={STAT_CELL}>
          <span className={`${SHIMMER_BAR} w-6`} />
        </td>
      ))}
    </tr>
  );
}

interface ShimmerRowsProps extends ShimmerRowProps {
  rowCount: number;
}

function ShimmerRows({ rowCount, columns, hasTeamColumn }: ShimmerRowsProps) {
  return (
    <>
      {Array.from({ length: Math.max(rowCount, MIN_SHIMMER_ROWS) }, (_, index) => (
        <ShimmerRow key={index} columns={columns} hasTeamColumn={hasTeamColumn} />
      ))}
    </>
  );
}

interface EmptyRowProps {
  label?: string;
  isEmpty: boolean;
  columnCount: number;
}

function EmptyRow({ label, isEmpty, columnCount }: EmptyRowProps) {
  if (!(isEmpty && label)) return null;

  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <td colSpan={columnCount} className="px-4 text-sm text-muted md:px-6">
        {label}
      </td>
    </tr>
  );
}

interface StatRowsProps {
  rows: RosterStatRow[];
  showPosition: boolean;
  columns: StatColumnView[];
  hasTeamColumn: boolean;
  playerHrefBase?: string;
  teamHrefBase?: string;
  emptyLabel?: string;
  columnCount: number;
}

function StatRows({
  rows,
  showPosition,
  columns,
  hasTeamColumn,
  playerHrefBase,
  teamHrefBase,
  emptyLabel,
  columnCount
}: StatRowsProps) {
  return (
    <>
      <EmptyRow label={emptyLabel} isEmpty={rows.length === 0} columnCount={columnCount} />
      {rows.map((row, index) => (
        <StatRow
          key={row.playerId}
          row={row}
          leadingCell={showPosition ? String(index + 1) : row.shirtNumber}
          columns={columns}
          hasTeamColumn={hasTeamColumn}
          playerHrefBase={playerHrefBase}
          teamHrefBase={teamHrefBase}
        />
      ))}
    </>
  );
}

interface TotalsFooterProps {
  totals?: Record<string, string>;
  columns: StatColumnView[];
  label?: string;
  hasTeamColumn: boolean;
}

// A table without totals (the tournament stats page) has no band at all.
function TotalsFooter({ totals, columns, label = '', hasTeamColumn }: TotalsFooterProps) {
  if (!totals) return null;

  return (
    <tfoot>
      <TotalsRow totals={totals} columns={columns} label={label} hasTeamColumn={hasTeamColumn} />
    </tfoot>
  );
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

// Number and name, the team when there is one, then every statistic.
const tableColumnCount = (hasTeamColumn: boolean, columns: StatColumnView[]): number =>
  2 + Number(hasTeamColumn) + columns.length;

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
  showPosition = false,
  teamColumnLabel,
  playerHrefBase,
  teamHrefBase,
  onSortRequest,
  defaultSortSlugs = NO_DEFAULT_SORTS,
  refetchKey,
  emptyLabel,
  filters,
  requestedSortSlug
}: RosterStatsTableProps) {
  const [scope, setScope] = useState<StatScope>(scopes[0]);
  const [sort, setSort] = useState<SortState>(() =>
    initialSort(defaultSortSlugs, scopes[0])
  );
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);
  const [serverRows, setServerRows] = useState(() =>
    rankedRows(rows, initialSort(defaultSortSlugs, scopes[0]))
  );
  const [isSorting, setIsSorting] = useState(false);
  // Bumped on every scope switch (and every sort request) so a request that
  // resolves after the visitor has moved on can tell it's stale and skip
  // its own state update instead of overwriting a newer one.
  const requestId = useRef(0);
  const lastRefetchKey = useRef(refetchKey);
  // The key the table opened with: the rows it arrived with are only that
  // ranking's, so any other key has to ask the API for its rows instead.
  const initialRefetchKey = useRef(refetchKey);

  const columns = columnsFor(columnsByScope, scope);
  const sortedRows = onSortRequest
    ? serverRows
    : rankedRows(rows, sort);

  // A fresh `rows` prop (a different tournament, or a revalidated fetch)
  // replaces whatever this island was showing, sorted or not — including the
  // scope, which a new tournament may not offer the same choices for
  // (columnsFor would render no columns for a scope the new props dropped).
  useEffect(() => {
    requestId.current += 1;
    const start = initialSort(defaultSortSlugs, scopes[0]);
    setScope(scopes[0]);
    setServerRows(rankedRows(rows, start));
    setSort(start);
    setIsSorting(false);
  }, [rows]);

  // A scope switch (or another sort) may have started and finished while a
  // request was in flight — its result belongs to whatever was asked for
  // then, not to what's on screen now.
  const isStaleRequest = (thisRequestId: number): boolean =>
    requestId.current !== thisRequestId;

  const applyRefetchResult = (fetchedRows: RosterStatRow[] | null) => {
    if (fetchedRows) setServerRows(fetchedRows);
    setIsSorting(false);
  };

  // Same ranking, different rows: the sort stays put while the request is out,
  // and a failed one leaves the rows already on screen.
  const refetchRows = async (
    fetchSortedRows: (slug: string) => Promise<RosterStatRow[]>,
    slug: string | null
  ) => {
    const thisRequestId = ++requestId.current;
    setIsSorting(true);

    const fetchedRows = await fetchSortedRows(slug ?? '').catch(() => null);
    if (!isStaleRequest(thisRequestId)) applyRefetchResult(fetchedRows);
  };

  // The rows the page arrived with are unfiltered: once a filter narrowed the
  // table, another scope's rows have to come from the API with that filter, or
  // the switch would bring back every player.
  const loadScopeRows = (start: SortState) => {
    if (onSortRequest && refetchKey !== initialRefetchKey.current) {
      return refetchRows(onSortRequest, start.slug);
    }
    setServerRows(rankedRows(rows, start));
  };

  // The per game slugs are their own, so the column a scope was ranked by
  // does not exist in the other one.
  const selectScope = (next: StatScope) => {
    // Invalidates any sort still in flight for the old scope — its loading
    // state has to end here too, or a header click never spins down again.
    requestId.current += 1;
    const start = initialSort(defaultSortSlugs, next);
    setScope(next);
    setSort(start);
    setIsSorting(false);
    loadScopeRows(start);
  };

  // A failed request (`sortedRows` null) leaves the rows already on screen
  // alone, but the header it was requested for can't claim to be sorted —
  // that would announce a ranking that was never actually applied.
  const applySortResult = (
    sortedRows: RosterStatRow[] | null,
    previousSort: SortState
  ) => {
    if (sortedRows) {
      setServerRows(sortedRows);
    } else {
      setSort(previousSort);
    }
    setIsSorting(false);
  };

  // Server-sorted mode is best-first only, no ascending toggle.
  const requestSort = async (
    fetchSortedRows: (slug: string) => Promise<RosterStatRow[]>,
    slug: string
  ) => {
    const thisRequestId = ++requestId.current;
    const previousSort = sort;
    setSort({ slug, direction: 'desc' });
    setIsSorting(true);

    const sortedRows = await fetchSortedRows(slug).catch(() => null);
    if (!isStaleRequest(thisRequestId)) applySortResult(sortedRows, previousSort);
  };

  const onSort = (slug: string) =>
    onSortRequest && !isSorting ? requestSort(onSortRequest, slug) : undefined;

  const openSort = (slug: string) => {
    if (onSortRequest) return requestSort(onSortRequest, slug);
    requestId.current += 1;
    setSort({ slug, direction: 'desc' });
  };

  useEffect(() => {
    const slug = requestedSortSlug || '';
    const requestedScope = scopeWithColumn(scopes, columnsByScope, slug);
    if (!requestedScope) return;

    setScope(requestedScope);
    openSort(slug);
  }, [requestedSortSlug]);

  useEffect(() => {
    if (!onSortRequest || lastRefetchKey.current === refetchKey) return;

    lastRefetchKey.current = refetchKey;
    refetchRows(onSortRequest, sort.slug);
  }, [refetchKey]);

  const columnCount = tableColumnCount(hasTeamColumn, columns);

  return (
    <div className="flex flex-col">
      <StatsCardHeader
        title={title}
        filters={filters}
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
        <table className="w-full border-collapse text-left" aria-busy={isSorting}>
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
                  onSort={
                    onSortRequest ? onSort : slug => setSort(nextSort(sort, slug))
                  }
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {isSorting ? (
              <ShimmerRows
                rowCount={sortedRows.length}
                columns={columns}
                hasTeamColumn={hasTeamColumn}
              />
            ) : (
              <StatRows
                rows={sortedRows}
                showPosition={showPosition}
                columns={columns}
                hasTeamColumn={hasTeamColumn}
                playerHrefBase={playerHrefBase}
                teamHrefBase={teamHrefBase}
                emptyLabel={emptyLabel}
                columnCount={columnCount}
              />
            )}
          </tbody>
          <TotalsFooter
            totals={totalsByScope?.[scope]}
            columns={columns}
            label={totalLabel}
            hasTeamColumn={hasTeamColumn}
          />
        </table>
      </div>
    </div>
  );
}
