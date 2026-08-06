import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiPlayerToPlayerEntity, PlayerEntity } from './dataMappers';
import { ApiPlayerResponse } from './apiTypes';

export const getPlayer = async (playerId: string): Promise<PlayerEntity> => {
  const url = new URL(`v1/players/${playerId}`, getApiHost());
  const { data } = await httpClient.get<ApiPlayerResponse>(url.toString());
  return mapApiPlayerToPlayerEntity(data);
};
