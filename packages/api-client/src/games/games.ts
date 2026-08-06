import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiGameToGameEntity, GameEntity } from './dataMappers';
import { ApiGameResponse } from './apiTypes';

export const getGame = async (gameId: string): Promise<GameEntity> => {
  const url = new URL(`v1/games/${gameId}`, getApiHost());
  const { data } = await httpClient.get<ApiGameResponse>(url.toString());
  return mapApiGameToGameEntity(data);
};
