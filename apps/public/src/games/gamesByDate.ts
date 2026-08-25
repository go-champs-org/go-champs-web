import type { GameEntity } from '@gochamps/api-client';
import { GAME_TIME_ZONE, localeTag } from './gameDateTime';

export interface GameDay {
  // Sortable São Paulo calendar day ('2026-08-12'), empty for a game the API
  // has no datetime for. Also the stable React key of the group.
  key: string;
  label: string;
  games: GameEntity[];
}

// en-CA renders a plain YYYY-MM-DD, which sorts as a string and doubles as the
// day key. The CMS slices the raw UTC timestamp instead
// (apps/cms/src/Games/selectors.ts), which files a 22:30 game in São Paulo
// under the following day.
const DAY_KEY_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: GAME_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const dayKey = (datetime: string): string => {
  const parsed = new Date(datetime);

  if (Number.isNaN(parsed.getTime())) return '';

  return DAY_KEY_FORMAT.format(parsed);
};

const dayLabel = (key: string, locale: string): string => {
  if (!key) return '';

  // The key is a calendar day with no time of its own: reading it back at
  // midday UTC keeps the São Paulo offset from rolling it to the day before.
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'long',
    timeZone: GAME_TIME_ZONE
  }).format(new Date(`${key}T12:00:00Z`));
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

  return [...days.keys()].sort().map(key => ({
    key,
    label: dayLabel(key, locale),
    games: days.get(key) as GameEntity[]
  }));
};
