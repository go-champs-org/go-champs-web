import { getTournamentSuccess } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  deleteOrganizationFailure,
  deleteOrganizationStart,
  deleteOrganizationSuccess,
  getOrganizationFailure,
  getOrganizationsFailure,
  getOrganizationsStart,
  getOrganizationsSuccess,
  getOrganizationStart,
  getOrganizationSuccess,
  patchOrganizationFailure,
  patchOrganizationStart,
  patchOrganizationSuccess,
  postOrganizationFailure,
  postOrganizationStart,
  postOrganizationSuccess
} from './actions';
import organizationReducer from './reducer';
import { initialState, OrganizationState } from './state';
import { getAccountSuccess } from '../Accounts/actions';

describe('organizationReducer', () => {
  describe('deleteOrganization', () => {
    const action = deleteOrganizationStart();

    it('sets isLoadingDeleteOrganization to true', () => {
      expect(
        organizationReducer(initialState, action).isLoadingDeleteOrganization
      ).toBe(true);
    });
  });

  describe('deleteOrganizationFailure', () => {
    const action = deleteOrganizationFailure('error');

    it('sets isLoadingDeleteOrganization to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingDeleteOrganization
      ).toBe(false);
    });
  });

  describe('deleteOrganizationSuccess', () => {
    const action = deleteOrganizationSuccess('first-id');

    const deleteState = {
      ...initialState,
      organizations: {
        ['first-slug']: {
          id: 'first-id',
          name: 'first-name',
          slug: 'first-slug',
          logoUrl: 'first-logo-url',
          members: []
        }
      }
    };

    it('sets isLoadingDeleteOrganization to false', () => {
      expect(
        organizationReducer(deleteState, action).isLoadingDeleteOrganization
      ).toBe(false);
    });

    it('remove entity', () => {
      const newState = organizationReducer(deleteState, action);

      expect(newState.organizations['first-slug']).toBeUndefined();
    });

    it('keeps others entities in other', () => {
      const someState: OrganizationState = {
        ...initialState,
        organizations: {
          ['some-slug']: {
            id: 'some-id',
            name: 'some-name',
            slug: 'some-slug',
            logoUrl: 'some-logo-url',
            members: []
          },
          ...deleteState.organizations
        }
      };

      const newState = organizationReducer(someState, action);

      expect(newState.organizations['some-slug']).toEqual({
        id: 'some-id',
        name: 'some-name',
        slug: 'some-slug',
        logoUrl: 'some-logo-url',
        members: []
      });
    });
  });

  describe('patchOrganization', () => {
    const action = patchOrganizationStart();

    it('sets isLoadingPatchOrganization to true', () => {
      expect(
        organizationReducer(initialState, action).isLoadingPatchOrganization
      ).toBe(true);
    });
  });

  describe('patchOrganizationFailure', () => {
    const action = patchOrganizationFailure('error');

    it('sets isLoadingPatchOrganization to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingPatchOrganization
      ).toBe(false);
    });
  });

  describe('patchOrganizationSuccess', () => {
    const action = patchOrganizationSuccess({
      id: 'first-id',
      name: 'some-first-name',
      slug: 'first-slug',
      logo_url: 'some-logo-url',
      members: [{ username: 'some-username' }]
    });

    const updateState: OrganizationState = {
      ...initialState,
      organizations: {
        ['first-slug']: {
          id: 'first-id',
          name: 'first-name',
          slug: 'first-slug',
          logoUrl: 'first-logo-url',
          members: [{ username: 'first-username' }]
        }
      }
    };

    it('sets isLoadingPatchOrganization to false', () => {
      expect(
        organizationReducer(updateState, action).isLoadingPatchOrganization
      ).toBe(false);
    });

    it('set entity', () => {
      const newState = organizationReducer(updateState, action);

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'some-first-name',
        slug: 'first-slug',
        logoUrl: 'some-logo-url',
        members: [{ username: 'some-username' }]
      });
    });

    it('keeps others entities in other', () => {
      const someState: OrganizationState = {
        ...updateState,
        organizations: {
          ['some-slug']: {
            id: 'some-id',
            name: 'some-name',
            slug: 'some-slug',
            logoUrl: 'some-logo-url',
            members: [{ username: 'some-username' }]
          }
        }
      };

      const newState = organizationReducer(someState, action);

      expect(newState.organizations['some-slug']).toEqual({
        id: 'some-id',
        name: 'some-name',
        slug: 'some-slug',
        logoUrl: 'some-logo-url',
        members: [{ username: 'some-username' }]
      });
    });
  });

  describe('postOrganization', () => {
    const action = postOrganizationStart();

    it('sets isLoadingPostOrganization to true', () => {
      expect(
        organizationReducer(initialState, action).isLoadingPostOrganization
      ).toBe(true);
    });
  });

  describe('postOrganizationFailure', () => {
    const action = postOrganizationFailure('error');

    it('sets isLoadingPostOrganization to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingPostOrganization
      ).toBe(false);
    });
  });

  describe('postOrganizationSuccess', () => {
    const action = postOrganizationSuccess({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      logo_url: 'first-logo-url',
      members: [{ username: 'first-username' }]
    });

    it('sets isLoadingPostOrganization to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingPostOrganization
      ).toBe(false);
    });

    it('set entity', () => {
      const newState = organizationReducer(initialState, action);

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logoUrl: 'first-logo-url',
        members: [{ username: 'first-username' }]
      });
    });

    it('keeps others entities in other', () => {
      const someState: OrganizationState = {
        ...initialState,
        organizations: {
          ['some-slug']: {
            id: 'some-id',
            name: 'some-name',
            slug: 'some-slug',
            logoUrl: 'some-logo-url',
            members: [{ username: 'some-username' }]
          }
        }
      };

      const newState = organizationReducer(someState, action);

      expect(newState.organizations['some-slug']).toEqual({
        id: 'some-id',
        name: 'some-name',
        slug: 'some-slug',
        logoUrl: 'some-logo-url',
        members: [{ username: 'some-username' }]
      });
    });
  });

  describe('on getAccountSuccess', () => {
    it('sets entities', () => {
      const newState = organizationReducer(
        initialState,
        getAccountSuccess({
          data: {
            email: 'some email',
            username: 'someusername',
            organizations: [
              {
                id: 'first-id',
                name: 'first-name',
                slug: 'first-slug',
                logo_url: 'first-logo-url',
                members: [{ username: 'first-username' }]
              },
              {
                id: 'second-id',
                name: 'second-name',
                slug: 'second-slug',
                logo_url: 'second-logo-url',
                members: [{ username: 'second-username' }]
              }
            ]
          }
        })
      );

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logoUrl: 'first-logo-url',
        members: [{ username: 'first-username' }]
      });
      expect(newState.organizations['second-slug']).toEqual({
        id: 'second-id',
        name: 'second-name',
        slug: 'second-slug',
        logoUrl: 'second-logo-url',
        members: [{ username: 'second-username' }]
      });
    });
  });

  describe('getOrganization', () => {
    const action = getOrganizationStart();

    it('sets isLoadingRequestOrganizations to true', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(true);
    });
  });

  describe('getOrganizationFailure', () => {
    const action = getOrganizationFailure('error');

    it('sets isLoadingRequestOrganizations to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(false);
    });
  });

  describe('getOrganizationSuccess', () => {
    const action = getOrganizationSuccess({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      logo_url: 'first-logo-url',
      members: [{ username: 'first-username' }]
    });

    it('sets isLoadingRequestOrganizations to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(false);
    });

    it('sets entities', () => {
      const newState = organizationReducer(initialState, action);

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logoUrl: 'first-logo-url',
        members: [{ username: 'first-username' }]
      });
    });

    it('keeps others entities in other', () => {
      const someState: OrganizationState = {
        ...initialState,
        organizations: {
          ['some-slug']: {
            id: 'some-id',
            name: 'some-name',
            slug: 'some-slug',
            logoUrl: 'some-logo-url',
            members: [{ username: 'some-username' }]
          }
        }
      };

      const newState = organizationReducer(someState, action);

      expect(newState.organizations['some-slug']).toEqual({
        id: 'some-id',
        name: 'some-name',
        slug: 'some-slug',
        logoUrl: 'some-logo-url',
        members: [{ username: 'some-username' }]
      });
    });
  });

  describe('getOrganizations', () => {
    const action = getOrganizationsStart();

    it('sets isLoadingRequestOrganizations to true', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(true);
    });
  });

  describe('getOrganizationsFailure', () => {
    const action = getOrganizationsFailure('error');

    it('sets isLoadingRequestOrganizations to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(false);
    });
  });

  describe('getOrganizationsSuccess', () => {
    const action = getOrganizationsSuccess([
      {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logo_url: 'first-logo-url',
        members: [{ username: 'first-username' }]
      },
      {
        id: 'second-id',
        name: 'second-name',
        slug: 'second-slug',
        logo_url: 'second-logo-url',
        members: [{ username: 'second-username' }]
      }
    ]);

    it('sets isLoadingRequestOrganizations to false', () => {
      expect(
        organizationReducer(initialState, action).isLoadingRequestOrganizations
      ).toBe(false);
    });

    it('sets entities', () => {
      const newState = organizationReducer(initialState, action);

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logoUrl: 'first-logo-url',
        members: [{ username: 'first-username' }]
      });
      expect(newState.organizations['second-slug']).toEqual({
        id: 'second-id',
        name: 'second-name',
        slug: 'second-slug',
        logoUrl: 'second-logo-url',
        members: [{ username: 'second-username' }]
      });
    });
  });

  describe('getTournamentSuccess', () => {
    const action = getTournamentSuccess({
      ...DEFAULT_TOURNAMENT,
      id: 'some-tournament-id',
      organization: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logo_url: 'first-logo-url',
        members: [{ username: 'first-username' }]
      },
      phases: [],
      teams: []
    });

    it('sets entities', () => {
      const newState = organizationReducer(initialState, action);

      expect(newState.organizations['first-slug']).toEqual({
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        logoUrl: 'first-logo-url',
        members: [{ username: 'first-username' }]
      });
    });
  });
});
