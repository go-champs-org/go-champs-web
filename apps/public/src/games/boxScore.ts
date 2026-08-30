import {
  GAME_STATISTIC_LEVEL,
  playerStatisticsByLevel,
  playerStatThatIsVisible,
  type LiveSiteUpdate,
  type PlayerEntity,
  type PlayerStatEntity,
  type PlayerStatisticEntity,
  type PlayerStatsLogEntity,
  type SportEntity,
  type TeamStatsLogEntity
} from '@gochamps/api-client';
import { baseStatSlug, sportStatOrder } from '@/src/stats/sportStatColumns';
import { formatStatValue, statColumnViews, type StatColumnView } from '@/src/stats/rosterStats';
import { isLiveGame } from './liveScore';

export interface BoxScoreRow {
  playerId: string;
  name: string;
  stats: Record<string, string>;
}

export interface TeamLogsSplit {
  home: PlayerStatsLogEntity[];
  away: PlayerStatsLogEntity[];
}

export const splitLogsByTeam = (
  logs: PlayerStatsLogEntity[],
  homeTeamId: string,
  awayTeamId: string
): TeamLogsSplit => ({
  home: logs.filter(log => log.teamId === homeTeamId),
  away: logs.filter(log => log.teamId === awayTeamId)
});

// The totals row under a team's half of the box score. A team with no totals
// log yet — the game has not started scoring — reads as an empty row rather
// than breaking the table.
export const teamTotals = (
  teamLogs: TeamStatsLogEntity[],
  teamId: string
): Record<string, string> =>
  teamLogs.find(log => log.teamId === teamId)?.stats || {};

// Shirt name first, the given name as fallback.
export const playerNamesById = (
  players: PlayerEntity[]
): Record<string, string> =>
  Object.fromEntries(
    players.map(player => [player.id, player.shirtName || player.name || ''])
  );

// A log for a player the roster no longer carries a name for still gets a
// row — the box score reports what the game recorded, not who the roster
// happens to list today.
export const boxScoreRows = (
  logs: PlayerStatsLogEntity[],
  namesById: Record<string, string>
): BoxScoreRow[] =>
  logs.map(log => ({
    playerId: log.playerId,
    name: namesById[log.playerId] || '',
    stats: log.stats
  }));

const FULL_LIVE_UPDATE: LiveSiteUpdate = 'full-live-update';

// Mirrors the CMS gate (apps/cms/src/Pages/GameView.tsx `shouldShowBoxScore`):
// a game in progress only publishes its box score when the tournament opted
// into full live updates, and only once there is something to show. A
// finished or upcoming game shows it whenever logs exist.
export const shouldShowBoxScore = (
  liveState: string,
  liveSiteUpdate: LiveSiteUpdate,
  homeLogs: unknown[],
  awayLogs: unknown[]
): boolean => {
  const hasLogs = homeLogs.length > 0 || awayLogs.length > 0;

  return isLiveGame(liveState)
    ? liveSiteUpdate === FULL_LIVE_UPDATE && hasLogs
    : hasLogs;
};

// A statistic the sport does not order sorts after every one it does, the
// same stable sort the roster table uses (src/stats/rosterStats.ts).
const orderIndex = (order: string[], slug: string): number => {
  const index = order.indexOf(baseStatSlug(slug));
  return index === -1 ? order.length : index;
};

const bySportOrder =
  (order: string[]) =>
  (left: PlayerStatEntity, right: PlayerStatEntity): number =>
    orderIndex(order, left.slug) - orderIndex(order, right.slug);

// The sport's own game-level statistics narrow the tournament's columns to
// the ones its box score shows; a sport with none configured at the game
// level leaves every tournament statistic as a candidate column.
const gameLevelCandidates = (
  playerStats: PlayerStatEntity[],
  statistics: PlayerStatisticEntity[]
): PlayerStatEntity[] =>
  statistics.length > 0
    ? playerStats.filter(stat =>
        statistics.some(statistic => statistic.slug === stat.slug)
      )
    : playerStats;

// The columns of the box score: mirrors the CMS derivation in GameView.tsx.
// Without a sport there is no catalogue of game-level statistics or column
// order to apply, so every visible statistic the tournament configured is a
// column, in the order the API sent them.
export const boxScoreColumns = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null
): PlayerStatEntity[] => {
  if (!sport) return playerStats.filter(playerStatThatIsVisible);

  const statistics = playerStatisticsByLevel(sport, GAME_STATISTIC_LEVEL);
  const order = sportStatOrder(sport.slug);

  return gameLevelCandidates(playerStats, statistics)
    .filter(playerStatThatIsVisible)
    .sort(bySportOrder(order));
};

const BASKETBALL_5X5_SLUG = 'basketball_5x5';

interface BasketballBoxScoreColumn {
  slug: string;
  attemptedSlug?: string;
}

// Basketball's box score is a fixed set of columns, not derived from the
// tournament's statistic configuration — a stat the tournament turned off
// still shows here, since these are the fields a basketball scoresheet
// always carries.
const BASKETBALL_5X5_BOX_SCORE_COLUMNS: BasketballBoxScoreColumn[] = [
  { slug: 'minutes_played' },
  { slug: 'points' },
  { slug: 'rebounds' },
  { slug: 'assists' },
  { slug: 'blocks' },
  { slug: 'steals' },
  { slug: 'turnovers' },
  { slug: 'efficiency' },
  { slug: 'plus_minus' },
  { slug: 'free_throws_made', attemptedSlug: 'free_throws_attempted' },
  { slug: 'free_throw_percentage' },
  { slug: 'field_goals_made', attemptedSlug: 'field_goals_attempted' },
  { slug: 'field_goal_percentage' },
  {
    slug: 'three_point_field_goals_made',
    attemptedSlug: 'three_point_field_goals_attempted'
  },
  { slug: 'three_point_field_goal_percentage' },
  { slug: 'rebounds_offensive' },
  { slug: 'rebounds_defensive' },
  { slug: 'fouls_personal' },
  { slug: 'fouls_technical' }
];

export interface BoxScoreColumnLabel {
  label: string;
  description: string;
}

const basketballBoxScoreColumns = (
  labels: Record<string, BoxScoreColumnLabel>
): StatColumnView[] =>
  BASKETBALL_5X5_BOX_SCORE_COLUMNS.map(column => ({
    slug: column.slug,
    attemptedSlug: column.attemptedSlug,
    label: labels[column.slug]?.label || column.slug,
    description: labels[column.slug]?.description || column.slug
  }));

// Basketball uses its own fixed set above; every other sport falls back to
// the tournament's game-level config (`boxScoreColumns`).
export const boxScoreColumnViews = (
  playerStats: PlayerStatEntity[],
  sport: SportEntity | null,
  abbreviations: Record<string, string>,
  basketballColumnLabels: Record<string, BoxScoreColumnLabel>
): StatColumnView[] =>
  sport?.slug === BASKETBALL_5X5_SLUG
    ? basketballBoxScoreColumns(basketballColumnLabels)
    : statColumnViews(boxScoreColumns(playerStats, sport), abbreviations);

// Recorded in seconds; read as a clock, not a plain count.
const formatMinutesPlayed = (value: string | undefined): string => {
  const seconds = Number(value);
  if (!value || !Number.isFinite(seconds)) return '-';

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
};

const MINUTES_PLAYED_SLUG = 'minutes_played';

// A made/attempted column reads as one cell, "10 / 15".
export const boxScoreCellValue = (
  column: StatColumnView,
  stats: Record<string, string>
): string => {
  if (column.slug === MINUTES_PLAYED_SLUG) {
    return formatMinutesPlayed(stats[column.slug]);
  }

  const made = formatStatValue(column.slug, stats[column.slug]);
  if (!column.attemptedSlug) return made;

  const attempted = formatStatValue(column.attemptedSlug, stats[column.attemptedSlug]);
  return `${made} / ${attempted}`;
};
