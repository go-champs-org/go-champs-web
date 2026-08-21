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

export interface ScoreboardApiGameResponse {
  data: {
    home_team: ScoreboardApiTeam;
    away_team: ScoreboardApiTeam;
  };
}

export const isLiveGame = (liveState: string): boolean =>
  liveState === IN_PROGRESS;

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
