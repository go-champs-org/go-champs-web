import {
  ApiGameRequest,
  ApiGameResponse,
  ApiGamesResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiGameToGameEntity,
  mapGameEntityToApiGameRequest
} from './dataMappers';
import { TournamentGameEntity } from './state';

const GAMES_API = 'https://yochamps-api.herokuapp.com/api/games';

export interface RequestFilter {
  [key: string]: string;
}

const mapRequestFilterToQueryString = (filter: RequestFilter) => {
  return Object.keys(filter)
    .map((key: string) => `where[${key}]=${filter[key]}`)
    .join('&');
};

const deleteRequest = (
  phaseId: string,
  tournamentGameId: string
): Promise<string> => {
  const url = `${GAMES_API}/${tournamentGameId}`;

  return httpClient.delete(url);
};

const get = async (
  phaseId: string,
  tournamentGameId: string
): Promise<TournamentGameEntity> => {
  const url = `${GAMES_API}/${tournamentGameId}`;

  const { data } = await httpClient.get<ApiGameResponse>(url);
  return mapApiGameToGameEntity(data);
};

const getAll = async (phaseId: string): Promise<TournamentGameEntity[]> => {
  const url = GAMES_API;

  const { data } = await httpClient.get<ApiGamesResponse>(url);
  return data.map(mapApiGameToGameEntity);
};

const getByFilter = async (
  where: RequestFilter
): Promise<TournamentGameEntity[]> => {
  const url = `${GAMES_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiGamesResponse>(url);
  return data.map(mapApiGameToGameEntity);
};

const patch = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${GAMES_API}/${tournamentGame.id}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.patch<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

const post = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${GAMES_API}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.post<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

export default {
  delete: deleteRequest,
  getAll,
  get,
  getByFilter,
  patch,
  post
};
