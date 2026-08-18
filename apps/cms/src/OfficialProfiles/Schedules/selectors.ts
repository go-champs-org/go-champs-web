import { ScheduleGameEntity, ScheduleState } from './state';

export const byScheduleGameDate = (
  gameA: ScheduleGameEntity,
  gameB: ScheduleGameEntity
): number => gameA.datetime.localeCompare(gameB.datetime);

export const scheduleGames = (state: ScheduleState): ScheduleGameEntity[] =>
  Object.keys(state.games)
    .map((gameId: string) => state.games[gameId])
    .sort(byScheduleGameDate);

export const scheduleDates = (state: ScheduleState): string[] => {
  const dates = scheduleGames(state)
    .filter((game: ScheduleGameEntity) => !!game.datetime)
    .map((game: ScheduleGameEntity) => game.datetime.substring(0, 10));

  return dates.filter(
    (date: string, index: number) => dates.indexOf(date) === index
  );
};

export const scheduleGamesByDate = (
  state: ScheduleState
): { [date: string]: ScheduleGameEntity[] } => {
  const allGames = scheduleGames(state);

  return scheduleDates(state).reduce(
    (acc: { [date: string]: ScheduleGameEntity[] }, date: string) => ({
      ...acc,
      [date]: allGames.filter((game: ScheduleGameEntity) =>
        game.datetime.startsWith(date)
      )
    }),
    {}
  );
};

export const scheduleLoading = (state: ScheduleState): boolean =>
  state.isLoadingRequestSchedule;

export const scheduleHasError = (state: ScheduleState): boolean =>
  state.hasErrorRequestSchedule;
