import {
  ApiOrganization,
  ApiOrganizationRequest
} from '../Shared/httpClient/apiTypes';
import {
  OrganizationEntity,
  MemberEntity,
  DEFAULT_ORGANIZATION
} from './state';

export const mapApiOrganizationToOrganizationEntity = (
  apiOrganization: ApiOrganization
): OrganizationEntity => ({
  id: apiOrganization.id,
  name: apiOrganization.name,
  slug: apiOrganization.slug,
  members: apiOrganization.members || []
});

export const mapMemberEntityToApiOrganizationMember = (
  member: MemberEntity
) => ({
  username: member.username
});

export const mapOrganizationEntityToApiOrganizationRequest = (
  organization: OrganizationEntity
): ApiOrganizationRequest => ({
  organization: {
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    members:
      organization.members.length > 0
        ? organization.members.map(mapMemberEntityToApiOrganizationMember)
        : undefined
  }
});

export const buildNewOrganizationWithMember = () => {
  const currentUsername = localStorage.getItem('username') || '';
  return {
    ...DEFAULT_ORGANIZATION,
    members: [{ username: currentUsername }]
  };
};
