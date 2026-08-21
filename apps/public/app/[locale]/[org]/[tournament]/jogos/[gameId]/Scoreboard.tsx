'use client';

import { useLiveScore } from '../../../../../../src/hooks/useLiveScore';

interface ScoreboardProps {
  gameId: string;
  scoreboardUrl: string;
  isLive: boolean;
  homeScore: number;
  awayScore: number;
}

export function Scoreboard({
  gameId,
  scoreboardUrl,
  isLive,
  homeScore,
  awayScore
}: ScoreboardProps) {
  const score = useLiveScore({
    gameId,
    scoreboardUrl,
    isLive,
    initialScore: { homeScore, awayScore }
  });

  return (
    <div
      aria-live={isLive ? 'polite' : 'off'}
      className="flex items-center justify-center gap-3 text-3xl font-bold text-foreground md:gap-4 md:text-5xl"
    >
      <span data-testid="home-score">{score.homeScore}</span>
      <span className="text-xl text-muted md:text-2xl">x</span>
      <span data-testid="away-score">{score.awayScore}</span>
    </div>
  );
}
