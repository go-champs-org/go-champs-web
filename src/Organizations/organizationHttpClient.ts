import {
  ApiOrganizationRequest,
  ApiOrganizationResponse,
  ApiOrganizationsResponse,
  ApiOrganization,
  ApiRecentlyViewedOrganizationsResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiOrganizationToOrganizationEntity,
  mapOrganizationEntityToApiOrganizationRequest
} from './dataMappers';
import { OrganizationEntity } from './state';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../Shared/httpClient/requestFilter';
import { REACT_APP_API_HOST } from '../Shared/env';

const ORGANIZATION_API = `${REACT_APP_API_HOST}v1/organizations`;

const deleteRequest = (organizationId: string): Promise<string> => {
  const url = `${ORGANIZATION_API}/${organizationId}`;

  return httpClient.delete(url);
};

const get = async (organizationId: string): Promise<OrganizationEntity> => {
  const url = `${ORGANIZATION_API}/${organizationId}`;

  const { data } = await httpClient.get<ApiOrganizationResponse>(url);
  return mapApiOrganizationToOrganizationEntity(data);
};

const getAll = async (): Promise<OrganizationEntity[]> => {
  const url = ORGANIZATION_API;

  const { data } = await httpClient.get<ApiOrganizationsResponse>(url);
  return data.map(mapApiOrganizationToOrganizationEntity);
};

const getByFilter = async (
  where: RequestFilter
): Promise<ApiOrganization[]> => {
  const url = `${ORGANIZATION_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiOrganizationsResponse>(url);
  return data;
};

const patch = async (
  organization: OrganizationEntity
): Promise<OrganizationEntity> => {
  const url = `${ORGANIZATION_API}/${organization.id}`;
  const body = mapOrganizationEntityToApiOrganizationRequest(organization);

  const { data } = await httpClient.patch<
    ApiOrganizationRequest,
    ApiOrganizationResponse
  >(url, body);
  return mapApiOrganizationToOrganizationEntity(data);
};

const post = async (
  organization: OrganizationEntity
): Promise<OrganizationEntity> => {
  const url = ORGANIZATION_API;
  const body = mapOrganizationEntityToApiOrganizationRequest(organization);

  const { data } = await httpClient.post<
    ApiOrganizationRequest,
    ApiOrganizationResponse
  >(url, body);
  return mapApiOrganizationToOrganizationEntity(data);
};

const getRecentlyViewed = async (): Promise<ApiOrganization[]> => {
  const url = `${ORGANIZATION_API}/recently-viewed`;

  const { data } = await httpClient.get<ApiRecentlyViewedOrganizationsResponse>(
    url
  );
  return data.map(item => item.organization);
};

export default {
  delete: deleteRequest,
  getAll,
  getByFilter,
  get,
  getRecentlyViewed,
  patch,
  post
};
