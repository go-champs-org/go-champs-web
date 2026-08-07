import {
  ApiOrganizationSetting,
  ApiOrganizationSettingPatchRequest,
  ApiOrganizationSettingPostRequest
} from '../Shared/httpClient/apiTypes';
import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { OrganizationSettingEntity } from './state';

export const mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest = (
  organizationSettingEntity: OrganizationSettingEntity
): ApiOrganizationSettingPatchRequest => {
  return {
    organization_setting: {
      id: organizationSettingEntity.id,
      name_format: organizationSettingEntity.nameFormat,
      name_case: organizationSettingEntity.nameCase
    }
  };
};

export const mapOrganizationSettingEntityToApiOrganizationSettingPostRequest = (
  organizationSettingEntity: OrganizationSettingEntity,
  organizationId: string
): ApiOrganizationSettingPostRequest => {
  return {
    organization_setting: {
      id: organizationSettingEntity.id,
      name_format: organizationSettingEntity.nameFormat,
      name_case: organizationSettingEntity.nameCase,
      organization_id: organizationId
    }
  };
};

export const mapApiOrganizationSettingToOrganizationSettingEntity = (
  apiOrganizationSetting: ApiOrganizationSetting
): OrganizationSettingEntity => {
  return {
    id: apiOrganizationSetting.id,
    nameFormat: apiOrganizationSetting.name_format
      ? apiOrganizationSetting.name_format
      : NameFormat.FULL,
    nameCase: apiOrganizationSetting.name_case
      ? apiOrganizationSetting.name_case
      : NameCase.ORIGINAL
  };
};
