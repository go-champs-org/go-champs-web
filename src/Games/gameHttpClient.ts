import {
  ApiGameResponse,
  ApiGamesResponse,
  ApiGamePostRequest,
  ApiGamePatchRequest
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';
import {
  mapApiGameToGameEntity,
  mapGameEntityToApiGamePostRequest,
  mapGameEntityToApiGamePatchRequest
} from './dataMappers';
import { GameEntity } from './state';

const GAMES_API = `${process.env.REACT_APP_API_HOST}v1/games`;

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
  const body = mapGameEntityToApiGamePatchRequest(game);

  const { data } = await httpClient.patch<ApiGamePatchRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

const post = async (game: GameEntity, phaseId: string): Promise<GameEntity> => {
  const url = `${GAMES_API}`;
  const body = mapGameEntityToApiGamePostRequest(game, phaseId);

  const { data } = await httpClient.post<ApiGamePostRequest, ApiGameResponse>(
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
