import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentGroupEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentGroupsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/groups`;

const deleteRequest = (tournamentId: string, tournamentGroupId: string) => {
  const url = `${tournamentGroupsApi(tournamentId)}/${tournamentGroupId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (tournamentId: string) => {
  const url = `${tournamentGroupsApi(tournamentId)}`;

  return fetch(url).then(resolveResponse);
};

const patch = (
  tournamentId: string,
  tournamentGroup: TournamentGroupEntity
) => {
  const url = `${tournamentGroupsApi(tournamentId)}/${tournamentGroup.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ tournament_group: tournamentGroup })
  }).then(resolveResponse);
};

const post = (tournamentId: string, tournamentGroup: TournamentGroupEntity) => {
  const url = `${tournamentGroupsApi(tournamentId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ tournament_group: tournamentGroup })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
