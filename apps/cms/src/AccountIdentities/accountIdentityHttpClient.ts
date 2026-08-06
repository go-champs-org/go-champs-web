import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiAccountIdentityResponse,
  ApiAccountIdentityWriteRequest
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';

const ACCOUNT_IDENTITY_API = `${REACT_APP_API_HOST}v1/account-identity`;

const accountIdentityHttpClient = {
  delete: (): Promise<string> => httpClient.delete(ACCOUNT_IDENTITY_API),
  get: (): Promise<ApiAccountIdentityResponse> =>
    httpClient.get(ACCOUNT_IDENTITY_API),
  post: (
    body: ApiAccountIdentityWriteRequest
  ): Promise<ApiAccountIdentityResponse> =>
    httpClient.post(ACCOUNT_IDENTITY_API, body),
  put: (
    body: ApiAccountIdentityWriteRequest
  ): Promise<ApiAccountIdentityResponse> =>
    httpClient.put(ACCOUNT_IDENTITY_API, body)
};

export default accountIdentityHttpClient;
