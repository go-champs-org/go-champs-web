import {
  isAddingOrganizationMember,
  organizationMembers,
  organizationMembersLoading
} from './selectors';
import { initialState, OrganizationMemberRole } from './state';

describe('organizationMembers', () => {
  it('returns entities as array', () => {
    const state = {
      ...initialState,
      organizationMembers: {
        'some-id': {
          id: 'some-id',
          username: 'some-username',
          role: OrganizationMemberRole.GAME_OPERATOR
        }
      }
    };

    expect(organizationMembers(state)).toEqual([
      {
        id: 'some-id',
        username: 'some-username',
        role: OrganizationMemberRole.GAME_OPERATOR
      }
    ]);
  });

  it('returns empty array', () => {
    expect(organizationMembers(initialState)).toEqual([]);
  });
});

describe('organizationMembersLoading', () => {
  it('returns loading state', () => {
    expect(
      organizationMembersLoading({
        ...initialState,
        isLoadingRequestOrganizationMembers: true
      })
    ).toBe(true);
  });
});

describe('isAddingOrganizationMember', () => {
  it('returns post loading state', () => {
    expect(
      isAddingOrganizationMember({
        ...initialState,
        isLoadingPostOrganizationMember: true
      })
    ).toBe(true);
  });
});
