import {
  ApiEliminationResponse,
  ApiEliminationPostRequest,
  ApiEliminationPatchRequest,
  ApiElimination,
  ApiEliminationBatchPatchRequest,
  ApiEliminationBatchResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiEliminationToEliminationEntity,
  mapEliminationEntityToApiEliminationPatchRequest,
  mapEliminationEntityToApiEliminationPostRequest,
  mapEliminationEntitiesToApiEliminationPatchBatchRequest
} from './dataMappers';
import { EliminationEntity } from './state';

export interface ApiEliminationBatchResponseData {
  [id: string]: ApiElimination;
}

const ELIMINATION_API = `${process.env.REACT_APP_API_HOST}api/eliminations`;

const deleteRequest = (eliminationId: string): Promise<string> => {
  const url = `${ELIMINATION_API}/${eliminationId}`;

  return httpClient.delete(url);
};

const patch = async (
  elimination: EliminationEntity
): Promise<EliminationEntity> => {
  const url = `${ELIMINATION_API}/${elimination.id}`;
  const body = mapEliminationEntityToApiEliminationPatchRequest(elimination);

  const { data } = await httpClient.patch<
    ApiEliminationPatchRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToEliminationEntity(data);
};

const patchBatch = async (
  eliminations: EliminationEntity[]
): Promise<ApiEliminationBatchResponseData> => {
  const url = ELIMINATION_API;
  const body = mapEliminationEntitiesToApiEliminationPatchBatchRequest(
    eliminations
  );

  const { data } = await httpClient.patch<
    ApiEliminationBatchPatchRequest,
    ApiEliminationBatchResponse
  >(url, body);
  return data;
};

const post = async (
  elimination: EliminationEntity,
  phaseId: string
): Promise<EliminationEntity> => {
  const url = `${ELIMINATION_API}`;
  const body = mapEliminationEntityToApiEliminationPostRequest(
    elimination,
    phaseId
  );
  const { data } = await httpClient.post<
    ApiEliminationPostRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToEliminationEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  patchBatch,
  post
};
