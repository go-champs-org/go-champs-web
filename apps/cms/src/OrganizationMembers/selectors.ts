import { OrganizationMemberEntity, OrganizationMemberState } from './state';

export const organizationMembers = (
  state: OrganizationMemberState
): OrganizationMemberEntity[] =>
  Object.keys(state.organizationMembers).map(
    key => state.organizationMembers[key]
  );

export const organizationMembersLoading = (state: OrganizationMemberState) =>
  state.isLoadingRequestOrganizationMembers;

export const isAddingOrganizationMember = (state: OrganizationMemberState) =>
  state.isLoadingPostOrganizationMember;
