import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  ActionTypes,
  deleteScoreboardSettingFailure,
  deleteScoreboardSettingStart,
  deleteScoreboardSettingSuccess,
  patchScoreboardSettingFailure,
  patchScoreboardSettingStart,
  patchScoreboardSettingSuccess,
  postScoreboardSettingFailure,
  postScoreboardSettingStart,
  postScoreboardSettingSuccess
} from './actions';
import scoreboardSettingReducer from './reducer';
import {
  initialState,
  ScoreboardSettingState,
  ScoreboardSettingLiveSiteUpdate,
  ScoreboardSettingView
} from './state';

describe('deleteScoreboardSetting', () => {
  const action = deleteScoreboardSettingStart();

  it('sets isLoadingDeleteScoreboardSetting to true', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingDeleteScoreboardSetting
    ).toBe(true);
  });
});

describe('deleteScoreboardSettingFailure', () => {
  const action = deleteScoreboardSettingFailure('error');

  it('sets isLoadingDeleteScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingDeleteScoreboardSetting
    ).toBe(false);
  });
});

describe('deleteScoreboardSettingSuccess', () => {
  const action = deleteScoreboardSettingSuccess('first-id');

  const deleteState = {
    ...initialState,
    scoreboardSettings: {
      'first-id': {
        id: 'first-id',
        view: ScoreboardSettingView.BASKETBALL_MEDIUM,
        initialPeriodTime: 0,
        initialExtraPeriodTime: 0,
        liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE
      }
    }
  };

  it('sets isLoadingDeleteScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(deleteState, action)
        .isLoadingDeleteScoreboardSetting
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = scoreboardSettingReducer(deleteState, action);

    expect(newState.scoreboardSettings['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: ScoreboardSettingState = {
      ...initialState,
      scoreboardSettings: {
        'some-id': {
          id: 'some-id',
          view: ScoreboardSettingView.BASKETBALL_BASIC,
          initialPeriodTime: 100,
          initialExtraPeriodTime: 100,
          liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE
        },
        ...deleteState.scoreboardSettings
      }
    };

    const newState = scoreboardSettingReducer(someState, action);

    expect(newState.scoreboardSettings['some-id']).toEqual({
      id: 'some-id',
      view: 'basketball-basic' as const,
      initialPeriodTime: 100,
      initialExtraPeriodTime: 100,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE
    });
  });
});

describe('patchScoreboardSetting', () => {
  const action = patchScoreboardSettingStart();

  it('sets isLoadingPatchScoreboardSetting to true', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingPatchScoreboardSetting
    ).toBe(true);
  });
});

describe('patchScoreboardSettingFailure', () => {
  const action = patchScoreboardSettingFailure('error');

  it('sets isLoadingPatchScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingPatchScoreboardSetting
    ).toBe(false);
  });
});

describe('patchScoreboardSettingSuccess', () => {
  const action = patchScoreboardSettingSuccess({
    id: 'first-id',
    view: ScoreboardSettingView.BASKETBALL_MEDIUM,
    initialPeriodTime: 0,
    initialExtraPeriodTime: 0,
    liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE
  });

  const updateState: ScoreboardSettingState = {
    ...initialState,
    scoreboardSettings: {
      'first-id': {
        id: 'first-id',
        view: ScoreboardSettingView.BASKETBALL_BASIC,
        initialPeriodTime: 100,
        initialExtraPeriodTime: 100,
        liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE
      }
    }
  };

  it('sets isLoadingPatchScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(updateState, action)
        .isLoadingPatchScoreboardSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = scoreboardSettingReducer(updateState, action);

    expect(newState.scoreboardSettings['first-id']).toEqual({
      id: 'first-id',
      view: 'basketball-medium' as const,
      initialPeriodTime: 0,
      initialExtraPeriodTime: 0,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE
    });
  });

  it('keeps others entities in other', () => {
    const someState: ScoreboardSettingState = {
      ...updateState,
      scoreboardSettings: {
        'some-id': {
          id: 'some-id',
          view: 'basketball-medium' as const,
          initialPeriodTime: 150,
          initialExtraPeriodTime: 150,
          liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE
        }
      }
    };

    const newState = scoreboardSettingReducer(someState, action);

    expect(newState.scoreboardSettings['some-id']).toEqual({
      id: 'some-id',
      view: 'basketball-medium' as const,
      initialPeriodTime: 150,
      initialExtraPeriodTime: 150,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE
    });
  });
});

describe('postScoreboardSetting', () => {
  const action = postScoreboardSettingStart();

  it('sets isLoadingPostScoreboardSetting to true', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingPostScoreboardSetting
    ).toBe(true);
  });
});

describe('postScoreboardSettingFailure', () => {
  const action = postScoreboardSettingFailure('error');

  it('sets isLoadingPostScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingPostScoreboardSetting
    ).toBe(false);
  });
});

describe('postScoreboardSettingSuccess', () => {
  const action = postScoreboardSettingSuccess({
    id: 'first-id',
    view: 'basketball-medium' as const,
    initialPeriodTime: 150,
    initialExtraPeriodTime: 150,
    liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE
  });

  it('sets isLoadingPostScoreboardSetting to false', () => {
    expect(
      scoreboardSettingReducer(initialState, action)
        .isLoadingPostScoreboardSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = scoreboardSettingReducer(initialState, action);

    expect(newState.scoreboardSettings['first-id']).toEqual({
      id: 'first-id',
      view: 'basketball-medium' as const,
      initialPeriodTime: 150,
      initialExtraPeriodTime: 150,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE
    });
  });

  it('keeps others entities in other', () => {
    const someState: ScoreboardSettingState = {
      ...initialState,
      scoreboardSettings: {
        'some-id': {
          id: 'some-id',
          view: 'basketball-basic' as const,
          initialPeriodTime: 100,
          initialExtraPeriodTime: 100,
          liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE
        }
      }
    };

    const newState = scoreboardSettingReducer(someState, action);

    expect(newState.scoreboardSettings['some-id']).toEqual({
      id: 'some-id',
      view: 'basketball-basic' as const,
      initialPeriodTime: 100,
      initialExtraPeriodTime: 100,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE
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
      players: [],
      registrations: [],
      scoreboard_setting: {
        id: 'first-scoreboard-setting-id',
        view: 'basketball-medium',
        initial_period_time: 0,
        initial_extra_period_time: 0,
        live_site_update: 'no-live-update'
      },
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    }
  };

  it('sets entities', () => {
    const newState = scoreboardSettingReducer(initialState, action);

    expect(newState.scoreboardSettings['first-scoreboard-setting-id']).toEqual({
      id: 'first-scoreboard-setting-id',
      view: 'basketball-medium' as const,
      initialPeriodTime: 0,
      initialExtraPeriodTime: 0,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE
    });
  });

  it('does not break is null scoreboardSettings', () => {
    const emptyResponseAction: HttpAction<
      ActionTypes,
      ApiTournamentWithDependecies
    > = {
      type: GET_TOURNAMENT_SUCCESS,
      payload: (DEFAULT_TOURNAMENT as unknown) as ApiTournamentWithDependecies
    };
    const newState = scoreboardSettingReducer(
      initialState,
      emptyResponseAction
    );

    expect(newState).toEqual(initialState);
  });
});
