import {
  ApiPhase,
  ApiPhasePatchRequest,
  ApiPhasePostRequest,
  ApiPhaseResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapPhaseEntityToApiPhasePostRequest,
  mapPhaseEntityToApiPhasePatchRequest
} from './dataMappers';
import { PhaseEntity } from './state';

const PHASES_API = `${process.env.REACT_APP_API_HOST}api/phases`;

const deleteRequest = (phaseId: string): Promise<string> => {
  const url = `${PHASES_API}/${phaseId}`;

  return httpClient.delete(url);
};

const get = async (phaseId: string): Promise<ApiPhase> => {
  const url = `${PHASES_API}/${phaseId}`;

  const { data } = await httpClient.get<ApiPhaseResponse>(url);
  return data;
};

const patch = async (phase: PhaseEntity): Promise<ApiPhase> => {
  const url = `${PHASES_API}/${phase.id}`;
  const body = mapPhaseEntityToApiPhasePatchRequest(phase);

  const { data } = await httpClient.patch<
    ApiPhasePatchRequest,
    ApiPhaseResponse
  >(url, body);
  return data;
};

const post = async (
  phase: PhaseEntity,
  tournamentId: string
): Promise<ApiPhase> => {
  const url = `${PHASES_API}`;
  const body = mapPhaseEntityToApiPhasePostRequest(phase, tournamentId);

  const { data } = await httpClient.post<ApiPhasePostRequest, ApiPhaseResponse>(
    url,
    body
  );
  return data;
};

export default {
  delete: deleteRequest,
  get,
  patch,
  post
};
