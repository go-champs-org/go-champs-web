// Same endpoint and cadence the CMS already polls
// (apps/cms/src/Games/MiniLiveGameCard.tsx).
export const LIVE_SCORE_POLLING_INTERVAL_MS = 10000;

const IN_PROGRESS = 'in_progress';

export interface LiveScore {
  homeScore: number;
  awayScore: number;
}

interface ScoreboardApiTeam {
  total_player_stats: Record<string, number>;
}

interface ScoreboardApiLiveState {
  state: string;
}

export interface ScoreboardApiGameResponse {
  data: {
    home_team: ScoreboardApiTeam;
    away_team: ScoreboardApiTeam;
    live_state?: ScoreboardApiLiveState;
  };
}

export const isLiveGame = (liveState: string): boolean =>
  liveState === IN_PROGRESS;

// The scoreboard knows a game ended before the API the page was rendered from
// does. A response without the field keeps polling on, so an older scoreboard
// release never freezes a running score.
export const scoreboardGameEnded = (
  response: ScoreboardApiGameResponse
): boolean => {
  const state = response.data.live_state?.state;

  return state !== undefined && !isLiveGame(state);
};

export const scoreboardGameUrl = (baseUrl: string, gameId: string): string =>
  `${baseUrl.replace(/\/$/, '')}/v1/games/${gameId}`;

const teamScore = (team: ScoreboardApiTeam): number =>
  team.total_player_stats?.points || 0;

export const mapScoreboardGameToLiveScore = (
  response: ScoreboardApiGameResponse
): LiveScore => ({
  homeScore: teamScore(response.data.home_team),
  awayScore: teamScore(response.data.away_team)
});
