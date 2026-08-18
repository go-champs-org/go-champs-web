import {
  scheduleDates,
  scheduleGames,
  scheduleGamesByDate,
  scheduleHasError,
  scheduleLoading
} from './selectors';
import { DEFAULT_SCHEDULE_GAME, ScheduleState, initialState } from './state';

const gameWith = (id: string, datetime: string) => ({
  ...DEFAULT_SCHEDULE_GAME,
  id,
  datetime
});

const stateWith = (games: ReturnType<typeof gameWith>[]): ScheduleState => ({
  ...initialState,
  games: games.reduce((acc, game) => ({ ...acc, [game.id]: game }), {})
});

describe('schedule selectors', () => {
  const firstGame = gameWith('game-1', '2026-08-20T19:30:00Z');
  const secondGame = gameWith('game-2', '2026-08-20T21:00:00Z');
  const thirdGame = gameWith('game-3', '2026-08-22T18:00:00Z');

  describe('scheduleGames', () => {
    it('returns the games in chronological order', () => {
      const state = stateWith([thirdGame, secondGame, firstGame]);

      expect(scheduleGames(state).map(game => game.id)).toEqual([
        'game-1',
        'game-2',
        'game-3'
      ]);
    });

    it('returns an empty list when there are no games', () => {
      expect(scheduleGames(initialState)).toEqual([]);
    });
  });

  describe('scheduleDates', () => {
    it('returns each date once, in chronological order', () => {
      const state = stateWith([thirdGame, secondGame, firstGame]);

      expect(scheduleDates(state)).toEqual(['2026-08-20', '2026-08-22']);
    });

    it('skips games without a datetime', () => {
      const state = stateWith([firstGame, gameWith('game-4', '')]);

      expect(scheduleDates(state)).toEqual(['2026-08-20']);
    });
  });

  describe('scheduleGamesByDate', () => {
    it('groups the games by date, chronologically within each date', () => {
      const state = stateWith([thirdGame, secondGame, firstGame]);

      expect(scheduleGamesByDate(state)).toEqual({
        '2026-08-20': [firstGame, secondGame],
        '2026-08-22': [thirdGame]
      });
    });

    it('returns an empty map when there are no games', () => {
      expect(scheduleGamesByDate(initialState)).toEqual({});
    });
  });

  describe('scheduleLoading and scheduleHasError', () => {
    it('reads the loading flag', () => {
      expect(scheduleLoading(initialState)).toEqual(false);
      expect(
        scheduleLoading({ ...initialState, isLoadingRequestSchedule: true })
      ).toEqual(true);
    });

    it('reads the error flag', () => {
      expect(scheduleHasError(initialState)).toEqual(false);
      expect(
        scheduleHasError({ ...initialState, hasErrorRequestSchedule: true })
      ).toEqual(true);
    });
  });
});
