'use client';

import { useEffect, useState, type ComponentType } from 'react';
import Link from 'next/link';
import {
  Avatar,
  RemoteImage,
  StatGlossaryList,
  StatGlossaryToggle,
  Surface
} from '@gochamps/ui';
import {
  type SortDirection,
  type SortState,
  type StatColumnView
} from '@/src/stats/rosterStats';
import { SortArrow } from '@/src/components/SortArrow';
import {
  PINNED_EDGE_SHADOW,
  SCROLL_GROUP,
  useScrolledX
} from '@/src/components/useScrolledX';
import {
  boxScoreCellValue,
  boxScoreRanking,
  didNotPlay,
  isStarter,
  nextBoxScoreSort,
  rankedLiveTeam,
  sortedBoxScoreTeam,
  type BoxScoreRow
} from '@/src/games/boxScore';
import {
  scoreboardTeamRows,
  scoreboardTeamTotals,
  type ScoreboardApiGameResponse
} from '@/src/games/liveScore';
import { subscribeScoreboard } from '@/src/games/liveGameStore';

interface TeamBoxScoreData {
  teamName: string;
  logoUrl: string;
  rows: BoxScoreRow[];
  totals: Record<string, string>;
}

interface BoxScoreLabels {
  player: string;
  totals: string;
  title: string;
  glossary: string;
  sortByStat: string;
  started: string;
  didNotPlay: string;
  home?: string;
  away?: string;
}

interface BoxScoreProps {
  gameId: string;
  scoreboardUrl: string;
  isLive: boolean;
  pollLive: boolean;
  sportSlug: string;
  columns: StatColumnView[];
  home: TeamBoxScoreData;
  away: TeamBoxScoreData;
  playerHrefBase: string;
  labels: BoxScoreLabels;
}

interface TeamBoxScoreState {
  rows: BoxScoreRow[];
  totals: Record<string, string>;
}

interface LiveBoxScoreState {
  home: TeamBoxScoreState;
  away: TeamBoxScoreState;
}

const mapResponseToLiveBoxScore = (
  response: ScoreboardApiGameResponse
): LiveBoxScoreState => ({
  home: {
    rows: scoreboardTeamRows(response.data.home_team),
    totals: scoreboardTeamTotals(response.data.home_team)
  },
  away: {
    rows: scoreboardTeamRows(response.data.away_team),
    totals: scoreboardTeamTotals(response.data.away_team)
  }
});

// Finished games never poll: their box score is already final in the page
// HTML. A game the tournament does not allow full live updates for renders
// once from the static logs and never opens a connection to the scoreboard.
// The poll is shared with the score card through the live game store, so a
// game showing both only opens one connection to the scoreboard.
const useLiveBoxScore = (
  gameId: string,
  scoreboardUrl: string,
  pollLive: boolean,
  initial: LiveBoxScoreState
): LiveBoxScoreState => {
  const [boxScore, setBoxScore] = useState(initial);

  useEffect(() => {
    if (!pollLive || !scoreboardUrl) return;

    return subscribeScoreboard(scoreboardUrl, gameId, response =>
      setBoxScore(mapResponseToLiveBoxScore(response))
    );
  }, [gameId, scoreboardUrl, pollLive]);

  return boxScore;
};

// Opaque, not translucent: the sticky first column freezes over the scrolling
// ones and anything see-through would show the numbers sliding under it.
const HEADER_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';
const TOTALS_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_60%,var(--color-surface))]';

// A phone keeps the pinned name narrow enough to read the next four
// statistics: 134px plus 16px of padding, the name cut short with an
// ellipsis, and the statistics' padding trimmed.
const NAME_CELL = `sticky left-0 z-10 whitespace-nowrap px-2 md:px-6 ${PINNED_EDGE_SHADOW}`;
const NAME_BOX = 'flex max-w-[134px] items-center gap-2 md:max-w-none';
const STAT_CELL = 'whitespace-nowrap px-1.5 text-right last:pr-6 md:px-4';
const ROW_HEIGHT = 'h-[43px] md:h-[49px]';
const BAND_LABEL = 'text-left text-xs font-bold uppercase tracking-[0.5px]';

interface TeamHeadingProps {
  teamName: string;
  logoUrl: string;
}

function TeamHeading({ teamName, logoUrl }: TeamHeadingProps) {
  return (
    <div className="flex items-center gap-2 p-4 md:px-6 md:pt-6">
      {logoUrl && (
        <RemoteImage
          src={logoUrl}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
      )}
      <h3 className="text-lg font-bold text-foreground">{teamName}</h3>
    </div>
  );
}

// A dot, not a column: whether a player started is a yes or no, and the
// name is where the eye already is. The word is the hover and the screen
// reader's.
function StarterMark({ label }: { label: string }) {
  return (
    <span
      title={label}
      className="h-2 w-2 shrink-0 rounded-full bg-primary-dark"
      data-testid="box-score-starter"
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

interface PlayerNameProps {
  playerId: string;
  name: string;
  href: string;
}

// A log without a player id — the scoreboard never assigns one to a bench
// placeholder — reads as plain text; only a real player id is worth a link.
function PlayerName({ playerId, name, href }: PlayerNameProps) {
  if (!playerId) return <>{name}</>;

  return (
    <Link href={href} title={name} className="hover:underline">
      {name}
    </Link>
  );
}

interface PlayerNameCellProps {
  row: BoxScoreRow;
  href: string;
  startedLabel: string;
}

function PlayerNameCell({ row, href, startedLabel }: PlayerNameCellProps) {
  return (
    <td className={`${NAME_CELL} bg-surface text-sm font-semibold text-foreground`}>
      <span className={NAME_BOX}>
        <Avatar
          name={row.name}
          logoUrl={row.photoUrl || ''}
          size={28}
          className="rounded-full text-[10px]"
        />
        <span className="min-w-0 truncate">
          <PlayerName playerId={row.playerId} name={row.name} href={href} />
        </span>
        {isStarter(row.stats) && <StarterMark label={startedLabel} />}
      </span>
    </td>
  );
}

interface BoxScoreTableRowProps {
  row: BoxScoreRow;
  columns: StatColumnView[];
  playerHrefBase: string;
  startedLabel: string;
  didNotPlayLabel: string;
}

// A player who never got in has no numbers to read: one cell across the
// statistics says so instead of a row of dashes.
function BoxScoreTableRow({
  row,
  columns,
  playerHrefBase,
  startedLabel,
  didNotPlayLabel
}: BoxScoreTableRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <PlayerNameCell
        row={row}
        href={`${playerHrefBase}${row.playerId}`}
        startedLabel={startedLabel}
      />
      {didNotPlay(row.stats) ? (
        <td colSpan={columns.length} className="px-3 text-xs text-muted md:px-4">
          {didNotPlayLabel}
        </td>
      ) : (
        columns.map(column => (
          <td
            key={column.slug}
            className={`${STAT_CELL} notranslate text-xs tabular-nums`}
          >
            {boxScoreCellValue(column, row.stats)}
          </td>
        ))
      )}
    </tr>
  );
}

interface TotalsRowProps {
  totals: Record<string, string>;
  columns: StatColumnView[];
  label: string;
}

function TotalsRow({ totals, columns, label }: TotalsRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} ${TOTALS_BAND} font-bold text-foreground`}>
      <td className={`${NAME_CELL} ${TOTALS_BAND} text-sm`}>{label}</td>
      {columns.map(column => (
        <td
          key={column.slug}
          className={`${STAT_CELL} notranslate text-xs tabular-nums`}
        >
          {boxScoreCellValue(column, totals)}
        </td>
      ))}
    </tr>
  );
}

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

const ariaSort = (
  sort: SortState | null,
  slug: string
): 'ascending' | 'descending' | 'none' =>
  sort?.slug === slug ? ARIA_SORT[sort.direction] : 'none';

const sortDirection = (
  sort: SortState | null,
  slug: string
): SortDirection | null => (sort?.slug === slug ? sort.direction : null);

interface StatHeaderProps {
  column: StatColumnView;
  sort: SortState | null;
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
        className="inline-flex cursor-pointer items-center gap-1 uppercase hover:underline"
      >
        {column.label}
        <SortArrow direction={sortDirection(sort, column.slug)} />
      </button>
    </th>
  );
}

interface BoxScoreTableProps {
  team: TeamBoxScoreData;
  columns: StatColumnView[];
  playerHrefBase: string;
  labels: BoxScoreLabels;
  sort: SortState | null;
  onSort: (slug: string) => void;
}

function BoxScoreTable({
  team,
  columns,
  playerHrefBase,
  labels,
  sort,
  onSort
}: BoxScoreTableProps) {
  const scrollBoxProps = useScrolledX();

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border border-border"
      data-testid="box-score-team"
    >
      <TeamHeading teamName={team.teamName} logoUrl={team.logoUrl} />

      {/* Narrow screens scroll the table instead of the page. */}
      <div className={`${SCROLL_GROUP} overflow-x-auto`} {...scrollBoxProps}>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th
                scope="col"
                className={`${NAME_CELL} ${HEADER_BAND} ${BAND_LABEL}`}
              >
                {labels.player}
              </th>
              {columns.map(column => (
                <StatHeader
                  key={column.slug}
                  column={column}
                  sort={sort}
                  sortLabel={labels.sortByStat}
                  onSort={onSort}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {team.rows.map((row, index) => (
              <BoxScoreTableRow
                // A placeholder without a player id falls back to its position:
                // two of them with the same (or empty) name would collide on a
                // name-only key and break React's row reconciliation.
                key={row.playerId || `${row.name}-${index}`}
                row={row}
                columns={columns}
                playerHrefBase={playerHrefBase}
                startedLabel={labels.started}
                didNotPlayLabel={labels.didNotPlay}
              />
            ))}
          </tbody>
          <tfoot>
            <TotalsRow totals={team.totals} columns={columns} label={labels.totals} />
          </tfoot>
        </table>
      </div>
    </div>
  );
}

interface ViewerProps {
  columns: StatColumnView[];
  home: TeamBoxScoreData;
  away: TeamBoxScoreData;
  playerHrefBase: string;
  labels: BoxScoreLabels;
  sort: SortState | null;
  onSort: (slug: string) => void;
}

// One sort for both sides: a click on either table's header reads the same
// column across the whole game.
function GenericBoxScoreViewer({
  columns,
  home,
  away,
  playerHrefBase,
  labels,
  sort,
  onSort
}: ViewerProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4 md:gap-6 md:px-6 md:pb-6">
      <BoxScoreTable
        team={home}
        columns={columns}
        playerHrefBase={playerHrefBase}
        labels={labels}
        sort={sort}
        onSort={onSort}
      />
      <BoxScoreTable
        team={away}
        columns={columns}
        playerHrefBase={playerHrefBase}
        labels={labels}
        sort={sort}
        onSort={onSort}
      />
    </div>
  );
}

// Every sport shares one table today — the columns already arrive sport
// ordered from the server — but a sport whose box score needs its own layout
// only has to add itself here, not touch the dispatch that picks it.
const BOX_SCORE_VIEWERS: Record<string, ComponentType<ViewerProps>> = {
  basketball_5x5: GenericBoxScoreViewer
};

const boxScoreViewerFor = (sportSlug: string): ComponentType<ViewerProps> =>
  BOX_SCORE_VIEWERS[sportSlug] || GenericBoxScoreViewer;

const STARTER_MARK = '●';

const hasStarter = (live: LiveBoxScoreState): boolean =>
  [...live.home.rows, ...live.away.rows].some(row => isStarter(row.stats));

// The starter dot is not a column, but it is read off the table like one, so
// the glossary explains it ahead of the columns — only once a starter shows.
const glossaryEntries = (
  columns: StatColumnView[],
  live: LiveBoxScoreState,
  startedLabel: string
): StatColumnView[] =>
  hasStarter(live)
    ? [{ slug: 'game_started', label: STARTER_MARK, description: startedLabel }, ...columns]
    : columns;

export function BoxScore({
  gameId,
  scoreboardUrl,
  isLive,
  pollLive,
  sportSlug,
  columns,
  home,
  away,
  playerHrefBase,
  labels
}: BoxScoreProps) {
  const live = useLiveBoxScore(gameId, scoreboardUrl, pollLive, {
    home: { rows: home.rows, totals: home.totals },
    away: { rows: away.rows, totals: away.totals }
  });
  const Viewer = boxScoreViewerFor(sportSlug);
  const ranking = boxScoreRanking(sportSlug);
  const glossary = glossaryEntries(columns, live, labels.started);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);
  // Null until a header is clicked: the box score opens in its default order.
  const [sort, setSort] = useState<SortState | null>(null);

  return (
    <Surface
      as="section"
      className="overflow-hidden"
      aria-live={isLive ? 'polite' : 'off'}
      data-testid="box-score"
    >
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {labels.title}
          </h2>

          {columns.length > 0 && (
            <StatGlossaryToggle
              label={labels.glossary}
              isOpen={isGlossaryOpen}
              onToggle={() => setGlossaryOpen(open => !open)}
              controls="box-score-glossary"
              size="sm"
            />
          )}
        </div>

        {columns.length > 0 && (
          <StatGlossaryList
            id="box-score-glossary"
            columns={glossary}
            isOpen={isGlossaryOpen}
          />
        )}
      </div>

      <Viewer
        columns={columns}
        home={sortedBoxScoreTeam(rankedLiveTeam(home, live.home, ranking), sort)}
        away={sortedBoxScoreTeam(rankedLiveTeam(away, live.away, ranking), sort)}
        playerHrefBase={playerHrefBase}
        labels={labels}
        sort={sort}
        onSort={slug => setSort(current => nextBoxScoreSort(current, slug))}
      />
    </Surface>
  );
}
