'use client';

import { useEffect, useState } from 'react';
import {
  mapScoreboardGameToLiveScore,
  type LiveScore
} from '../games/liveScore';
import { subscribeScoreboard } from '../games/liveGameStore';

interface UseLiveScoreInput {
  gameId: string;
  scoreboardUrl: string;
  isLive: boolean;
  initialScore: LiveScore;
}

// Finished games never poll: their score is already final in the page HTML.
// isLive comes from the server render and never changes for a viewer who keeps
// the page open, so the scoreboard itself is what ends a live game's polling.
// The poll is shared with the box score through the live game store, so a game
// showing both only opens one connection to the scoreboard.
export const useLiveScore = ({
  gameId,
  scoreboardUrl,
  isLive,
  initialScore
}: UseLiveScoreInput): LiveScore => {
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    if (!isLive || !scoreboardUrl) return;

    return subscribeScoreboard(scoreboardUrl, gameId, response =>
      setScore(mapScoreboardGameToLiveScore(response))
    );
  }, [gameId, scoreboardUrl, isLive]);

  return score;
};
