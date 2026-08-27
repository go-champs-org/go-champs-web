import {
  ApiOrganizationMemberPatchRequest,
  ApiOrganizationMemberPostRequest,
  ApiOrganizationMemberWithRole
} from '../Shared/httpClient/apiTypes';
import { OrganizationMemberEntity, OrganizationMemberRole } from './state';

export const mapApiOrganizationMemberToOrganizationMemberEntity = (
  apiOrganizationMember: ApiOrganizationMemberWithRole
): OrganizationMemberEntity => ({
  id: apiOrganizationMember.id,
  username: apiOrganizationMember.username,
  role:
    apiOrganizationMember.role === OrganizationMemberRole.OWNER
      ? OrganizationMemberRole.OWNER
      : OrganizationMemberRole.GAME_OPERATOR
});

export const mapOrganizationMemberEntityToApiOrganizationMemberPostRequest = (
  organizationMemberEntity: OrganizationMemberEntity
): ApiOrganizationMemberPostRequest => ({
  organization_member: {
    username: organizationMemberEntity.username,
    role: organizationMemberEntity.role
  }
});

export const mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest = (
  organizationMemberEntity: OrganizationMemberEntity
): ApiOrganizationMemberPatchRequest => ({
  organization_member: {
    role: organizationMemberEntity.role
  }
});
