import {
  groupGamesByTournament,
  initialScheduleDate,
  nextScheduleDate,
  previousScheduleDate,
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

  describe('groupGamesByTournament', () => {
    const gameInTournament = (id: string, tournamentId: string) => ({
      ...DEFAULT_SCHEDULE_GAME,
      id,
      tournamentId,
      tournamentName: `Tournament ${tournamentId}`
    });

    it('groups the games of a day by tournament', () => {
      const groups = groupGamesByTournament([
        gameInTournament('game-1', 'a'),
        gameInTournament('game-2', 'b'),
        gameInTournament('game-3', 'a')
      ]);

      expect(groups).toEqual([
        {
          tournamentId: 'a',
          tournamentName: 'Tournament a',
          games: [
            gameInTournament('game-1', 'a'),
            gameInTournament('game-3', 'a')
          ]
        },
        {
          tournamentId: 'b',
          tournamentName: 'Tournament b',
          games: [gameInTournament('game-2', 'b')]
        }
      ]);
    });

    it('keeps the order in which each tournament first appears', () => {
      const groups = groupGamesByTournament([
        gameInTournament('game-1', 'b'),
        gameInTournament('game-2', 'a')
      ]);

      expect(groups.map(group => group.tournamentId)).toEqual(['b', 'a']);
    });

    it('returns an empty list when there are no games', () => {
      expect(groupGamesByTournament([])).toEqual([]);
    });
  });

  describe('previousScheduleDate and nextScheduleDate', () => {
    const dates = ['2026-08-18', '2026-08-20', '2026-08-22'];

    it('finds the closest loaded date on each side', () => {
      expect(previousScheduleDate(dates, '2026-08-20')).toEqual('2026-08-18');
      expect(nextScheduleDate(dates, '2026-08-20')).toEqual('2026-08-22');
    });

    it('finds the closest date when the day itself has no games', () => {
      expect(previousScheduleDate(dates, '2026-08-21')).toEqual('2026-08-20');
      expect(nextScheduleDate(dates, '2026-08-21')).toEqual('2026-08-22');
    });

    it('returns undefined at the edges of the loaded range', () => {
      expect(previousScheduleDate(dates, '2026-08-18')).toBeUndefined();
      expect(nextScheduleDate(dates, '2026-08-22')).toBeUndefined();
      expect(previousScheduleDate([], '2026-08-20')).toBeUndefined();
    });
  });

  describe('initialScheduleDate', () => {
    const calendarDates = ['2026-08-18', '2026-08-20', '2026-08-22'];

    it('opens on the reference day when it has games', () => {
      expect(initialScheduleDate(calendarDates, '2026-08-20')).toEqual(
        '2026-08-20'
      );
    });

    it('opens on the next day with games when the reference day has none', () => {
      expect(initialScheduleDate(calendarDates, '2026-08-19')).toEqual(
        '2026-08-20'
      );
    });

    it('falls back to the last day with games when nothing is ahead', () => {
      expect(initialScheduleDate(calendarDates, '2026-08-30')).toEqual(
        '2026-08-22'
      );
    });

    it('keeps the reference day when there are no games at all', () => {
      expect(initialScheduleDate([], '2026-08-20')).toEqual('2026-08-20');
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
