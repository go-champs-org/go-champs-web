import type { GameEntity } from '@gochamps/api-client';
import { GAME_TIME_ZONE, localeTag } from './gameDateTime';

export interface GameDay {
  // Sortable São Paulo calendar day ('2026-08-12'), empty for a game the API
  // has no datetime for. Also the stable React key of the group.
  key: string;
  label: string;
  games: GameEntity[];
}

// Read as parts, not as a formatted string: every locale pattern puts the year,
// month and day somewhere else, and the ICU build behind Intl is not the same
// on a developer machine and on CI. The part types are the same everywhere.
const DAY_PARTS_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: GAME_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const datePart = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
): string => parts.find(part => part.type === type)?.value || '';

// The CMS slices the raw UTC timestamp instead
// (apps/cms/src/Games/selectors.ts), which files a 22:30 game in São Paulo
// under the following day.
const dayKey = (datetime: string): string => {
  const parsed = new Date(datetime);

  if (Number.isNaN(parsed.getTime())) return '';

  const parts = DAY_PARTS_FORMAT.formatToParts(parsed);

  return `${datePart(parts, 'year')}-${datePart(parts, 'month')}-${datePart(parts, 'day')}`;
};

// Labelled from the kickoff of the day's first game, which is already a valid
// instant — the day key is a machine string and never has to be parsed back.
const dayLabel = (datetime: string, locale: string): string => {
  const parsed = new Date(datetime);

  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'long',
    timeZone: GAME_TIME_ZONE
  }).format(parsed);
};

const byDatetime = (gameA: GameEntity, gameB: GameEntity): number =>
  gameA.datetime.localeCompare(gameB.datetime);

const groupByDay = (games: GameEntity[]): Map<string, GameEntity[]> =>
  games.reduce((days, game) => {
    const key = dayKey(game.datetime);

    return days.set(key, [...(days.get(key) || []), game]);
  }, new Map<string, GameEntity[]>());

/**
 * The team's games grouped by the day they are played on, oldest day first and
 * each day in kickoff order.
 */
export const gamesByDate = (games: GameEntity[], locale: string): GameDay[] => {
  const days = groupByDay([...games].sort(byDatetime));

  return [...days.keys()].sort().map(key => {
    const dayGames = days.get(key) as GameEntity[];

    return {
      key,
      label: dayLabel(dayGames[0].datetime, locale),
      games: dayGames
    };
  });
};

/**
 * The index of the day closest to `now`: today if it has games, else the
 * nearest day still to come, else the most recent day already played.
 * `days` must already be sorted ascending by key (as `gamesByDate` returns).
 */
export const closestDayIndex = (days: GameDay[], now: Date): number => {
  if (days.length === 0) return 0;

  const todayKey = dayKey(now.toISOString());
  const todayIndex = days.findIndex(day => day.key === todayKey);

  if (todayIndex !== -1) return todayIndex;

  const futureIndex = days.findIndex(day => day.key > todayKey);

  return futureIndex !== -1 ? futureIndex : days.length - 1;
};
