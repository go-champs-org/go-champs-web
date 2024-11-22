import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiTournament,
  ApiTournamentRequest,
  ApiTournamentResponse,
  ApiTournamentsResponse,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';
import { mapTournamentEntityToApiTournamentRequest } from './dataMappers';
import { TournamentEntity } from './state';

const TOURNAMENT_API = `${REACT_APP_API_HOST}v1/tournaments`;

const deleteRequest = (tournamentId: string): Promise<string> => {
  const url = `${TOURNAMENT_API}/${tournamentId}`;

  return httpClient.delete(url);
};

const get = async (
  tournamentId: string
): Promise<ApiTournamentWithDependecies> => {
  const url = `${TOURNAMENT_API}/${tournamentId}`;

  const { data } = await httpClient.get<ApiTournamentResponse>(url);
  return data;
};

const getAll = async (): Promise<ApiTournament[]> => {
  const url = TOURNAMENT_API;

  const { data } = await httpClient.get<ApiTournamentsResponse>(url);
  return data;
};

const getByFilter = async (where: RequestFilter): Promise<ApiTournament[]> => {
  const url = `${TOURNAMENT_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiTournamentsResponse>(url);
  return data;
};

const patch = async (
  organizationId: string,
  tournament: TournamentEntity
): Promise<ApiTournamentWithDependecies> => {
  const url = `${TOURNAMENT_API}/${tournament.id}`;
  const body = mapTournamentEntityToApiTournamentRequest(
    tournament,
    organizationId
  );

  const { data } = await httpClient.patch<
    ApiTournamentRequest,
    ApiTournamentResponse
  >(url, body);
  return data;
};

const post = async (
  organizationId: string,
  tournament: TournamentEntity
): Promise<ApiTournamentWithDependecies> => {
  const url = TOURNAMENT_API;
  debugger;
  const body = mapTournamentEntityToApiTournamentRequest(
    tournament,
    organizationId
  );

  return;
  // const { data } = await httpClient.post<
  //   ApiTournamentRequest,
  //   ApiTournamentResponse
  // >(url, body);
  // return data;
};

export default {
  delete: deleteRequest,
  getAll,
  getByFilter,
  get,
  patch,
  post
};
