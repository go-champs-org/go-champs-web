import {
  ApiDrawResponse,
  ApiDrawPostRequest,
  ApiDrawPatchRequest
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiDrawToDrawEntity,
  mapDrawEntityToApiDrawPatchRequest,
  mapDrawEntityToApiDrawPostRequest
} from './dataMappers';
import { DrawEntity } from './state';

const DRAW_API = 'https://yochamps-api.herokuapp.com/api/draws';

const deleteRequest = (drawId: string): Promise<string> => {
  const url = `${DRAW_API}/${drawId}`;

  return httpClient.delete(url);
};

const patch = async (draw: DrawEntity): Promise<DrawEntity> => {
  const url = `${DRAW_API}/${draw.id}`;
  const body = mapDrawEntityToApiDrawPatchRequest(draw);

  const { data } = await httpClient.patch<ApiDrawPatchRequest, ApiDrawResponse>(
    url,
    body
  );
  return mapApiDrawToDrawEntity(data);
};

const post = async (draw: DrawEntity, phaseId: string): Promise<DrawEntity> => {
  const url = `${DRAW_API}`;
  const body = mapDrawEntityToApiDrawPostRequest(draw, phaseId);
  const { data } = await httpClient.post<ApiDrawPostRequest, ApiDrawResponse>(
    url,
    body
  );
  return mapApiDrawToDrawEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
