import recentlyViewsHttpClient from './recentlyViewsHttpClient';

export const VISITED_TOURNAMENTS_KEY = 'visitedTournamentsKey';

export const postRecentlyView = (tournamentId: string) => {
  const tournamentIdsString =
    sessionStorage.getItem(VISITED_TOURNAMENTS_KEY) || '';
  const tournamentIds = tournamentIdsString.split(',');

  if (!tournamentIds.includes(tournamentId)) {
    recentlyViewsHttpClient.post(tournamentId);

    const newTournamentIds = [...tournamentIds, tournamentId];
    sessionStorage.setItem(
      VISITED_TOURNAMENTS_KEY,
      newTournamentIds.toString()
    );
  }
};
