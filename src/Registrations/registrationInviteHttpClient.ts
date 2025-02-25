import { REACT_APP_API_HOST } from '../Shared/env';
import { ApiRegistrationInviteResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';

const REGISTRATION_INVITE_API = `${REACT_APP_API_HOST}v1/registration-invites`;

const getForInvitePage = async (
  registrationInviteId: string
): Promise<ApiRegistrationInviteResponse> => {
  const url = `${REGISTRATION_INVITE_API}/${registrationInviteId}?include=registration,registration.tournament`;

  return await httpClient.get<ApiRegistrationInviteResponse>(url);
};

export { getForInvitePage };
