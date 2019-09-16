import {
  ApiTournamentRequest,
  ApiTournamentResponse,
  ApiTournamentsResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiTournamentToTournamentEntity,
  mapTournamentEntityToApiTournamentRequest
} from './dataMappers';
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

const deleteRequest = (tournamentId: string): Promise<string> => {
  const url = `${TOURNAMENT_API}/${tournamentId}`;

  return httpClient.delete(url);
};

const get = async (tournamentId: string): Promise<TournamentEntity> => {
  const url = `${TOURNAMENT_API}/${tournamentId}`;

  const { data } = await httpClient.get<ApiTournamentResponse>(url);
  return mapApiTournamentToTournamentEntity(data);
};

const getAll = async (): Promise<TournamentEntity[]> => {
  const url = TOURNAMENT_API;

  const { data } = await httpClient.get<ApiTournamentsResponse>(url);
  return data.map(mapApiTournamentToTournamentEntity);
};

const getByFilter = async (
  where: RequestFilter
): Promise<TournamentEntity[]> => {
  const url = `${TOURNAMENT_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiTournamentsResponse>(url);
  return data.map(mapApiTournamentToTournamentEntity);
};

const patch = async (
  organizationId: string,
  tournament: TournamentEntity
): Promise<TournamentEntity> => {
  const url = `${TOURNAMENT_API}/${tournament.id}`;
  const body = mapTournamentEntityToApiTournamentRequest(
    tournament,
    organizationId
  );

  const { data } = await httpClient.patch<
    ApiTournamentRequest,
    ApiTournamentResponse
  >(url, body);
  return mapApiTournamentToTournamentEntity(data);
};

const post = async (
  organizationId: string,
  tournament: TournamentEntity
): Promise<TournamentEntity> => {
  const url = `${TOURNAMENT_API}/${tournament.id}`;
  const body = mapTournamentEntityToApiTournamentRequest(
    tournament,
    organizationId
  );

  const { data } = await httpClient.post<
    ApiTournamentRequest,
    ApiTournamentResponse
  >(url, body);
  return mapApiTournamentToTournamentEntity(data);
};

export default {
  delete: deleteRequest,
  getAll,
  getByFilter,
  get,
  patch,
  post
};
