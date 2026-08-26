// Same endpoint and cadence the CMS already polls
// (apps/cms/src/Games/MiniLiveGameCard.tsx).
export const LIVE_SCORE_POLLING_INTERVAL_MS = 10000;

const IN_PROGRESS = 'in_progress';

export interface LiveScore {
  homeScore: number;
  awayScore: number;
}

// A single player's numbers inside a scoreboard team, as the running game
// carries them — the same shape the CMS scoreboard client already reads
// (apps/cms/src/Shared/httpClient/scoreboardApiTypes.ts `ApiPlayer`).
export interface ScoreboardApiPlayer {
  id: string;
  name: string;
  number?: string | null;
  stats_values: Record<string, number>;
}

export interface ScoreboardApiTeam {
  total_player_stats: Record<string, number>;
  players: ScoreboardApiPlayer[];
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

// A row of the live box score, the same shape a static one is built in
// (src/games/boxScore.ts `BoxScoreRow`) — kept as its own type here so this
// module never has to import from that one.
export interface ScoreboardPlayerRow {
  playerId: string;
  name: string;
  stats: Record<string, string>;
}

// Every statistic the scoreboard reports arrives as a number; the box score
// reads every statistic as a string, live or static alike
// (mirrors apps/cms/src/Games/useGameStatsLogs.ts `stringifyStats`).
const stringifyStats = (
  stats: Record<string, number>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(stats).map(([slug, value]) => [slug, String(value)])
  );

// The per-player rows of a scoreboard team, mapped the way the CMS live box
// score already does (apps/cms/src/Games/useGameStatsLogs.ts
// `mapApiPlayerToStatsLogRenderEntity`).
export const scoreboardTeamRows = (
  team: ScoreboardApiTeam
): ScoreboardPlayerRow[] =>
  team.players.map(player => ({
    playerId: player.id,
    name: player.name,
    stats: stringifyStats(player.stats_values)
  }));

// The totals row under a live team's half of the box score.
export const scoreboardTeamTotals = (
  team: ScoreboardApiTeam
): Record<string, string> => stringifyStats(team.total_player_stats);
