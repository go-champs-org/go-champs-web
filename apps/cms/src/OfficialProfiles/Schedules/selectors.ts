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

export interface ScheduleTournamentGroup {
  tournamentId: string;
  tournamentName: string;
  games: ScheduleGameEntity[];
}

/** Groups the games of a single day by tournament, keeping the order in which
 * each tournament first appears in the day. */
export const groupGamesByTournament = (
  games: ScheduleGameEntity[]
): ScheduleTournamentGroup[] =>
  games.reduce((groups: ScheduleTournamentGroup[], game) => {
    const group = groups.find(
      (currentGroup: ScheduleTournamentGroup) =>
        currentGroup.tournamentId === game.tournamentId
    );

    if (group) {
      group.games.push(game);
      return groups;
    }

    return [
      ...groups,
      {
        tournamentId: game.tournamentId,
        tournamentName: game.tournamentName,
        games: [game]
      }
    ];
  }, []);

export const previousScheduleDate = (
  dates: string[],
  date: string
): string | undefined =>
  dates.filter((currentDate: string) => currentDate < date).pop();

export const nextScheduleDate = (
  dates: string[],
  date: string
): string | undefined =>
  dates.find((currentDate: string) => currentDate > date);

/** The day the calendar opens on: the reference day when it has games,
 * otherwise the next day that does, and failing that the last one that did. */
export const initialScheduleDate = (
  dates: string[],
  referenceDate: string
): string => {
  if (dates.includes(referenceDate)) {
    return referenceDate;
  }

  return (
    nextScheduleDate(dates, referenceDate) ||
    previousScheduleDate(dates, referenceDate) ||
    referenceDate
  );
};

export const scheduleLoading = (state: ScheduleState): boolean =>
  state.isLoadingRequestSchedule;

export const scheduleHasError = (state: ScheduleState): boolean =>
  state.hasErrorRequestSchedule;
