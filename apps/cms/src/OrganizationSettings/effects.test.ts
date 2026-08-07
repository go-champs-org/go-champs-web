import {
  postOrganizationSetting,
  patchOrganizationSetting,
  deleteOrganizationSetting
} from './effects';
import {
  DEFAULT_ORGANIZATION_SETTING,
  OrganizationSettingEntity
} from './state';
import {
  postOrganizationSettingStart,
  postOrganizationSettingSuccess,
  postOrganizationSettingFailure,
  patchOrganizationSettingStart,
  patchOrganizationSettingSuccess,
  patchOrganizationSettingFailure,
  deleteOrganizationSettingStart,
  deleteOrganizationSettingSuccess,
  deleteOrganizationSettingFailure
} from './actions';
import organizationSettingsHttpClient from './organizationSettingsHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deleteOrganizationSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteOrganizationSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(organizationSettingsHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deleteOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteOrganizationSettingSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(organizationSettingsHttpClient, 'delete')
        .mockRejectedValue(apiError);

      deleteOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deleteOrganizationSettingFailure(apiError)
      );
    });
  });
});

describe('patchOrganizationSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchOrganizationSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(organizationSettingsHttpClient, 'patch').mockResolvedValue(({
        id: 'patched-id',
        nameFormat: NameFormat.FIRST_LAST,
        nameCase: NameCase.UPPER
      } as unknown) as OrganizationSettingEntity);

      patchOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchOrganizationSettingSuccess(({
          id: 'patched-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        } as unknown) as OrganizationSettingEntity)
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Organization settings updated!',
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
        .spyOn(organizationSettingsHttpClient, 'patch')
        .mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchOrganizationSetting(DEFAULT_ORGANIZATION_SETTING)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchOrganizationSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await patchOrganizationSetting(
        DEFAULT_ORGANIZATION_SETTING
      )(dispatch);

      expect(result).toEqual({
        name_format: ['is invalid']
      });
    });
  });
});

describe('postOrganizationSetting', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postOrganizationSetting(
      DEFAULT_ORGANIZATION_SETTING,
      'organization-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postOrganizationSettingStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationSettingsHttpClient, 'post').mockResolvedValue(({
        id: 'posted-id',
        nameFormat: NameFormat.FULL,
        nameCase: NameCase.ORIGINAL
      } as unknown) as OrganizationSettingEntity);

      postOrganizationSetting(
        DEFAULT_ORGANIZATION_SETTING,
        'organization-id'
      )(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postOrganizationSettingSuccess(({
          id: 'posted-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        } as unknown) as OrganizationSettingEntity)
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Organization settings created!',
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
        .spyOn(organizationSettingsHttpClient, 'post')
        .mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postOrganizationSetting(
        DEFAULT_ORGANIZATION_SETTING,
        'organization-id'
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        postOrganizationSettingFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await postOrganizationSetting(
        DEFAULT_ORGANIZATION_SETTING,
        'organization-id'
      )(dispatch);

      expect(result).toEqual({
        name_format: ['is invalid']
      });
    });
  });
});
