import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiRegistrationPatchRequest,
  ApiRegistrationPostRequest,
  ApiRegistrationResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiRegistrationToRegistrationEntity,
  mapRegistrationEntityToApiRegistrationPatchRequest,
  mapRegistrationEntityToApiRegistrationPostRequest
} from './dataMappers';

import { RegistrationEntity } from './state';

const REGISTRATIONS_API = `${REACT_APP_API_HOST}v1/registrations`;

const deleteRequest = (registrationId: string): Promise<string> => {
  const url = `${REGISTRATIONS_API}/${registrationId}`;

  return httpClient.delete(url);
};

const get = async (registrationId: string): Promise<RegistrationEntity> => {
  const url = `${REGISTRATIONS_API}/${registrationId}`;

  const { data } = await httpClient.get<ApiRegistrationResponse>(url);
  return mapApiRegistrationToRegistrationEntity(data);
};

const generateInvites = async (
  registrationId: string
): Promise<RegistrationEntity> => {
  const url = `${REGISTRATIONS_API}/${registrationId}/generate-invites`;

  const { data } = await httpClient.put<
    ApiRegistrationPatchRequest,
    ApiRegistrationResponse
  >(url);
  return mapApiRegistrationToRegistrationEntity(data);
};

const patch = async (
  registration: RegistrationEntity
): Promise<RegistrationEntity> => {
  const url = `${REGISTRATIONS_API}/${registration.id}`;
  const body = mapRegistrationEntityToApiRegistrationPatchRequest(registration);

  const { data } = await httpClient.patch<
    ApiRegistrationPatchRequest,
    ApiRegistrationResponse
  >(url, body);
  return mapApiRegistrationToRegistrationEntity(data);
};

const post = async (
  registration: RegistrationEntity,
  tournamentId: string
): Promise<RegistrationEntity> => {
  const url = `${REGISTRATIONS_API}`;
  const body = mapRegistrationEntityToApiRegistrationPostRequest(
    registration,
    tournamentId
  );

  const { data } = await httpClient.post<
    ApiRegistrationPostRequest,
    ApiRegistrationResponse
  >(url, body);
  return mapApiRegistrationToRegistrationEntity(data);
};

export default {
  delete: deleteRequest,
  generateInvites,
  get,
  patch,
  post
};
