import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentStatEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentStatsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/stats`;

const deleteRequest = (tournamentId: string, tournamentStatId: string) => {
  const url = `${tournamentStatsApi(tournamentId)}/${tournamentStatId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (tournamentId: string) => {
  const url = `${tournamentStatsApi(tournamentId)}`;

  return fetch(url).then(resolveResponse);
};

const patch = (tournamentId: string, tournamentStat: TournamentStatEntity) => {
  const url = `${tournamentStatsApi(tournamentId)}/${tournamentStat.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ tournament_stat: tournamentStat })
  }).then(resolveResponse);
};

const post = (tournamentId: string, tournamentStat: TournamentStatEntity) => {
  const url = `${tournamentStatsApi(tournamentId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ tournament_stat: tournamentStat })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
