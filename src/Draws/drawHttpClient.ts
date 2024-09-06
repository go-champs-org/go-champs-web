import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiDrawResponse,
  ApiDrawPostRequest,
  ApiDrawPatchRequest,
  ApiDraw,
  ApiDrawBatchPatchRequest,
  ApiDrawBatchResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiDrawToDrawEntity,
  mapDrawEntityToApiDrawPatchRequest,
  mapDrawEntityToApiDrawPostRequest,
  mapDrawEntitiesToApiDrawPatchBatchRequest
} from './dataMappers';
import { DrawEntity } from './state';

export interface ApiDrawBatchResponseData {
  [id: string]: ApiDraw;
}

const DRAW_API = `${REACT_APP_API_HOST}v1/draws`;

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

const patchBatch = async (
  draws: DrawEntity[]
): Promise<ApiDrawBatchResponseData> => {
  const url = DRAW_API;
  const body = mapDrawEntitiesToApiDrawPatchBatchRequest(draws);

  const { data } = await httpClient.patch<
    ApiDrawBatchPatchRequest,
    ApiDrawBatchResponse
  >(url, body);
  return data;
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
  patchBatch,
  post
};
