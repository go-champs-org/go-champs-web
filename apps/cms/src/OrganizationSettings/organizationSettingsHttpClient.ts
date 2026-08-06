import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiOrganizationSettingPatchRequest,
  ApiOrganizationSettingPostRequest,
  ApiOrganizationSettingResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiOrganizationSettingToOrganizationSettingEntity,
  mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest,
  mapOrganizationSettingEntityToApiOrganizationSettingPostRequest
} from './dataMappers';
import { OrganizationSettingEntity } from './state';

const ORGANIZATION_SETTING_API = `${REACT_APP_API_HOST}v1/organization-settings`;

const deleteRequest = (organizationSettingId: string): Promise<string> => {
  const url = `${ORGANIZATION_SETTING_API}/${organizationSettingId}`;

  return httpClient.delete(url);
};

const patch = async (
  organizationSetting: OrganizationSettingEntity
): Promise<OrganizationSettingEntity> => {
  const url = `${ORGANIZATION_SETTING_API}/${organizationSetting.id}`;
  const body = mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest(
    organizationSetting
  );

  const { data } = await httpClient.patch<
    ApiOrganizationSettingPatchRequest,
    ApiOrganizationSettingResponse
  >(url, body);
  return mapApiOrganizationSettingToOrganizationSettingEntity(data);
};

const post = async (
  organizationSetting: OrganizationSettingEntity,
  organizationId: string
): Promise<OrganizationSettingEntity> => {
  const url = ORGANIZATION_SETTING_API;
  const body = mapOrganizationSettingEntityToApiOrganizationSettingPostRequest(
    organizationSetting,
    organizationId
  );

  const { data } = await httpClient.post<
    ApiOrganizationSettingPostRequest,
    ApiOrganizationSettingResponse
  >(url, body);
  return mapApiOrganizationSettingToOrganizationSettingEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
