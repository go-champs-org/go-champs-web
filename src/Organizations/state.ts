export interface OrganizationEntity {
  id: string;
  name: string;
  slug: string;
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
