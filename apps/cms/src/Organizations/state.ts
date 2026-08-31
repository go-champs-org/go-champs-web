import { OrganizationSettingEntity } from '../OrganizationSettings/state';

export interface OrganizationEntity {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  organizationSetting?: OrganizationSettingEntity;
}

export interface OrganizationState {
  isLoadingDeleteOrganization: boolean;
  isLoadingPatchOrganization: boolean;
  isLoadingPostOrganization: boolean;
  isLoadingRequestOrganizations: boolean;
  isLoadingRequestOrganization: boolean;
  organizations: { [key: string]: OrganizationEntity };
}

export const initialState: OrganizationState = {
  isLoadingDeleteOrganization: false,
  isLoadingPatchOrganization: false,
  isLoadingPostOrganization: false,
  isLoadingRequestOrganizations: false,
  isLoadingRequestOrganization: false,
  organizations: {}
};

export const DEFAULT_ORGANIZATION: OrganizationEntity = {
  id: '',
  name: '',
  slug: '',
  logoUrl: ''
};
