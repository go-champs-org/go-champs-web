import {
  ApiOfficialProfilePostRequest,
  ApiOfficialProfilePatchRequest,
  ApiOfficialProfileResponse,
  ApiOfficialProfilesResponse,
  ApiOfficialProfileSignaturePatchResponse,
  ApiRegistrationResponseResourcePostRequest,
  ApiRegistrationResponseResourceResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { REACT_APP_API_HOST } from '../Shared/env';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';

const OFFICIAL_PROFILES_API = `${REACT_APP_API_HOST}v1/official-profiles`;

const slug = (username = '') => `${OFFICIAL_PROFILES_API}/username/${username}`;

const officialProfileHttpClient = {
  delete: (username: string): Promise<any> => httpClient.delete(slug(username)),
  get: (username: string): Promise<ApiOfficialProfileResponse> =>
    httpClient.get(slug(username)),
  patch: (
    officialProfileRequest: ApiOfficialProfilePatchRequest,
    username: string
  ): Promise<ApiOfficialProfileResponse> =>
    httpClient.patch(slug(username), officialProfileRequest),
  patchSignature: (
    signatureRequest: { signature: string; signature_pin: string },
    username: string
  ): Promise<ApiOfficialProfileSignaturePatchResponse> =>
    httpClient.patch(`${slug(username)}/signature`, signatureRequest),
  post: (
    officialProfileRequest: ApiOfficialProfilePostRequest
  ): Promise<ApiOfficialProfileResponse> =>
    httpClient.post(OFFICIAL_PROFILES_API, officialProfileRequest),
  getAll: (): Promise<ApiOfficialProfilesResponse> =>
    httpClient.get(OFFICIAL_PROFILES_API),
  getByFilter: async (
    where: RequestFilter
  ): Promise<ApiOfficialProfilesResponse> => {
    const url = `${OFFICIAL_PROFILES_API}?${mapRequestFilterToQueryString(
      where
    )}`;
    return httpClient.get(url);
  },
  approveInvite: (
    inviteId: string
  ): Promise<ApiRegistrationResponseResourceResponse> => {
    const url = `${REACT_APP_API_HOST}v1/registration-responses`;
    const body: ApiRegistrationResponseResourcePostRequest = {
      registration_response: {
        registration_invite_id: inviteId,
        response: { accepted: true }
      }
    };
    return httpClient.post(url, body);
  }
};

export default officialProfileHttpClient;
