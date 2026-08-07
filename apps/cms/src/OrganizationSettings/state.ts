import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';

export interface OrganizationSettingEntity {
  id: string;
  nameFormat: NameFormat;
  nameCase: NameCase;
}

export interface OrganizationSettingState {
  isLoadingDeleteOrganizationSetting: boolean;
  isLoadingPatchOrganizationSetting: boolean;
  isLoadingPostOrganizationSetting: boolean;
  isLoadingRequestOrganization: boolean;
  organizationSettings: { [key: string]: OrganizationSettingEntity };
}

export const initialState: OrganizationSettingState = {
  isLoadingDeleteOrganizationSetting: false,
  isLoadingPatchOrganizationSetting: false,
  isLoadingPostOrganizationSetting: false,
  isLoadingRequestOrganization: false,
  organizationSettings: {}
};

export const DEFAULT_ORGANIZATION_SETTING: OrganizationSettingEntity = {
  id: '',
  nameFormat: NameFormat.FULL,
  nameCase: NameCase.ORIGINAL
};
