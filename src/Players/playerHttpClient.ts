import {
  ApiPlayerPatchRequest,
  ApiPlayerPostRequest,
  ApiPlayerResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiPlayerToPlayerEntity,
  mapPlayerEntityToApiPlayerPatchRequest,
  mapPlayerEntityToApiPlayerPostRequest
} from './dataMappers';
import { PlayerEntity } from './state';

const PLAYERS_API = `${process.env.REACT_APP_API_HOST}v1/players`;

const deleteRequest = (playerId: string): Promise<string> => {
  const url = `${PLAYERS_API}/${playerId}`;

  return httpClient.delete(url);
};

const patch = async (player: PlayerEntity): Promise<PlayerEntity> => {
  const url = `${PLAYERS_API}/${player.id}`;
  const body = mapPlayerEntityToApiPlayerPatchRequest(player);

  const { data } = await httpClient.patch<
    ApiPlayerPatchRequest,
    ApiPlayerResponse
  >(url, body);
  return mapApiPlayerToPlayerEntity(data);
};

const post = async (
  player: PlayerEntity,
  tournamentId: string
): Promise<PlayerEntity> => {
  const url = PLAYERS_API;
  const body = mapPlayerEntityToApiPlayerPostRequest(player, tournamentId);

  const { data } = await httpClient.post<
    ApiPlayerPostRequest,
    ApiPlayerResponse
  >(url, body);
  return mapApiPlayerToPlayerEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
