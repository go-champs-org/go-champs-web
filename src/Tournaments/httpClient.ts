import { DEFAULT_HEADERS, resolveResponse } from '../Shared/httpClient';
import { TournamentEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

export interface RequestFilter {
  [key: string]: string;
}

const mapRequestFilterToQueryString = (filter: RequestFilter) => {
  return Object.keys(filter)
    .map((key: string) => `where[${key}]=${filter[key]}`)
    .join('&');
};

const deleteRequest = (gameId: string) => {
  const url = `${TOURNAMENT_API}/${gameId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = () => {
  const url = TOURNAMENT_API;

  return fetch(url).then(resolveResponse);
};

const getByFilter = (where: RequestFilter) => {
  const url = `${TOURNAMENT_API}?${mapRequestFilterToQueryString(where)}`;

  return fetch(url).then(resolveResponse);
};

const getOne = (tournamentId: string) => {
  const url = `${TOURNAMENT_API}/${tournamentId}`;

  return fetch(url).then(resolveResponse);
};

const patch = (organizationId: string, tournament: TournamentEntity) => {
  const url = `${TOURNAMENT_API}/${tournament.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({
      tournament: {
        name: tournament.name,
        slug: tournament.slug,
        organization_id: organizationId
      }
    })
  }).then(resolveResponse);
};

const post = (organizationId: string, tournament: TournamentEntity) => {
  const url = TOURNAMENT_API;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({
      tournament: {
        name: tournament.name,
        slug: tournament.slug,
        organization_id: organizationId
      }
    })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  getByFilter,
  getOne,
  patch,
  post
};
