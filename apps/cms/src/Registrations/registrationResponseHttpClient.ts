import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiRegistrationResponseResourcePostRequest,
  ApiRegistrationResponseResourcePutApproveRequest,
  ApiRegistrationResponseResourceResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiRegistrationResponseResourceResponseToRegistrationResponse,
  mapRegistrationResponseEntitiesToApiRegistrationResponseResourcePutApproveRequest,
  mapRegistrationResponseEntityToApiRegistrationResponseResourceRequest
} from './dataMappers';
import { RegistrationResponseEntity } from './state';

const REGISTRATION_RESPONSE_API = `${REACT_APP_API_HOST}v1/registration-responses`;

const post = async (
  registrationResponse: RegistrationResponseEntity,
  registrationInviteId: string
): Promise<RegistrationResponseEntity> => {
  const url = `${REGISTRATION_RESPONSE_API}`;

  const body = mapRegistrationResponseEntityToApiRegistrationResponseResourceRequest(
    registrationResponse,
    registrationInviteId
  );

  const { data } = await httpClient.post<
    ApiRegistrationResponseResourcePostRequest,
    ApiRegistrationResponseResourceResponse
  >(url, body);
  return mapApiRegistrationResponseResourceResponseToRegistrationResponse(data);
};

const approve = async (
  registrationResponses: RegistrationResponseEntity[]
): Promise<RegistrationResponseEntity[]> => {
  const url = `${REGISTRATION_RESPONSE_API}/approve`;

  const body = mapRegistrationResponseEntitiesToApiRegistrationResponseResourcePutApproveRequest(
    registrationResponses
  );

  await httpClient.put<
    ApiRegistrationResponseResourcePutApproveRequest,
    string
  >(url, body);

  return registrationResponses.map(response => ({
    ...response,
    status: 'approved'
  }));
};

export default { approve, post };
