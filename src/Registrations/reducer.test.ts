import {
  ApiRegistration,
  ApiRegistrationType,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  ActionTypes,
  deleteRegistrationFailure,
  deleteRegistrationStart,
  deleteRegistrationSuccess,
  patchRegistrationFailure,
  patchRegistrationStart,
  patchRegistrationSuccess,
  postRegistrationFailure,
  postRegistrationStart,
  postRegistrationSuccess
} from './actions';
import registrationReducer from './reducer';
import { initialState, RegistrationState } from './state';

describe('deleteRegistration', () => {
  const action = deleteRegistrationStart();

  it('sets isLoadingDeleteRegistration to true', () => {
    expect(
      registrationReducer(initialState, action).isLoadingDeleteRegistration
    ).toBe(true);
  });
});

describe('deleteRegistrationFailure', () => {
  const action = deleteRegistrationFailure('error');

  it('sets isLoadingDeleteRegistration to false', () => {
    expect(
      registrationReducer(initialState, action).isLoadingDeleteRegistration
    ).toBe(false);
  });
});

describe('deleteRegistrationSuccess', () => {
  const action = deleteRegistrationSuccess('first-id');

  const deleteState = {
    ...initialState,
    registrations: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        startDate: 'first-start-date',
        endDate: 'first-end-date',
        type: 'team_roster_invites' as ApiRegistrationType,
        autoApprove: false,
        customFields: []
      }
    }
  };

  it('sets isLoadingDeleteRegistration to false', () => {
    expect(
      registrationReducer(deleteState, action).isLoadingDeleteRegistration
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = registrationReducer(deleteState, action);

    expect(newState.registrations['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: RegistrationState = {
      ...initialState,
      registrations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          startDate: 'some-start-date',
          endDate: 'some-end-date',
          type: 'team_roster_invites' as ApiRegistrationType,
          autoApprove: false,
          customFields: []
        },
        ...deleteState.registrations
      }
    };

    const newState = registrationReducer(someState, action);

    expect(newState.registrations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      startDate: 'some-start-date',
      endDate: 'some-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: []
    });
  });
});

describe('patchRegistration', () => {
  const action = patchRegistrationStart();

  it('sets isLoadingPatchRegistration to true', () => {
    expect(
      registrationReducer(initialState, action).isLoadingPatchRegistration
    ).toBe(true);
  });
});

describe('patchRegistrationFailure', () => {
  const action = patchRegistrationFailure('error');

  it('sets isLoadingPatchRegistration to false', () => {
    expect(
      registrationReducer(initialState, action).isLoadingPatchRegistration
    ).toBe(false);
  });
});

describe('patchRegistrationSuccess', () => {
  const action = patchRegistrationSuccess({
    id: 'first-id',
    title: 'first-updated-title',
    startDate: 'first-updated-start-date',
    endDate: 'first-updated-end-date',
    type: 'team_roster_invites' as ApiRegistrationType,
    autoApprove: false,
    customFields: []
  });

  const updateState: RegistrationState = {
    ...initialState,
    registrations: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        startDate: 'first-start-date',
        endDate: 'first-end-date',
        type: 'team_roster_invites' as ApiRegistrationType,
        autoApprove: false,
        customFields: []
      }
    }
  };

  it('sets isLoadingPatchRegistration to false', () => {
    expect(
      registrationReducer(updateState, action).isLoadingPatchRegistration
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = registrationReducer(updateState, action);

    expect(newState.registrations['first-id']).toEqual({
      id: 'first-id',
      title: 'first-updated-title',
      startDate: 'first-updated-start-date',
      endDate: 'first-updated-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: RegistrationState = {
      ...updateState,
      registrations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          startDate: 'some-start-date',
          endDate: 'some-end-date',
          type: 'team_roster_invites' as ApiRegistrationType,
          autoApprove: false,
          customFields: []
        }
      }
    };

    const newState = registrationReducer(someState, action);

    expect(newState.registrations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      startDate: 'some-start-date',
      endDate: 'some-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: []
    });
  });
});

describe('postRegistration', () => {
  const action = postRegistrationStart();

  it('sets isLoadingPostRegistration to true', () => {
    expect(
      registrationReducer(initialState, action).isLoadingPostRegistration
    ).toBe(true);
  });
});

describe('postRegistrationFailure', () => {
  const action = postRegistrationFailure('error');

  it('sets isLoadingPostRegistration to false', () => {
    expect(
      registrationReducer(initialState, action).isLoadingPostRegistration
    ).toBe(false);
  });
});

describe('postRegistrationSuccess', () => {
  const action = postRegistrationSuccess({
    id: 'first-id',
    title: 'first-title',
    start_date: 'first-start-date',
    end_date: 'first-end-date',
    type: 'team_roster_invites' as ApiRegistrationType,
    auto_approve: false,
    custom_fields: []
  });

  it('sets isLoadingPostRegistration to false', () => {
    expect(
      registrationReducer(initialState, action).isLoadingPostRegistration
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = registrationReducer(initialState, action);

    expect(newState.registrations['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      startDate: 'first-start-date',
      endDate: 'first-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: [],
      registrationInvites: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: RegistrationState = {
      ...initialState,
      registrations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          startDate: 'some-start-date',
          endDate: 'some-end-date',
          type: 'team_roster_invites' as ApiRegistrationType,
          autoApprove: false,
          customFields: [],
          registrationInvites: []
        }
      }
    };

    const newState = registrationReducer(someState, action);

    expect(newState.registrations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      startDate: 'some-start-date',
      endDate: 'some-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: [],
      registrationInvites: []
    });
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, ApiTournamentWithDependecies> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      teams: [],
      visibility: 'public',
      players: [],
      registrations: [
        {
          id: 'first-registration-id',
          title: 'first-registration-title',
          start_date: 'first-registration-start-date',
          end_date: 'first-registration-end-date',
          type: 'team_roster_invites' as ApiRegistrationType,
          auto_approve: false,
          custom_fields: []
        },
        {
          id: 'second-registration-id',
          title: 'second-registration-title',
          start_date: 'second-registration-start-date',
          end_date: 'second-registration-end-date',
          type: 'team_roster_invites' as ApiRegistrationType,
          auto_approve: false,
          custom_fields: []
        }
      ],
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    }
  };

  it('sets entities', () => {
    const newState = registrationReducer(initialState, action);

    expect(newState.registrations['first-registration-id']).toEqual({
      id: 'first-registration-id',
      title: 'first-registration-title',
      startDate: 'first-registration-start-date',
      endDate: 'first-registration-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: [],
      registrationInvites: []
    });
    expect(newState.registrations['second-registration-id']).toEqual({
      id: 'second-registration-id',
      title: 'second-registration-title',
      startDate: 'second-registration-start-date',
      endDate: 'second-registration-end-date',
      type: 'team_roster_invites' as ApiRegistrationType,
      autoApprove: false,
      customFields: [],
      registrationInvites: []
    });
  });

  it('does not break is null registrations', () => {
    const emptyResponseAction: HttpAction<
      ActionTypes,
      ApiTournamentWithDependecies
    > = {
      type: GET_TOURNAMENT_SUCCESS,
      payload: (DEFAULT_TOURNAMENT as unknown) as ApiTournamentWithDependecies
    };
    const newState = registrationReducer(initialState, emptyResponseAction);

    expect(newState).toEqual(initialState);
  });
});
