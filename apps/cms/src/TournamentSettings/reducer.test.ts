import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  ActionTypes,
  applyNameFormatFailure,
  applyNameFormatStart,
  applyNameFormatSuccess,
  deleteTournamentSettingFailure,
  deleteTournamentSettingStart,
  deleteTournamentSettingSuccess,
  patchTournamentSettingFailure,
  patchTournamentSettingStart,
  patchTournamentSettingSuccess,
  postTournamentSettingFailure,
  postTournamentSettingStart,
  postTournamentSettingSuccess
} from './actions';
import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import tournamentSettingReducer from './reducer';
import { initialState, TournamentSettingState } from './state';

describe('applyNameFormat', () => {
  const action = applyNameFormatStart();

  it('sets isLoadingApplyNameFormat to true', () => {
    expect(
      tournamentSettingReducer(initialState, action).isLoadingApplyNameFormat
    ).toBe(true);
  });
});

describe('applyNameFormatFailure', () => {
  const action = applyNameFormatFailure('error');

  it('sets isLoadingApplyNameFormat to false', () => {
    expect(
      tournamentSettingReducer(initialState, action).isLoadingApplyNameFormat
    ).toBe(false);
  });
});

describe('applyNameFormatSuccess', () => {
  const action = applyNameFormatSuccess({
    players_updated: 3,
    teams_updated: 2
  });

  it('sets isLoadingApplyNameFormat to false', () => {
    expect(
      tournamentSettingReducer(
        { ...initialState, isLoadingApplyNameFormat: true },
        action
      ).isLoadingApplyNameFormat
    ).toBe(false);
  });
});

describe('deleteTournamentSetting', () => {
  const action = deleteTournamentSettingStart();

  it('sets isLoadingDeleteTournamentSetting to true', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingDeleteTournamentSetting
    ).toBe(true);
  });
});

describe('deleteTournamentSettingFailure', () => {
  const action = deleteTournamentSettingFailure('error');

  it('sets isLoadingDeleteTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingDeleteTournamentSetting
    ).toBe(false);
  });
});

describe('deleteTournamentSettingSuccess', () => {
  const action = deleteTournamentSettingSuccess('first-id');

  const deleteState = {
    ...initialState,
    tournamentSettings: {
      'first-id': {
        id: 'first-id',
        nameFormat: NameFormat.FULL,
        nameCase: NameCase.ORIGINAL
      }
    }
  };

  it('sets isLoadingDeleteTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(deleteState, action)
        .isLoadingDeleteTournamentSetting
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = tournamentSettingReducer(deleteState, action);

    expect(newState.tournamentSettings['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentSettingState = {
      ...initialState,
      tournamentSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        },
        ...deleteState.tournamentSettings
      }
    };

    const newState = tournamentSettingReducer(someState, action);

    expect(newState.tournamentSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('patchTournamentSetting', () => {
  const action = patchTournamentSettingStart();

  it('sets isLoadingPatchTournamentSetting to true', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingPatchTournamentSetting
    ).toBe(true);
  });
});

describe('patchTournamentSettingFailure', () => {
  const action = patchTournamentSettingFailure('error');

  it('sets isLoadingPatchTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingPatchTournamentSetting
    ).toBe(false);
  });
});

describe('patchTournamentSettingSuccess', () => {
  const action = patchTournamentSettingSuccess({
    id: 'first-id',
    nameFormat: NameFormat.FULL,
    nameCase: NameCase.ORIGINAL
  });

  const updateState: TournamentSettingState = {
    ...initialState,
    tournamentSettings: {
      'first-id': {
        id: 'first-id',
        nameFormat: NameFormat.FIRST_LAST,
        nameCase: NameCase.UPPER
      }
    }
  };

  it('sets isLoadingPatchTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(updateState, action)
        .isLoadingPatchTournamentSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = tournamentSettingReducer(updateState, action);

    expect(newState.tournamentSettings['first-id']).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentSettingState = {
      ...updateState,
      tournamentSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        }
      }
    };

    const newState = tournamentSettingReducer(someState, action);

    expect(newState.tournamentSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('postTournamentSetting', () => {
  const action = postTournamentSettingStart();

  it('sets isLoadingPostTournamentSetting to true', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingPostTournamentSetting
    ).toBe(true);
  });
});

describe('postTournamentSettingFailure', () => {
  const action = postTournamentSettingFailure('error');

  it('sets isLoadingPostTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingPostTournamentSetting
    ).toBe(false);
  });
});

describe('postTournamentSettingSuccess', () => {
  const action = postTournamentSettingSuccess({
    id: 'first-id',
    nameFormat: NameFormat.FIRST_LAST,
    nameCase: NameCase.UPPER
  });

  it('sets isLoadingPostTournamentSetting to false', () => {
    expect(
      tournamentSettingReducer(initialState, action)
        .isLoadingPostTournamentSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = tournamentSettingReducer(initialState, action);

    expect(newState.tournamentSettings['first-id']).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentSettingState = {
      ...initialState,
      tournamentSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        }
      }
    };

    const newState = tournamentSettingReducer(someState, action);

    expect(newState.tournamentSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    });
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, ApiTournamentWithDependecies> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: ({
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      teams: [],
      players: [],
      registrations: [],
      tournament_setting: {
        id: 'first-tournament-setting-id',
        name_format: 'first_last',
        name_case: 'upper'
      },
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    } as unknown) as ApiTournamentWithDependecies
  };

  it('sets entities', () => {
    const newState = tournamentSettingReducer(initialState, action);

    expect(newState.tournamentSettings['first-tournament-setting-id']).toEqual({
      id: 'first-tournament-setting-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('does not break if null tournamentSettings', () => {
    const emptyResponseAction: HttpAction<
      ActionTypes,
      ApiTournamentWithDependecies
    > = {
      type: GET_TOURNAMENT_SUCCESS,
      payload: (DEFAULT_TOURNAMENT as unknown) as ApiTournamentWithDependecies
    };
    const newState = tournamentSettingReducer(
      initialState,
      emptyResponseAction
    );

    expect(newState).toEqual(initialState);
  });
});
