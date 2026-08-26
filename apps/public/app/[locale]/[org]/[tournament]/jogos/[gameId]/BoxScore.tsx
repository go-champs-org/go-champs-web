'use client';

import { useEffect, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { Surface } from '@gochamps/ui';
import {
  formatStatValue,
  type StatColumnView
} from '@/src/stats/rosterStats';
import type { BoxScoreRow } from '@/src/games/boxScore';
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

const NAME_CELL =
  'sticky left-0 z-10 whitespace-nowrap px-4 shadow-[8px_0_6px_-6px_var(--shadow-elevated)] md:px-6';
const STAT_CELL = 'whitespace-nowrap px-3 text-right last:pr-6 md:px-4';
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
        // Team logos live on arbitrary user-uploaded hosts: next/image would
        // need each one allow-listed in next.config.js.
        <img
          src={logoUrl}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
          className="h-7 w-7 rounded-full object-cover"
        />
      )}
      <h3 className="text-lg font-bold text-foreground">{teamName}</h3>
    </div>
  );
}

interface PlayerNameCellProps {
  playerId: string;
  name: string;
  href: string;
}

// A log without a player id — the scoreboard never assigns one to a bench
// placeholder — reads as plain text; only a real player id is worth a link.
function PlayerNameCell({ playerId, name, href }: PlayerNameCellProps) {
  const cellClass = `${NAME_CELL} bg-surface text-sm font-semibold text-foreground`;

  if (!playerId) return <td className={cellClass}>{name}</td>;

  return (
    <td className={cellClass}>
      <Link href={href} className="hover:underline">
        {name}
      </Link>
    </td>
  );
}

interface BoxScoreTableRowProps {
  row: BoxScoreRow;
  columns: StatColumnView[];
  playerHrefBase: string;
}

function BoxScoreTableRow({
  row,
  columns,
  playerHrefBase
}: BoxScoreTableRowProps) {
  return (
    <tr className={`${ROW_HEIGHT} border-b border-border/60`}>
      <PlayerNameCell
        playerId={row.playerId}
        name={row.name}
        href={`${playerHrefBase}${row.playerId}`}
      />
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
          {totals[column.slug] || '-'}
        </td>
      ))}
    </tr>
  );
}

interface BoxScoreTableProps {
  team: TeamBoxScoreData;
  columns: StatColumnView[];
  playerHrefBase: string;
  playerLabel: string;
  totalsLabel: string;
}

function BoxScoreTable({
  team,
  columns,
  playerHrefBase,
  playerLabel,
  totalsLabel
}: BoxScoreTableProps) {
  return (
    <div className="flex flex-col" data-testid="box-score-team">
      <TeamHeading teamName={team.teamName} logoUrl={team.logoUrl} />

      {/* Narrow screens scroll the table instead of the page. */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th
                scope="col"
                className={`${NAME_CELL} ${HEADER_BAND} ${BAND_LABEL}`}
              >
                {playerLabel}
              </th>
              {columns.map(column => (
                <th
                  key={column.slug}
                  scope="col"
                  title={column.description}
                  className={`${STAT_CELL} text-xs font-bold uppercase tracking-[0.5px]`}
                >
                  {column.label}
                </th>
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
              />
            ))}
          </tbody>
          <tfoot>
            <TotalsRow totals={team.totals} columns={columns} label={totalsLabel} />
          </tfoot>
        </table>
      </div>
    </div>
  );
}

interface BoxScoreGlossaryProps {
  columns: StatColumnView[];
  label: string;
}

function BoxScoreGlossary({ columns, label }: BoxScoreGlossaryProps) {
  return (
    <div className="flex flex-col gap-2 border-t border-border p-4 md:p-6">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <ul className="columns-1 list-disc gap-8 pl-5 text-xs font-bold leading-6 text-foreground sm:columns-2 lg:columns-3">
        {columns.map(column => (
          <li key={column.slug} className="break-inside-avoid">
            {column.label} - {column.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ViewerProps {
  columns: StatColumnView[];
  home: TeamBoxScoreData;
  away: TeamBoxScoreData;
  playerHrefBase: string;
  labels: BoxScoreLabels;
}

function GenericBoxScoreViewer({
  columns,
  home,
  away,
  playerHrefBase,
  labels
}: ViewerProps) {
  return (
    <div className="flex flex-col divide-y divide-border">
      <BoxScoreTable
        team={home}
        columns={columns}
        playerHrefBase={playerHrefBase}
        playerLabel={labels.player}
        totalsLabel={labels.totals}
      />
      <BoxScoreTable
        team={away}
        columns={columns}
        playerHrefBase={playerHrefBase}
        playerLabel={labels.player}
        totalsLabel={labels.totals}
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

  return (
    <Surface
      as="section"
      className="overflow-hidden"
      aria-live={isLive ? 'polite' : 'off'}
      data-testid="box-score"
    >
      <h2 className="p-4 text-xl font-bold text-foreground md:p-6 md:text-2xl">
        {labels.title}
      </h2>

      <Viewer
        columns={columns}
        home={{ ...home, ...live.home }}
        away={{ ...away, ...live.away }}
        playerHrefBase={playerHrefBase}
        labels={labels}
      />

      {columns.length > 0 && (
        <BoxScoreGlossary columns={columns} label={labels.glossary} />
      )}
    </Surface>
  );
}
