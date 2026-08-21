'use client';

import { useEffect, useState } from 'react';
import {
  LIVE_SCORE_POLLING_INTERVAL_MS,
  mapScoreboardGameToLiveScore,
  scoreboardGameUrl,
  type LiveScore,
  type ScoreboardApiGameResponse
} from '../games/liveScore';

interface UseLiveScoreInput {
  gameId: string;
  scoreboardUrl: string;
  isLive: boolean;
  initialScore: LiveScore;
}

const fetchLiveScore = async (
  scoreboardUrl: string,
  gameId: string
): Promise<LiveScore | null> => {
  try {
    const response = await fetch(scoreboardGameUrl(scoreboardUrl, gameId));
    if (!response.ok) return null;

    return mapScoreboardGameToLiveScore(
      (await response.json()) as ScoreboardApiGameResponse
    );
  } catch {
    // A scoreboard that is down leaves the last known score on screen — it is
    // never a reason to break the game page.
    return null;
  }
};

/**
 * Keeps the score of a game in progress up to date by polling the scoreboard
 * app, which is the only source that knows the running total. Finished games
 * never poll: their score is already final in the page HTML.
 */
export const useLiveScore = ({
  gameId,
  scoreboardUrl,
  isLive,
  initialScore
}: UseLiveScoreInput): LiveScore => {
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    if (!isLive || !scoreboardUrl) return;

    const refresh = async () => {
      const liveScore = await fetchLiveScore(scoreboardUrl, gameId);
      if (liveScore) setScore(liveScore);
    };

    refresh();
    const interval = setInterval(refresh, LIVE_SCORE_POLLING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [gameId, scoreboardUrl, isLive]);

  return score;
};
