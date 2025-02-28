import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiRegistrationResponseResourcePostRequest,
  ApiRegistrationResponseResourceResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiRegistrationResponseResourceResponseToRegistrationResponse,
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

export { post };
