import {
  ApiGameRequest,
  ApiGameResponse,
  ApiGamesResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';
import {
  mapApiGameToGameEntity,
  mapGameEntityToApiGameRequest
} from './dataMappers';
import { GameEntity } from './state';

const GAMES_API = 'https://yochamps-api.herokuapp.com/api/games';

const deleteRequest = (gameId: string): Promise<string> => {
  const url = `${GAMES_API}/${gameId}`;

  return httpClient.delete(url);
};

const get = async (gameId: string): Promise<GameEntity> => {
  const url = `${GAMES_API}/${gameId}`;

  const { data } = await httpClient.get<ApiGameResponse>(url);
  return mapApiGameToGameEntity(data);
};

const getByFilter = async (where: RequestFilter): Promise<GameEntity[]> => {
  const url = `${GAMES_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiGamesResponse>(url);
  return data.map(mapApiGameToGameEntity);
};

const patch = async (game: GameEntity): Promise<GameEntity> => {
  const url = `${GAMES_API}/${game.id}`;
  const body = mapGameEntityToApiGameRequest(game);

  const { data } = await httpClient.patch<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

const post = async (game: GameEntity): Promise<GameEntity> => {
  const url = `${GAMES_API}`;
  const body = mapGameEntityToApiGameRequest(game);

  const { data } = await httpClient.post<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

export default {
  delete: deleteRequest,
  get,
  getByFilter,
  patch,
  post
};
