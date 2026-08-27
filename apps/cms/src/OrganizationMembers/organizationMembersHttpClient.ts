import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiOrganizationMemberPatchRequest,
  ApiOrganizationMemberPostRequest,
  ApiOrganizationMemberResponse,
  ApiOrganizationMembersResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiOrganizationMemberToOrganizationMemberEntity,
  mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest,
  mapOrganizationMemberEntityToApiOrganizationMemberPostRequest
} from './dataMappers';
import { OrganizationMemberEntity } from './state';

const organizationMembersApi = (organizationId: string) =>
  `${REACT_APP_API_HOST}v1/organizations/${organizationId}/members`;

const getAll = async (
  organizationId: string
): Promise<OrganizationMemberEntity[]> => {
  const url = organizationMembersApi(organizationId);

  const { data } = await httpClient.get<ApiOrganizationMembersResponse>(url);
  return data.map(mapApiOrganizationMemberToOrganizationMemberEntity);
};

const post = async (
  organizationMember: OrganizationMemberEntity,
  organizationId: string
): Promise<OrganizationMemberEntity> => {
  const url = organizationMembersApi(organizationId);
  const body = mapOrganizationMemberEntityToApiOrganizationMemberPostRequest(
    organizationMember
  );

  const { data } = await httpClient.post<
    ApiOrganizationMemberPostRequest,
    ApiOrganizationMemberResponse
  >(url, body);
  return mapApiOrganizationMemberToOrganizationMemberEntity(data);
};

const patch = async (
  organizationMember: OrganizationMemberEntity,
  organizationId: string
): Promise<OrganizationMemberEntity> => {
  const url = `${organizationMembersApi(organizationId)}/${
    organizationMember.id
  }`;
  const body = mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest(
    organizationMember
  );

  const { data } = await httpClient.patch<
    ApiOrganizationMemberPatchRequest,
    ApiOrganizationMemberResponse
  >(url, body);
  return mapApiOrganizationMemberToOrganizationMemberEntity(data);
};

const deleteRequest = (
  organizationMemberId: string,
  organizationId: string
): Promise<string> => {
  const url = `${organizationMembersApi(
    organizationId
  )}/${organizationMemberId}`;

  return httpClient.delete(url);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
