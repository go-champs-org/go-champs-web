'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Surface } from '@gochamps/ui';
import type { PagerDay, PagerGame } from '@/src/games/pagerGames';
import { formatDayDate, formatGameTime } from '@/src/games/gameDateTime';
import { teamDisplayName } from '@/src/games/gameTeams';
import { gameWinner } from '@/src/games/teamRecord';
import { sideEmphasis, type SideEmphasis } from '@/src/games/sideEmphasis';

// The winner carries the row in full weight; the side it beat steps back into
// the muted tone. Same convention as the TeamView games tab.
const EMPHASIS_CLASS: Record<SideEmphasis, string> = {
  winner: 'font-bold text-primary-dark',
  loser: 'text-muted',
  neutral: 'text-foreground'
};

interface GameSideRowProps {
  name: string;
  score: number;
  emphasis: SideEmphasis;
  winnerLabel: string;
  teamHref: string;
}

// A side still to be decided (an unplayed bracket placeholder) carries no
// team id and therefore no page to link to.
function GameSideRow({
  name,
  score,
  emphasis,
  winnerLabel,
  teamHref
}: GameSideRowProps) {
  const nameClass = `truncate ${EMPHASIS_CLASS[emphasis]}`;

  return (
    <div className="flex items-center justify-between gap-2 py-0.5 text-sm">
      {teamHref ? (
        <Link
          href={teamHref}
          className={`relative z-10 ${nameClass} hover:underline`}
        >
          {name}
          {emphasis === 'winner' && <span className="sr-only"> {winnerLabel}</span>}
        </Link>
      ) : (
        <span className={nameClass}>
          {name}
          {emphasis === 'winner' && <span className="sr-only"> {winnerLabel}</span>}
        </span>
      )}
      <span className={`tabular-nums ${EMPHASIS_CLASS[emphasis]}`}>{score}</span>
    </div>
  );
}

interface GameCardProps {
  game: PagerGame;
  locale: string;
  undecidedLabel: string;
  winnerLabel: string;
  href: string;
  // Where a team name sends the visitor, minus the team id — a plain string
  // so this client component never has to receive a function prop from its
  // server caller (Next can't serialize a function across that boundary).
  teamHrefBase: string;
}

const teamHref = (teamHrefBase: string, teamId: string): string =>
  teamId ? `${teamHrefBase}${teamId}` : '';

function GameCard({
  game,
  locale,
  undecidedLabel,
  winnerLabel,
  href,
  teamHrefBase
}: GameCardProps) {
  const winner = gameWinner(game);
  const home = sideEmphasis(winner, 'home');
  const away = sideEmphasis(winner, 'away');
  const homeName = teamDisplayName(game.homeTeam, game.homePlaceholder, undecidedLabel);
  const awayName = teamDisplayName(game.awayTeam, game.awayPlaceholder, undecidedLabel);

  return (
    // Team names carry their own link to their team page; nesting an <a>
    // inside the card's own <a> would be invalid HTML, so the card's link is
    // an absolutely positioned overlay behind them instead (same pattern as
    // TournamentMiniCard's pinned-tournament link). It keeps its own
    // accessible name — an empty anchor would announce nothing — and stays a
    // normal tab stop; the team links above it (z-10) still win the click.
    <div className="relative border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-background">
      <Link
        href={href}
        aria-label={`${homeName} x ${awayName}`}
        data-testid="game-card-link"
        className="absolute inset-0"
      />
      <div className="pointer-events-none mb-1 flex items-center justify-between gap-2 text-xs text-muted">
        <span className="notranslate">{formatGameTime(game.datetime, locale)}</span>
        {game.location && <span className="truncate">{game.location}</span>}
      </div>
      <GameSideRow
        name={homeName}
        score={game.homeScore}
        emphasis={home}
        winnerLabel={winnerLabel}
        teamHref={teamHref(teamHrefBase, game.homeTeam.id)}
      />
      <GameSideRow
        name={awayName}
        score={game.awayScore}
        emphasis={away}
        winnerLabel={winnerLabel}
        teamHref={teamHref(teamHrefBase, game.awayTeam.id)}
      />
    </div>
  );
}

export interface GamesPagerProps {
  days: PagerDay[];
  initialIndex: number;
  locale: string;
  title: string;
  previousDayLabel: string;
  nextDayLabel: string;
  undecidedLabel: string;
  winnerLabel: string;
  // Where a card sends the visitor, minus the game id.
  gameHrefBase: string;
  teamHrefBase: string;
}

// The phase's games, one day at a time — matches the mockup's compact
// "Partidas" card with date paging instead of every day stacked at once.
export function GamesPager({
  days,
  initialIndex,
  locale,
  title,
  previousDayLabel,
  nextDayLabel,
  undecidedLabel,
  winnerLabel,
  gameHrefBase,
  teamHrefBase
}: GamesPagerProps) {
  const [index, setIndex] = useState(initialIndex);
  const day = days[index];

  return (
    <Surface className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            aria-label={previousDayLabel}
            disabled={index === 0}
            onClick={() => setIndex(current => current - 1)}
            className="rounded p-1 text-muted transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>
          <span className="notranslate tabular-nums text-foreground">
            {formatDayDate(day.key, locale)}
          </span>
          <button
            type="button"
            aria-label={nextDayLabel}
            disabled={index === days.length - 1}
            onClick={() => setIndex(current => current + 1)}
            className="rounded p-1 text-muted transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div>
        {day.games.map(gameItem => (
          <GameCard
            key={gameItem.id}
            game={gameItem}
            locale={locale}
            undecidedLabel={undecidedLabel}
            winnerLabel={winnerLabel}
            href={`${gameHrefBase}${gameItem.id}`}
            teamHrefBase={teamHrefBase}
          />
        ))}
      </div>
    </Surface>
  );
}
