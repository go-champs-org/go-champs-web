import {
  ApiOfficialProfilePostRequest,
  ApiOfficialProfilePatchRequest,
  ApiOfficialProfileResponse,
  ApiOfficialProfilesResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { REACT_APP_API_HOST } from '../Shared/env';

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
  post: (
    officialProfileRequest: ApiOfficialProfilePostRequest
  ): Promise<ApiOfficialProfileResponse> =>
    httpClient.post(OFFICIAL_PROFILES_API, officialProfileRequest),
  getAll: (): Promise<ApiOfficialProfilesResponse> =>
    httpClient.get(OFFICIAL_PROFILES_API)
};

export default officialProfileHttpClient;
