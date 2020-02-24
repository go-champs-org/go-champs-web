import {
  ApiEliminationResponse,
  ApiEliminationPostRequest,
  ApiEliminationPatchRequest
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiEliminationToEliminationEntity,
  mapEliminationEntityToApiEliminationPatchRequest,
  mapEliminationEntityToApiEliminationPostRequest
} from './dataMappers';
import { EliminationEntity } from './state';

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
  post
};
