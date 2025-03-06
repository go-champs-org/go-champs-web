import { REACT_APP_API_HOST } from '../Shared/env';
import { ApiRegistrationInviteResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { mapApiRegistrationInviteToRegistrationInviteEntity } from './dataMappers';
import { RegistrationInviteEntity } from './state';

const REGISTRATION_INVITE_API = `${REACT_APP_API_HOST}v1/registration-invites`;

const get = async (
  registrationInviteId: string
): Promise<RegistrationInviteEntity> => {
  const url = `${REGISTRATION_INVITE_API}/${registrationInviteId}?include=registration_responses`;

  const { data } = await httpClient.get<ApiRegistrationInviteResponse>(url);

  return mapApiRegistrationInviteToRegistrationInviteEntity(data);
};

const getForInvitePage = async (
  registrationInviteId: string
): Promise<ApiRegistrationInviteResponse> => {
  const url = `${REGISTRATION_INVITE_API}/${registrationInviteId}?include=registration,registration.tournament`;

  return await httpClient.get<ApiRegistrationInviteResponse>(url);
};

export default { get, getForInvitePage };
