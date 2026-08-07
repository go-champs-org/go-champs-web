import {
  applyNameFormat,
  postTournamentSetting,
  patchTournamentSetting,
  deleteTournamentSetting
} from './effects';
import { DEFAULT_TOURNAMENT_SETTING, TournamentSettingEntity } from './state';
import {
  applyNameFormatStart,
  applyNameFormatSuccess,
  applyNameFormatFailure,
  postTournamentSettingStart,
  postTournamentSettingSuccess,
  postTournamentSettingFailure,
  patchTournamentSettingStart,
  patchTournamentSettingSuccess,
  patchTournamentSettingFailure,
  deleteTournamentSettingStart,
  deleteTournamentSettingSuccess,
  deleteTournamentSettingFailure
} from './actions';
import tournamentSettingsHttpClient from './tournamentSettingsHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import i18n from 'i18next';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('applyNameFormat', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start action', () => {
    applyNameFormat('tournament-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(applyNameFormatStart());
  });

  describe('on success', () => {
    beforeEach(async () => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(tournamentSettingsHttpClient, 'applyNameFormat')
        .mockResolvedValue({ players_updated: 3, teams_updated: 2 });

      await applyNameFormat('tournament-id')(dispatch);
    });

    it('dispatches success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyNameFormatSuccess({ players_updated: 3, teams_updated: 2 })
      );
    });

    it('displays success toast with the updated counts', () => {
      const expectedMessage = i18n.t(
        'nameFormatSettingsForm.applyNameFormatSuccess',
        { playersUpdated: 3, teamsUpdated: 2 }
      );

      expect(displayToastSpy).toHaveBeenCalledWith(
        expectedMessage,
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(async () => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(tournamentSettingsHttpClient, 'applyNameFormat')
        .mockRejectedValue(apiError);

      await applyNameFormat('tournament-id')(dispatch);
    });

    it('dispatches failure action', () => {
      expect(dispatch).toHaveBeenCalledWith(applyNameFormatFailure(apiError));
    });

    it('displays error toast', () => {
      const expectedMessage = i18n.t(
        'nameFormatSettingsForm.applyNameFormatFailure'
      );

      expect(displayToastSpy).toHaveBeenCalledWith(
        expectedMessage,
        'is-danger'
      );
    });
  });
});

describe('deleteTournamentSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteTournamentSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(tournamentSettingsHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deleteTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteTournamentSettingSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(tournamentSettingsHttpClient, 'delete')
        .mockRejectedValue(apiError);

      deleteTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deleteTournamentSettingFailure(apiError)
      );
    });
  });
});

describe('patchTournamentSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchTournamentSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(tournamentSettingsHttpClient, 'patch').mockResolvedValue(({
        id: 'patched-id',
        nameFormat: NameFormat.FIRST_LAST,
        nameCase: NameCase.UPPER
      } as unknown) as TournamentSettingEntity);

      patchTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentSettingSuccess(({
          id: 'patched-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        } as unknown) as TournamentSettingEntity)
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Tournament settings updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name_format: ['is invalid'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(tournamentSettingsHttpClient, 'patch')
        .mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await patchTournamentSetting(DEFAULT_TOURNAMENT_SETTING)(
        dispatch
      );

      expect(result).toEqual({
        name_format: ['is invalid']
      });
    });
  });
});

describe('postTournamentSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postTournamentSetting(
      DEFAULT_TOURNAMENT_SETTING,
      'tournament-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postTournamentSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentSettingsHttpClient, 'post').mockResolvedValue(({
        id: 'posted-id',
        nameFormat: NameFormat.FULL,
        nameCase: NameCase.ORIGINAL
      } as unknown) as TournamentSettingEntity);

      postTournamentSetting(
        DEFAULT_TOURNAMENT_SETTING,
        'tournament-id'
      )(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postTournamentSettingSuccess(({
          id: 'posted-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        } as unknown) as TournamentSettingEntity)
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Tournament settings created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name_format: ['is invalid'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(tournamentSettingsHttpClient, 'post')
        .mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postTournamentSetting(
        DEFAULT_TOURNAMENT_SETTING,
        'tournament-id'
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        postTournamentSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await postTournamentSetting(
        DEFAULT_TOURNAMENT_SETTING,
        'tournament-id'
      )(dispatch);

      expect(result).toEqual({
        name_format: ['is invalid']
      });
    });
  });
});
