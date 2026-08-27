export enum OrganizationMemberRole {
  OWNER = 'owner',
  GAME_OPERATOR = 'game_operator'
}

export interface OrganizationMemberEntity {
  id: string;
  username: string;
  role: OrganizationMemberRole;
}

export interface OrganizationMemberState {
  isLoadingDeleteOrganizationMember: boolean;
  isLoadingPatchOrganizationMember: boolean;
  isLoadingPostOrganizationMember: boolean;
  isLoadingRequestOrganizationMembers: boolean;
  organizationMembers: { [key: string]: OrganizationMemberEntity };
}

export const initialState: OrganizationMemberState = {
  isLoadingDeleteOrganizationMember: false,
  isLoadingPatchOrganizationMember: false,
  isLoadingPostOrganizationMember: false,
  isLoadingRequestOrganizationMembers: false,
  organizationMembers: {}
};

export const DEFAULT_ORGANIZATION_MEMBER: OrganizationMemberEntity = {
  id: '',
  username: '',
  role: OrganizationMemberRole.GAME_OPERATOR
};
