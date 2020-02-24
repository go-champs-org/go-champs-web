import {
  ApiOrganizationRequest,
  ApiOrganizationResponse,
  ApiOrganizationsResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiOrganizationToOrganizationEntity,
  mapOrganizationEntityToApiOrganizationRequest
} from './dataMappers';
import { OrganizationEntity } from './state';

const ORGANIZATION_API = `${process.env.REACT_APP_API_HOST}api/organizations`;

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

export default {
  delete: deleteRequest,
  getAll,
  get,
  patch,
  post
};
