import {
  OrganizationEntity,
  OrganizationState,
  DEFAULT_ORGANIZATION
} from './state';

export const organizationsLoading = (state: OrganizationState) =>
  state.isLoadingRequestOrganizations;

export const organizationLoading = (state: OrganizationState, slug: string) =>
  !state.organizations[slug] || state.isLoadingRequestOrganization;

export const organizationBySlug = (
  state: OrganizationState,
  slug?: string
): OrganizationEntity => {
  if (!slug || !state.organizations[slug]) {
    return DEFAULT_ORGANIZATION;
  }
  return state.organizations[slug];
};

export const organizations = (state: OrganizationState) =>
  Object.keys(state.organizations).map(
    (key: string) => state.organizations[key]
  );

export const patchingOrganization = (state: OrganizationState) =>
  state.isLoadingPatchOrganization;

export const postingOrganization = (state: OrganizationState) =>
  state.isLoadingPostOrganization;
