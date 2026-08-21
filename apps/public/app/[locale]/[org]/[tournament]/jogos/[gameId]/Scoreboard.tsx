'use client';

import { useLiveScore } from '@/src/hooks/useLiveScore';

interface ScoreboardProps {
  gameId: string;
  scoreboardUrl: string;
  isLive: boolean;
  homeScore: number;
  awayScore: number;
  homeTeamName: string;
  awayTeamName: string;
}

export function Scoreboard({
  gameId,
  scoreboardUrl,
  isLive,
  homeScore,
  awayScore,
  homeTeamName,
  awayTeamName
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
      {/* The digits alone say nothing out loud: each side carries the team it
          belongs to so a live update is announced as a readable sentence. */}
      <span aria-label={`${homeTeamName}: ${score.homeScore}`} data-testid="home-score">
        {score.homeScore}
      </span>
      <span aria-hidden="true" className="text-xl text-muted md:text-2xl">
        x
      </span>
      <span aria-label={`${awayTeamName}: ${score.awayScore}`} data-testid="away-score">
        {score.awayScore}
      </span>
    </div>
  );
}
