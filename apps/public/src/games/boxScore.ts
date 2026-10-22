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
import {
  baseStatSlug,
  defaultSortSlug,
  sportStatOrder
} from '@/src/stats/sportStatColumns';
import {
  formatSecondsAsClock,
  formatStatValue,
  sortRosterRows,
  statColumnViews,
  type SortState,
  type StatColumnView
} from '@/src/stats/rosterStats';
import { isLiveGame } from './liveScore';

export interface BoxScoreRow {
  playerId: string;
  name: string;
  stats: Record<string, string>;
  // The roster's photo; the avatar falls back to the initials without one.
  photoUrl?: string;
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

export const playerPhotosById = (
  players: PlayerEntity[]
): Record<string, string> =>
  Object.fromEntries(players.map(player => [player.id, player.photoUrl || '']));

// A log for a player the roster no longer carries a name for still gets a
// row — the box score reports what the game recorded, not who the roster
// happens to list today.
export const boxScoreRows = (
  logs: PlayerStatsLogEntity[],
  namesById: Record<string, string>,
  photosById: Record<string, string> = {}
): BoxScoreRow[] =>
  logs.map(log => ({
    playerId: log.playerId,
    name: namesById[log.playerId] || '',
    stats: log.stats,
    photoUrl: photosById[log.playerId] || ''
  }));

// The scoreboard counts a game for every athlete who stepped on the court. A
// log that says 0 is a player who was on the roster and never got in; a log
// without the stat at all (older games) is read as played.
export const didNotPlay = (stats: Record<string, string>): boolean =>
  Boolean(stats.game_played) && Number(stats.game_played) === 0;

export const isStarter = (stats: Record<string, string>): boolean =>
  Number(stats.game_started) > 0;

const FULL_LIVE_UPDATE: LiveSiteUpdate = 'full-live-update';

// A game in progress publishes its box score when the tournament opted into
// full live updates, even before any log is saved: the live logs only exist in
// the scoreboard, and the box score is what polls it to fill them in. A
// finished or upcoming game shows it whenever logs exist.
export const shouldShowBoxScore = (
  liveState: string,
  liveSiteUpdate: LiveSiteUpdate,
  homeLogs: unknown[],
  awayLogs: unknown[]
): boolean =>
  isLiveGame(liveState)
    ? liveSiteUpdate === FULL_LIVE_UPDATE
    : homeLogs.length > 0 || awayLogs.length > 0;

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
// Whether a player played or started is not a column: a starter is marked
// next to his name and a player who never got in reads "DNP" across the row.
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
  { slug: 'fouls_technical' },
  { slug: 'fouls_flagrant' },
  { slug: 'disqualifications' }
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
  basketballColumnLabels: Record<string, BoxScoreColumnLabel>,
  descriptions: Record<string, string> = {}
): StatColumnView[] =>
  sport?.slug === BASKETBALL_5X5_SLUG
    ? basketballBoxScoreColumns(basketballColumnLabels)
    : statColumnViews(
        boxScoreColumns(playerStats, sport),
        abbreviations,
        descriptions
      );

// Recorded in seconds; read as a clock, not a plain count.
const formatMinutesPlayed = (value: string | undefined): string => {
  const seconds = Number(value);
  if (!value || !Number.isFinite(seconds)) return '-';

  return formatSecondsAsClock(seconds);
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

interface LiveTeamRows {
  rows: BoxScoreRow[];
  totals: Record<string, string>;
}

// The starters first, then whoever played the most, then whoever scored the
// most — the way a basketball box score reads from top to bottom. Every key
// ranks best first; a sport not listed here ranks by its default column.
const BOX_SCORE_RANKING: Record<string, string[]> = {
  [BASKETBALL_5X5_SLUG]: ['game_started', 'minutes_played', 'points']
};

export const boxScoreRanking = (sportSlug: string): string[] => {
  const fallback = defaultSortSlug(sportSlug, 'aggregate');

  return BOX_SCORE_RANKING[sportSlug] || (fallback ? [fallback] : []);
};

// Sorting by the last key first and the first key last leaves the rows in the
// order of the first key, ties broken by the next ones: each sort is stable.
const rankRows = <Row extends BoxScoreRow>(rows: Row[], ranking: string[]): Row[] =>
  [...ranking].reverse().reduce(
    (ranked, slug) => sortRosterRows(ranked, slug, 'desc'),
    rows
  );

// The scoreboard does not know the roster's photos, so a live row takes the
// one the page arrived with for the same player.
const withPhotos = (
  rows: BoxScoreRow[],
  photoRows: BoxScoreRow[]
): BoxScoreRow[] => {
  const photos = new Map(photoRows.map(row => [row.playerId, row.photoUrl || '']));

  return rows.map(row => ({
    ...row,
    photoUrl: row.photoUrl || photos.get(row.playerId) || ''
  }));
};

export const rankedLiveTeam = <Team extends LiveTeamRows>(
  team: Team,
  live: LiveTeamRows,
  ranking: string[]
): Team => ({
  ...team,
  ...live,
  rows: rankRows(withPhotos(live.rows, team.rows), ranking)
});

// A header click ranks the column best first; the same column again turns it
// around. Every other header starts over from best first.
export const nextBoxScoreSort = (
  sort: SortState | null,
  slug: string
): SortState =>
  sort?.slug === slug
    ? { slug, direction: sort.direction === 'desc' ? 'asc' : 'desc' }
    : { slug, direction: 'desc' };

// A team is a handful of players, so a clicked column reorders the rows in
// the browser. Rows already in the default order keep it among ties, and a
// player without the number (one who never got in) stays at the bottom both
// ways.
export const sortedBoxScoreTeam = <Team extends LiveTeamRows>(
  team: Team,
  sort: SortState | null
): Team =>
  sort ? { ...team, rows: sortRosterRows(team.rows, sort.slug, sort.direction) } : team;
