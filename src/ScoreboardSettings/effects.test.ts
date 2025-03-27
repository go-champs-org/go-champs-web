import {
  postScoreboardSetting,
  patchScoreboardSetting,
  deleteScoreboardSetting
} from './effects';
import { DEFAULT_SCOREBOARD_SETTING } from './state';
import {
  postScoreboardSettingStart,
  postScoreboardSettingSuccess,
  postScoreboardSettingFailure,
  patchScoreboardSettingStart,
  patchScoreboardSettingSuccess,
  patchScoreboardSettingFailure,
  deleteScoreboardSettingStart,
  deleteScoreboardSettingSuccess,
  deleteScoreboardSettingFailure
} from './actions';
import scoreboardsSettingHttpClient from './scoreboardSettingsHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deleteScoreboardSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteScoreboardSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(scoreboardsSettingHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deleteScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteScoreboardSettingSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(scoreboardsSettingHttpClient, 'delete')
        .mockRejectedValue(apiError);

      deleteScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deleteScoreboardSettingFailure(apiError)
      );
    });
  });
});

describe('patchScoreboardSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchScoreboardSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(scoreboardsSettingHttpClient, 'patch').mockResolvedValue({
        id: 'patched-id',
        view: 'basketball-medium',
        initialPeriodTime: 0
      });

      patchScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchScoreboardSettingSuccess({
          id: 'patched-id',
          view: 'basketball-medium',
          initialPeriodTime: 0
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Scoreboard settings updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(scoreboardsSettingHttpClient, 'patch')
        .mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchScoreboardSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await patchScoreboardSetting(DEFAULT_SCOREBOARD_SETTING)(
        dispatch
      );

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});

describe('postScoreboardSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postScoreboardSetting(
      DEFAULT_SCOREBOARD_SETTING,
      'tournament-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postScoreboardSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(scoreboardsSettingHttpClient, 'post').mockResolvedValue({
        id: 'posted-id',
        view: 'basketball-medium',
        initialPeriodTime: 100
      });

      postScoreboardSetting(
        DEFAULT_SCOREBOARD_SETTING,
        'tournament-id'
      )(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postScoreboardSettingSuccess({
          id: 'posted-id',
          view: 'basketball-medium',
          initialPeriodTime: 100
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Scoreboard settings created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(scoreboardsSettingHttpClient, 'post')
        .mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postScoreboardSetting(
        DEFAULT_SCOREBOARD_SETTING,
        'tournament-id'
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        postScoreboardSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await postScoreboardSetting(
        DEFAULT_SCOREBOARD_SETTING,
        'tournament-id'
      )(dispatch);

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});
