import { ApiDrawRequest, ApiDrawResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiDrawToDrawEntity,
  mapDrawEntityToApiDrawRequest
} from './dataMappers';
import { DrawEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const drawApi = (phaseId: string) => `${PHASE_API}/${phaseId}/draws`;

const deleteRequest = (phaseId: string, drawId: string): Promise<string> => {
  const url = `${drawApi(phaseId)}/${drawId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  draw: DrawEntity
): Promise<DrawEntity> => {
  const url = `${drawApi(phaseId)}/${draw.id}`;
  const body = mapDrawEntityToApiDrawRequest(draw);

  const { data } = await httpClient.patch<ApiDrawRequest, ApiDrawResponse>(
    url,
    body
  );
  return mapApiDrawToDrawEntity(data);
};

const post = async (phaseId: string, draw: DrawEntity): Promise<DrawEntity> => {
  const url = `${drawApi(phaseId)}`;
  const body = mapDrawEntityToApiDrawRequest(draw);

  const { data } = await httpClient.post<ApiDrawRequest, ApiDrawResponse>(
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
