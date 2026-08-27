import {
  mapApiOrganizationMemberToOrganizationMemberEntity,
  mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest,
  mapOrganizationMemberEntityToApiOrganizationMemberPostRequest
} from './dataMappers';
import { OrganizationMemberEntity, OrganizationMemberRole } from './state';

describe('mapApiOrganizationMemberToOrganizationMemberEntity', () => {
  it('maps api organization member', () => {
    expect(
      mapApiOrganizationMemberToOrganizationMemberEntity({
        id: 'some-id',
        username: 'some-username',
        role: 'game_operator'
      })
    ).toEqual({
      id: 'some-id',
      username: 'some-username',
      role: OrganizationMemberRole.GAME_OPERATOR
    });
  });

  it('maps owner role', () => {
    expect(
      mapApiOrganizationMemberToOrganizationMemberEntity({
        id: 'some-id',
        username: 'some-username',
        role: 'owner'
      }).role
    ).toEqual(OrganizationMemberRole.OWNER);
  });
});

describe('mapOrganizationMemberEntityToApiOrganizationMemberPostRequest', () => {
  const organizationMember: OrganizationMemberEntity = {
    id: 'some-id',
    username: 'some-username',
    role: OrganizationMemberRole.GAME_OPERATOR
  };

  it('maps username and role', () => {
    expect(
      mapOrganizationMemberEntityToApiOrganizationMemberPostRequest(
        organizationMember
      )
    ).toEqual({
      organization_member: {
        username: 'some-username',
        role: 'game_operator'
      }
    });
  });
});

describe('mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest', () => {
  const organizationMember: OrganizationMemberEntity = {
    id: 'some-id',
    username: 'some-username',
    role: OrganizationMemberRole.GAME_OPERATOR
  };

  it('maps role only', () => {
    expect(
      mapOrganizationMemberEntityToApiOrganizationMemberPatchRequest(
        organizationMember
      )
    ).toEqual({
      organization_member: {
        role: 'game_operator'
      }
    });
  });
});
