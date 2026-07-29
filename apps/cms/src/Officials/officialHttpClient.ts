import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiOfficialPatchRequest,
  ApiOfficialPostRequest,
  ApiOfficialResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiOfficialToOfficialEntity,
  mapOfficialEntityToApiOfficialPatchRequest,
  mapOfficialEntityToApiOfficialPostRequest
} from './dataMappers';
import { OfficialEntity } from './state';

const OFFICIALS_API = `${REACT_APP_API_HOST}v1/officials`;

const deleteRequest = (officialId: string): Promise<string> => {
  const url = `${OFFICIALS_API}/${officialId}`;

  return httpClient.delete(url);
};

const patch = async (official: OfficialEntity): Promise<OfficialEntity> => {
  const url = `${OFFICIALS_API}/${official.id}`;
  const body = mapOfficialEntityToApiOfficialPatchRequest(official);

  const { data } = await httpClient.patch<
    ApiOfficialPatchRequest,
    ApiOfficialResponse
  >(url, body);
  return mapApiOfficialToOfficialEntity(data);
};

const post = async (
  official: OfficialEntity,
  tournamentId: string
): Promise<OfficialEntity> => {
  const url = OFFICIALS_API;
  const body = mapOfficialEntityToApiOfficialPostRequest(
    official,
    tournamentId
  );

  const { data } = await httpClient.post<
    ApiOfficialPostRequest,
    ApiOfficialResponse
  >(url, body);
  return mapApiOfficialToOfficialEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
