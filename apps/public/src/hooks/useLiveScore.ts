'use client';

import { useEffect, useState } from 'react';
import {
  LIVE_SCORE_POLLING_INTERVAL_MS,
  mapScoreboardGameToLiveScore,
  scoreboardGameEnded,
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

interface LiveGame {
  score: LiveScore;
  ended: boolean;
}

type OnScore = (score: LiveScore) => void;

const fetchLiveGame = async (
  scoreboardUrl: string,
  gameId: string,
  signal: AbortSignal
): Promise<LiveGame | null> => {
  try {
    const response = await fetch(scoreboardGameUrl(scoreboardUrl, gameId), {
      signal
    });
    if (!response.ok) return null;

    const body = (await response.json()) as ScoreboardApiGameResponse;

    return {
      score: mapScoreboardGameToLiveScore(body),
      ended: scoreboardGameEnded(body)
    };
  } catch {
    // A scoreboard that is down leaves the last known score on screen — it is
    // never a reason to break the game page.
    return null;
  }
};

// Reports whether the polling should carry on: a scoreboard that answered
// nothing is worth asking again, one that reported the end is not.
const applyLiveGame = (liveGame: LiveGame | null, onScore: OnScore): boolean => {
  if (!liveGame) return true;

  onScore(liveGame.score);

  return !liveGame.ended;
};

// One request in flight at a time: with a plain interval a slow response can
// land after a newer one and drag the score backwards.
const pollLiveScore = (
  scoreboardUrl: string,
  gameId: string,
  onScore: OnScore
): (() => void) => {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let running = true;

  const step = async () => {
    const liveGame = await fetchLiveGame(
      scoreboardUrl,
      gameId,
      controller.signal
    );

    if (running && applyLiveGame(liveGame, onScore)) {
      timeout = setTimeout(step, LIVE_SCORE_POLLING_INTERVAL_MS);
    }
  };

  step();

  return () => {
    running = false;
    controller.abort();
    clearTimeout(timeout);
  };
};

// Finished games never poll: their score is already final in the page HTML.
// isLive comes from the server render and never changes for a viewer who keeps
// the page open, so the scoreboard itself is what ends a live game's polling.
export const useLiveScore = ({
  gameId,
  scoreboardUrl,
  isLive,
  initialScore
}: UseLiveScoreInput): LiveScore => {
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    if (!isLive || !scoreboardUrl) return;

    return pollLiveScore(scoreboardUrl, gameId, setScore);
  }, [gameId, scoreboardUrl, isLive]);

  return score;
};
