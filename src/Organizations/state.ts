export interface OrganizationEntity {
  id: string;
  name: string;
  slug: string;
}

export interface OrganizationState {
  isLoadingDeleteOrganization: boolean;
  isLoadingPatchOrganization: boolean;
  isLoadingPostOrganization: boolean;
  isLoadingOrganizations: boolean;
  isLoadingOrganization: boolean;
  organizations: { [key: string]: OrganizationEntity };
}

export const initialState: OrganizationState = {
  isLoadingDeleteOrganization: false,
  isLoadingPatchOrganization: false,
  isLoadingPostOrganization: false,
  isLoadingOrganizations: false,
  isLoadingOrganization: false,
  organizations: {}
};