export interface OrganizationEntity {
  id: string;
  name: string;
  slug: string;
}

export interface OrganizationState {
  isLoadingDeleteOrganization: boolean;
  isLoadingPatchOrganization: boolean;
  isLoadingPostOrganization: boolean;
  isLoadingRequestOrganization: boolean;
  isLoadingRequestOrganizations: boolean;
  organizations: { [key: string]: OrganizationEntity };
}

export const initialState: OrganizationState = {
  isLoadingDeleteOrganization: false,
  isLoadingPatchOrganization: false,
  isLoadingPostOrganization: false,
  isLoadingRequestOrganization: false,
  isLoadingRequestOrganizations: false,
  organizations: {}
};
