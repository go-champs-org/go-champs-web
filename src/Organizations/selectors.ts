import { OrganizationEntity, OrganizationState } from './state';

export const organizationsLoading = (state: OrganizationState) =>
  state.isLoadingRequestOrganizations;

export const organizationLoading = (state: OrganizationState, slug: string) =>
  !state.organizations[slug] || state.isLoadingRequestOrganization;

export const organizationBySlug = (
  state: OrganizationState,
  slug: string
): OrganizationEntity => state.organizations[slug];

export const organizations = (state: OrganizationState) =>
  Object.keys(state.organizations).map(
    (key: string) => state.organizations[key]
  );
