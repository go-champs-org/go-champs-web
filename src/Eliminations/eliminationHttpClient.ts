import {
  ApiEliminationRequest,
  ApiEliminationResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiEliminationToEliminationEntity,
  mapEliminationEntityToApiEliminationRequest
} from './dataMappers';
import { EliminationEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) =>
  `${PHASE_API}/${phaseId}/eliminations`;

const deleteRequest = (
  phaseId: string,
  phaseEliminationId: string
): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseEliminationId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  phaseElimination: EliminationEntity
): Promise<EliminationEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseElimination.id}`;
  const body = mapEliminationEntityToApiEliminationRequest(phaseElimination);

  const { data } = await httpClient.patch<
    ApiEliminationRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToEliminationEntity(data);
};

const post = async (
  phaseId: string,
  phaseElimination: EliminationEntity
): Promise<EliminationEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapEliminationEntityToApiEliminationRequest(phaseElimination);

  const { data } = await httpClient.post<
    ApiEliminationRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToEliminationEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
