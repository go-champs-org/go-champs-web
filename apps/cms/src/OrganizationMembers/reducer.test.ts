import {
  DELETE_ORGANIZATION_MEMBER,
  DELETE_ORGANIZATION_MEMBER_FAILURE,
  DELETE_ORGANIZATION_MEMBER_SUCCESS,
  GET_ORGANIZATION_MEMBERS,
  GET_ORGANIZATION_MEMBERS_FAILURE,
  GET_ORGANIZATION_MEMBERS_SUCCESS,
  PATCH_ORGANIZATION_MEMBER,
  PATCH_ORGANIZATION_MEMBER_FAILURE,
  PATCH_ORGANIZATION_MEMBER_SUCCESS,
  POST_ORGANIZATION_MEMBER,
  POST_ORGANIZATION_MEMBER_FAILURE,
  POST_ORGANIZATION_MEMBER_SUCCESS
} from './actions';
import organizationMembers from './reducer';
import {
  initialState,
  OrganizationMemberEntity,
  OrganizationMemberRole
} from './state';

const someMember: OrganizationMemberEntity = {
  id: 'some-id',
  username: 'some-username',
  role: OrganizationMemberRole.GAME_OPERATOR
};

describe('GET_ORGANIZATION_MEMBERS', () => {
  it('sets loading', () => {
    expect(
      organizationMembers(initialState, { type: GET_ORGANIZATION_MEMBERS })
        .isLoadingRequestOrganizationMembers
    ).toBe(true);
  });
});

describe('GET_ORGANIZATION_MEMBERS_FAILURE', () => {
  it('unsets loading', () => {
    expect(
      organizationMembers(
        { ...initialState, isLoadingRequestOrganizationMembers: true },
        { type: GET_ORGANIZATION_MEMBERS_FAILURE }
      ).isLoadingRequestOrganizationMembers
    ).toBe(false);
  });
});

describe('GET_ORGANIZATION_MEMBERS_SUCCESS', () => {
  const action = {
    type: GET_ORGANIZATION_MEMBERS_SUCCESS,
    payload: [someMember]
  };

  it('sets entities by id', () => {
    expect(
      organizationMembers(initialState, action).organizationMembers
    ).toEqual({
      'some-id': someMember
    });
  });

  it('unsets loading', () => {
    expect(
      organizationMembers(initialState, action)
        .isLoadingRequestOrganizationMembers
    ).toBe(false);
  });

  it('replaces previous entities', () => {
    const state = {
      ...initialState,
      organizationMembers: {
        'other-id': { ...someMember, id: 'other-id' }
      }
    };

    expect(organizationMembers(state, action).organizationMembers).toEqual({
      'some-id': someMember
    });
  });
});

describe('POST_ORGANIZATION_MEMBER', () => {
  it('sets loading', () => {
    expect(
      organizationMembers(initialState, { type: POST_ORGANIZATION_MEMBER })
        .isLoadingPostOrganizationMember
    ).toBe(true);
  });
});

describe('POST_ORGANIZATION_MEMBER_FAILURE', () => {
  it('unsets loading', () => {
    expect(
      organizationMembers(
        { ...initialState, isLoadingPostOrganizationMember: true },
        { type: POST_ORGANIZATION_MEMBER_FAILURE }
      ).isLoadingPostOrganizationMember
    ).toBe(false);
  });
});

describe('POST_ORGANIZATION_MEMBER_SUCCESS', () => {
  const action = {
    type: POST_ORGANIZATION_MEMBER_SUCCESS,
    payload: someMember
  };

  it('adds entity', () => {
    expect(
      organizationMembers(initialState, action).organizationMembers
    ).toEqual({
      'some-id': someMember
    });
  });

  it('unsets loading', () => {
    expect(
      organizationMembers(initialState, action).isLoadingPostOrganizationMember
    ).toBe(false);
  });
});

describe('PATCH_ORGANIZATION_MEMBER', () => {
  it('sets loading', () => {
    expect(
      organizationMembers(initialState, { type: PATCH_ORGANIZATION_MEMBER })
        .isLoadingPatchOrganizationMember
    ).toBe(true);
  });
});

describe('PATCH_ORGANIZATION_MEMBER_FAILURE', () => {
  it('unsets loading', () => {
    expect(
      organizationMembers(
        { ...initialState, isLoadingPatchOrganizationMember: true },
        { type: PATCH_ORGANIZATION_MEMBER_FAILURE }
      ).isLoadingPatchOrganizationMember
    ).toBe(false);
  });
});

describe('PATCH_ORGANIZATION_MEMBER_SUCCESS', () => {
  it('updates entity', () => {
    const state = {
      ...initialState,
      organizationMembers: { 'some-id': someMember }
    };
    const action = {
      type: PATCH_ORGANIZATION_MEMBER_SUCCESS,
      payload: { ...someMember, role: OrganizationMemberRole.OWNER }
    };

    expect(organizationMembers(state, action).organizationMembers).toEqual({
      'some-id': { ...someMember, role: OrganizationMemberRole.OWNER }
    });
  });
});

describe('DELETE_ORGANIZATION_MEMBER', () => {
  it('sets loading', () => {
    expect(
      organizationMembers(initialState, { type: DELETE_ORGANIZATION_MEMBER })
        .isLoadingDeleteOrganizationMember
    ).toBe(true);
  });
});

describe('DELETE_ORGANIZATION_MEMBER_FAILURE', () => {
  it('unsets loading', () => {
    expect(
      organizationMembers(
        { ...initialState, isLoadingDeleteOrganizationMember: true },
        { type: DELETE_ORGANIZATION_MEMBER_FAILURE }
      ).isLoadingDeleteOrganizationMember
    ).toBe(false);
  });
});

describe('DELETE_ORGANIZATION_MEMBER_SUCCESS', () => {
  it('removes entity', () => {
    const state = {
      ...initialState,
      organizationMembers: {
        'some-id': someMember,
        'other-id': { ...someMember, id: 'other-id' }
      }
    };
    const action = {
      type: DELETE_ORGANIZATION_MEMBER_SUCCESS,
      payload: 'some-id'
    };

    expect(organizationMembers(state, action).organizationMembers).toEqual({
      'other-id': { ...someMember, id: 'other-id' }
    });
  });
});
