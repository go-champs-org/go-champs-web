import { ApiDrawRequest, ApiDrawResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiDrawToRoundEntity,
  mapRoundEntityToApiDrawRequest
} from './dataMappers';
import { DrawEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) => `${PHASE_API}/${phaseId}/draws`;

const deleteRequest = (phaseId: string, drawId: string): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${drawId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  draw: DrawEntity
): Promise<DrawEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${draw.id}`;
  const body = mapRoundEntityToApiDrawRequest(draw);

  const { data } = await httpClient.patch<ApiDrawRequest, ApiDrawResponse>(
    url,
    body
  );
  return mapApiDrawToRoundEntity(data);
};

const post = async (phaseId: string, draw: DrawEntity): Promise<DrawEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapRoundEntityToApiDrawRequest(draw);

  const { data } = await httpClient.post<ApiDrawRequest, ApiDrawResponse>(
    url,
    body
  );
  return mapApiDrawToRoundEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
