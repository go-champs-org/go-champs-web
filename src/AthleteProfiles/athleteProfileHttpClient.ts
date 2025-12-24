import {
  ApiAthleteProfilePostRequest,
  ApiAthleteProfilePatchRequest,
  ApiAthleteProfileResponse,
  ApiAthleteProfilesResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { REACT_APP_API_HOST } from '../Shared/env';

const ATHLETE_PROFILES_API = `${REACT_APP_API_HOST}v1/athlete-profiles`;

const slug = (username = '') => `${ATHLETE_PROFILES_API}/username/${username}`;

const athleteProfileHttpClient = {
  delete: (username: string): Promise<any> => httpClient.delete(slug(username)),
  get: (username: string): Promise<ApiAthleteProfileResponse> =>
    httpClient.get(slug(username)),
  patch: (
    athleteProfileRequest: ApiAthleteProfilePatchRequest,
    username: string
  ): Promise<ApiAthleteProfileResponse> =>
    httpClient.patch(slug(username), athleteProfileRequest),
  post: (
    athleteProfileRequest: ApiAthleteProfilePostRequest
  ): Promise<ApiAthleteProfileResponse> =>
    httpClient.post(ATHLETE_PROFILES_API, athleteProfileRequest),
  getAll: (): Promise<ApiAthleteProfilesResponse> =>
    httpClient.get(ATHLETE_PROFILES_API)
};

export default athleteProfileHttpClient;
