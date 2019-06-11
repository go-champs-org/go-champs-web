import { HttpAction } from '../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import {
  ActionTypes,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
  PATCH_ORGANIZATION,
  PATCH_ORGANIZATION_FAILURE,
  PATCH_ORGANIZATION_SUCCESS,
  POST_ORGANIZATION,
  POST_ORGANIZATION_FAILURE,
  POST_ORGANIZATION_SUCCESS,
  REQUEST_ORGANIZATIONS,
  REQUEST_ORGANIZATIONS_FAILURE,
  REQUEST_ORGANIZATIONS_SUCCESS
} from './actions';
import {
  deleteOrganization,
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  patchOrganization,
  patchOrganizationFailure,
  patchOrganizationSuccess,
  postOrganization,
  postOrganizationFailure,
  postOrganizationSuccess,
  requestOrganization,
  requestOrganizationFailure,
  requestOrganizations,
  requestOrganizationsFailure,
  requestOrganizationsSuccess,
  requestOrganizationSuccess,
  requestTournament,
  requestTournamentFailure,
  requestTournamentSuccess
} from './reducer';
import { initialState, OrganizationState } from './state';

describe('deleteOrganization', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ORGANIZATION,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteOrganization to true', () => {
    expect(
      deleteOrganization(initialState, action).isLoadingDeleteOrganization
    ).toBe(true);
  });
});

describe('deleteOrganizationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ORGANIZATION_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteOrganization to false', () => {
    expect(
      deleteOrganizationFailure(initialState, action)
        .isLoadingDeleteOrganization
    ).toBe(false);
  });
});

describe('deleteOrganizationSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ORGANIZATION_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    organizations: {
      ['first-slug']: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingDeleteOrganization to false', () => {
    expect(
      deleteOrganizationSuccess(deleteState, action).isLoadingDeleteOrganization
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteOrganizationSuccess(deleteState, action);

    expect(newState.organizations['first-slug']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationState = {
      ...initialState,
      organizations: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        },
        ...deleteState.organizations
      }
    };

    const newState = deleteOrganizationSuccess(someState, action);

    expect(newState.organizations['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('patchOrganization', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_ORGANIZATION
  };

  it('sets isLoadingPatchOrganization to true', () => {
    expect(
      patchOrganization(initialState, action).isLoadingPatchOrganization
    ).toBe(true);
  });
});

describe('patchOrganizationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_ORGANIZATION_FAILURE
  };

  it('sets isLoadingPatchOrganization to false', () => {
    expect(
      patchOrganizationFailure(initialState, action).isLoadingPatchOrganization
    ).toBe(false);
  });
});

describe('patchOrganizationSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_ORGANIZATION_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        name: 'some-first-name',
        slug: 'first-slug'
      }
    }
  };

  const updateState: OrganizationState = {
    ...initialState,
    organizations: {
      ['first-slug']: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingPatchOrganization to false', () => {
    expect(
      patchOrganizationSuccess(updateState, action).isLoadingPatchOrganization
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = patchOrganizationSuccess(updateState, action);

    expect(newState.organizations['first-slug']).toEqual({
      id: 'first-id',
      name: 'some-first-name',
      slug: 'first-slug'
    });
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationState = {
      ...updateState,
      organizations: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = patchOrganizationSuccess(someState, action);

    expect(newState.organizations['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('postOrganization', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_ORGANIZATION
  };

  it('sets isLoadingPostOrganization to true', () => {
    expect(
      postOrganization(initialState, action).isLoadingPostOrganization
    ).toBe(true);
  });
});

describe('postOrganizationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_ORGANIZATION_FAILURE
  };

  it('sets isLoadingPostOrganization to false', () => {
    expect(
      postOrganizationFailure(initialState, action).isLoadingPostOrganization
    ).toBe(false);
  });
});

describe('postOrganizationSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_ORGANIZATION_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingPostOrganization to false', () => {
    expect(
      postOrganizationSuccess(initialState, action).isLoadingPostOrganization
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postOrganizationSuccess(initialState, action);

    expect(newState.organizations['first-slug']).toEqual({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    });
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationState = {
      ...initialState,
      organizations: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = postOrganizationSuccess(someState, action);

    expect(newState.organizations['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('requestOrganization', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS
  };

  it('sets isLoadingRequestOrganization to true', () => {
    expect(
      requestOrganization(initialState, action).isLoadingRequestOrganization
    ).toBe(true);
  });
});

describe('requestOrganizationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS_FAILURE
  };

  it('sets isLoadingRequestOrganization to false', () => {
    expect(
      requestOrganizationFailure(initialState, action)
        .isLoadingRequestOrganization
    ).toBe(false);
  });
});

describe('requestOrganizationSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingRequestOrganization to false', () => {
    expect(
      requestOrganizationSuccess(initialState, action)
        .isLoadingRequestOrganization
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestOrganizationSuccess(initialState, action);

    expect(newState.organizations['first-slug']).toEqual({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    });
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationState = {
      ...initialState,
      organizations: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = requestOrganizationSuccess(someState, action);

    expect(newState.organizations['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('requestOrganizations', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS
  };

  it('sets isLoadingRequestOrganizations to true', () => {
    expect(
      requestOrganizations(initialState, action).isLoadingRequestOrganizations
    ).toBe(true);
  });
});

describe('requestOrganizationsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS_FAILURE
  };

  it('sets isLoadingRequestOrganizations to false', () => {
    expect(
      requestOrganizationsFailure(initialState, action)
        .isLoadingRequestOrganizations
    ).toBe(false);
  });
});

describe('requestOrganizationsSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_ORGANIZATIONS_SUCCESS,
    payload: {
      data: [
        {
          id: 'first-id',
          name: 'first-name',
          slug: 'first-slug'
        },
        {
          id: 'second-id',
          name: 'second-name',
          slug: 'second-slug'
        }
      ]
    }
  };

  it('sets isLoadingRequestOrganizations to false', () => {
    expect(
      requestOrganizationsSuccess(initialState, action)
        .isLoadingRequestOrganizations
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestOrganizationsSuccess(initialState, action);

    expect(newState.organizations['first-slug']).toEqual({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    });
    expect(newState.organizations['second-slug']).toEqual({
      id: 'second-id',
      name: 'second-name',
      slug: 'second-slug'
    });
  });
});

describe('requestTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT
  };

  it('sets isLoadingRequestOrganization to true', () => {
    expect(
      requestTournament(initialState, action).isLoadingRequestOrganization
    ).toBe(true);
  });
});

describe('requestTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestOrganization to false', () => {
    expect(
      requestTournamentFailure(initialState, action)
        .isLoadingRequestOrganization
    ).toBe(false);
  });
});

describe('requestTournamentSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload: {
      data: {
        id: 'some-tournament-id',
        organization: {
          id: 'first-id',
          name: 'first-name',
          slug: 'first-slug'
        }
      }
    }
  };

  it('sets isLoadingRequestOrganization to false', () => {
    expect(
      requestTournamentSuccess(initialState, action)
        .isLoadingRequestOrganization
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentSuccess(initialState, action);

    expect(newState.organizations['first-slug']).toEqual({
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    });
  });
});
