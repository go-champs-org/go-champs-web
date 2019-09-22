import { TournamentGameEntity, TournamentGameState } from './state';

export const gamesLoading = (state: TournamentGameState) =>
  state.isLoadingRequestTournamentGames;

export const games = (state: TournamentGameState): TournamentGameEntity[] =>
  Object.keys(state.tournamentGames).map(
    (key: string) => state.tournamentGames[key]
  );

export const gameDates = (state: TournamentGameState): string[] => {
  return games(state)
    .reduce(
      (acc, game: TournamentGameEntity) => {
        const date = game.datetime.substring(0, 10);

        if (!acc.includes(date)) {
          return [...acc, date];
        }
        return acc;
      },
      [] as string[]
    )
    .sort();
};

//** Finds closer game date index. */
export const gamesCloserGameDatePosition = (
  state: TournamentGameState
): number => {
  const currentDate = new Date().toISOString().substring(0, 10);

  const dates = gameDates(state);
  const lastIndex = dates.length - 1;
  if (currentDate > dates[lastIndex]) {
    return lastIndex;
  }

  for (let index = 0; index <= lastIndex; index++) {
    if (dates[index] === currentDate) {
      return index;
    } else if (dates[index] > currentDate) {
      return index;
    }
  }

  return 0;
};

export const gamesByDate = (
  state: TournamentGameState
): { [date: string]: TournamentGameEntity[] } => {
  const dates = gameDates(state);
  const allGames = games(state);

  return dates.reduce((acc, date: string) => {
    const gamesInDate = allGames
      .filter((game: TournamentGameEntity) => game.datetime.includes(date))
      .sort(byGameDate);
    return {
      [date]: gamesInDate
    };
  }, {});
};

export const byGameDate = (
  gameA: TournamentGameEntity,
  gameB: TournamentGameEntity
): number => gameA.datetime.localeCompare(gameB.datetime);
