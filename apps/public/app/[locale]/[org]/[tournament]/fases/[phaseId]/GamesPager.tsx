'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { GameEntity } from '@gochamps/api-client';
import { Surface } from '@gochamps/ui';
import type { GameDay } from '@/src/games/gamesByDate';
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
}

function GameSideRow({ name, score, emphasis, winnerLabel }: GameSideRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 py-0.5 text-sm">
      <span className={`truncate ${EMPHASIS_CLASS[emphasis]}`}>
        {name}
        {emphasis === 'winner' && <span className="sr-only"> {winnerLabel}</span>}
      </span>
      <span className={`tabular-nums ${EMPHASIS_CLASS[emphasis]}`}>{score}</span>
    </div>
  );
}

interface GameCardProps {
  game: GameEntity;
  locale: string;
  undecidedLabel: string;
  winnerLabel: string;
}

function GameCard({ game, locale, undecidedLabel, winnerLabel }: GameCardProps) {
  const winner = gameWinner(game);
  const home = sideEmphasis(winner, 'home');
  const away = sideEmphasis(winner, 'away');

  return (
    <div className="border-b border-border px-4 py-3 last:border-0">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted">
        <span className="notranslate">{formatGameTime(game.datetime, locale)}</span>
        {game.location && <span className="truncate">{game.location}</span>}
      </div>
      <GameSideRow
        name={teamDisplayName(game.homeTeam, game.homePlaceholder, undecidedLabel)}
        score={game.homeScore}
        emphasis={home}
        winnerLabel={winnerLabel}
      />
      <GameSideRow
        name={teamDisplayName(game.awayTeam, game.awayPlaceholder, undecidedLabel)}
        score={game.awayScore}
        emphasis={away}
        winnerLabel={winnerLabel}
      />
    </div>
  );
}

export interface GamesPagerProps {
  days: GameDay[];
  initialIndex: number;
  locale: string;
  title: string;
  previousDayLabel: string;
  nextDayLabel: string;
  undecidedLabel: string;
  winnerLabel: string;
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
  winnerLabel
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
          />
        ))}
      </div>
    </Surface>
  );
}
