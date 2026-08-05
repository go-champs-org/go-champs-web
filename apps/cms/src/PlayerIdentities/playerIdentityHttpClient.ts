import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiPlayerIdentityResponse,
  ApiPlayerIdentityWriteRequest
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';

const slug = (playerId: string) =>
  `${REACT_APP_API_HOST}v1/players/${playerId}/identity`;

const playerIdentityHttpClient = {
  delete: (playerId: string): Promise<string> =>
    httpClient.delete(slug(playerId)),
  get: (playerId: string): Promise<ApiPlayerIdentityResponse> =>
    httpClient.get(slug(playerId)),
  post: (
    playerId: string,
    body: ApiPlayerIdentityWriteRequest
  ): Promise<ApiPlayerIdentityResponse> =>
    httpClient.post(slug(playerId), body),
  put: (
    playerId: string,
    body: ApiPlayerIdentityWriteRequest
  ): Promise<ApiPlayerIdentityResponse> =>
    httpClient.put(slug(playerId), body)
};

export default playerIdentityHttpClient;
