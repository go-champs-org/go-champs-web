import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_ORGANIZATION_SUCCESS } from '../Organizations/actions';
import {
  DEFAULT_ORGANIZATION,
  OrganizationEntity
} from '../Organizations/state';
import {
  ActionTypes,
  deleteOrganizationSettingFailure,
  deleteOrganizationSettingStart,
  deleteOrganizationSettingSuccess,
  patchOrganizationSettingFailure,
  patchOrganizationSettingStart,
  patchOrganizationSettingSuccess,
  postOrganizationSettingFailure,
  postOrganizationSettingStart,
  postOrganizationSettingSuccess
} from './actions';
import organizationSettingReducer from './reducer';
import { initialState, OrganizationSettingState } from './state';

describe('deleteOrganizationSetting', () => {
  const action = deleteOrganizationSettingStart();

  it('sets isLoadingDeleteOrganizationSetting to true', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingDeleteOrganizationSetting
    ).toBe(true);
  });
});

describe('deleteOrganizationSettingFailure', () => {
  const action = deleteOrganizationSettingFailure('error');

  it('sets isLoadingDeleteOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingDeleteOrganizationSetting
    ).toBe(false);
  });
});

describe('deleteOrganizationSettingSuccess', () => {
  const action = deleteOrganizationSettingSuccess('first-id');

  const deleteState = {
    ...initialState,
    organizationSettings: {
      'first-id': {
        id: 'first-id',
        nameFormat: NameFormat.FULL,
        nameCase: NameCase.ORIGINAL
      }
    }
  };

  it('sets isLoadingDeleteOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(deleteState, action)
        .isLoadingDeleteOrganizationSetting
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = organizationSettingReducer(deleteState, action);

    expect(newState.organizationSettings['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationSettingState = {
      ...initialState,
      organizationSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        },
        ...deleteState.organizationSettings
      }
    };

    const newState = organizationSettingReducer(someState, action);

    expect(newState.organizationSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('patchOrganizationSetting', () => {
  const action = patchOrganizationSettingStart();

  it('sets isLoadingPatchOrganizationSetting to true', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingPatchOrganizationSetting
    ).toBe(true);
  });
});

describe('patchOrganizationSettingFailure', () => {
  const action = patchOrganizationSettingFailure('error');

  it('sets isLoadingPatchOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingPatchOrganizationSetting
    ).toBe(false);
  });
});

describe('patchOrganizationSettingSuccess', () => {
  const action = patchOrganizationSettingSuccess({
    id: 'first-id',
    nameFormat: NameFormat.FULL,
    nameCase: NameCase.ORIGINAL
  });

  const updateState: OrganizationSettingState = {
    ...initialState,
    organizationSettings: {
      'first-id': {
        id: 'first-id',
        nameFormat: NameFormat.FIRST_LAST,
        nameCase: NameCase.UPPER
      }
    }
  };

  it('sets isLoadingPatchOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(updateState, action)
        .isLoadingPatchOrganizationSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = organizationSettingReducer(updateState, action);

    expect(newState.organizationSettings['first-id']).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    });
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationSettingState = {
      ...updateState,
      organizationSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        }
      }
    };

    const newState = organizationSettingReducer(someState, action);

    expect(newState.organizationSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('postOrganizationSetting', () => {
  const action = postOrganizationSettingStart();

  it('sets isLoadingPostOrganizationSetting to true', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingPostOrganizationSetting
    ).toBe(true);
  });
});

describe('postOrganizationSettingFailure', () => {
  const action = postOrganizationSettingFailure('error');

  it('sets isLoadingPostOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingPostOrganizationSetting
    ).toBe(false);
  });
});

describe('postOrganizationSettingSuccess', () => {
  const action = postOrganizationSettingSuccess({
    id: 'first-id',
    nameFormat: NameFormat.FIRST_LAST,
    nameCase: NameCase.UPPER
  });

  it('sets isLoadingPostOrganizationSetting to false', () => {
    expect(
      organizationSettingReducer(initialState, action)
        .isLoadingPostOrganizationSetting
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = organizationSettingReducer(initialState, action);

    expect(newState.organizationSettings['first-id']).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('keeps others entities in other', () => {
    const someState: OrganizationSettingState = {
      ...initialState,
      organizationSettings: {
        'some-id': {
          id: 'some-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        }
      }
    };

    const newState = organizationSettingReducer(someState, action);

    expect(newState.organizationSettings['some-id']).toEqual({
      id: 'some-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    });
  });
});

describe('getOrganizationSuccess', () => {
  const action: HttpAction<ActionTypes, OrganizationEntity> = {
    type: GET_ORGANIZATION_SUCCESS,
    payload: {
      ...DEFAULT_ORGANIZATION,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      organizationSetting: {
        id: 'first-organization-setting-id',
        nameFormat: NameFormat.FIRST_LAST,
        nameCase: NameCase.UPPER
      }
    }
  };

  it('sets entities', () => {
    const newState = organizationSettingReducer(initialState, action);

    expect(
      newState.organizationSettings['first-organization-setting-id']
    ).toEqual({
      id: 'first-organization-setting-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('does not break if no organizationSetting present', () => {
    const emptyResponseAction: HttpAction<ActionTypes, OrganizationEntity> = {
      type: GET_ORGANIZATION_SUCCESS,
      payload: DEFAULT_ORGANIZATION
    };
    const newState = organizationSettingReducer(
      initialState,
      emptyResponseAction
    );

    expect(newState).toEqual(initialState);
  });
});
