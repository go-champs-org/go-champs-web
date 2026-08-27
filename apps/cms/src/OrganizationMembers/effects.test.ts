import {
  deleteOrganizationMemberFailure,
  deleteOrganizationMemberStart,
  deleteOrganizationMemberSuccess,
  getOrganizationMembersFailure,
  getOrganizationMembersStart,
  getOrganizationMembersSuccess,
  patchOrganizationMemberFailure,
  patchOrganizationMemberStart,
  patchOrganizationMemberSuccess,
  postOrganizationMemberFailure,
  postOrganizationMemberStart,
  postOrganizationMemberSuccess
} from './actions';
import {
  deleteOrganizationMember,
  getOrganizationMembers,
  patchOrganizationMember,
  postOrganizationMember
} from './effects';
import organizationMembersHttpClient from './organizationMembersHttpClient';
import { OrganizationMemberEntity, OrganizationMemberRole } from './state';
import ApiError from '../Shared/httpClient/ApiError';
import * as toast from '../Shared/bulma/toast';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

const someMember: OrganizationMemberEntity = {
  id: 'some-id',
  username: 'some-username',
  role: OrganizationMemberRole.GAME_OPERATOR
};

let dispatch: jest.Mock;

beforeEach(() => {
  dispatch = jest.fn();
  displayToastSpy.mockClear();
});

describe('getOrganizationMembers', () => {
  it('dispatches start action', () => {
    getOrganizationMembers('some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getOrganizationMembersStart());
  });

  it('dispatches success action', async () => {
    jest
      .spyOn(organizationMembersHttpClient, 'getAll')
      .mockResolvedValue([someMember]);

    await getOrganizationMembers('some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      getOrganizationMembersSuccess([someMember])
    );
  });

  it('dispatches failure action', async () => {
    const apiError = new Error('some-error');
    jest
      .spyOn(organizationMembersHttpClient, 'getAll')
      .mockRejectedValue(apiError);

    await getOrganizationMembers('some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      getOrganizationMembersFailure(apiError)
    );
  });
});

describe('postOrganizationMember', () => {
  it('dispatches start action', () => {
    postOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postOrganizationMemberStart());
  });

  it('dispatches success action', async () => {
    jest
      .spyOn(organizationMembersHttpClient, 'post')
      .mockResolvedValue(someMember);

    await postOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      postOrganizationMemberSuccess(someMember)
    );
  });

  it('dispatches failure action and returns errors', async () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { username: ['not found'] } }
    });
    jest
      .spyOn(organizationMembersHttpClient, 'post')
      .mockRejectedValue(apiError);

    const result = await postOrganizationMember(
      someMember,
      'some-organization-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      postOrganizationMemberFailure(apiError)
    );
    expect(result).toEqual({ username: ['not found'] });
  });
});

describe('patchOrganizationMember', () => {
  it('dispatches start action', () => {
    patchOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchOrganizationMemberStart());
  });

  it('dispatches success action', async () => {
    jest
      .spyOn(organizationMembersHttpClient, 'patch')
      .mockResolvedValue(someMember);

    await patchOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      patchOrganizationMemberSuccess(someMember)
    );
  });

  it('dispatches failure action and returns errors', async () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { role: ['last owner'] } }
    });
    jest
      .spyOn(organizationMembersHttpClient, 'patch')
      .mockRejectedValue(apiError);

    const result = await patchOrganizationMember(
      someMember,
      'some-organization-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      patchOrganizationMemberFailure(apiError)
    );
    expect(result).toEqual({ role: ['last owner'] });
  });

  it('displays the api error message', async () => {
    jest.spyOn(organizationMembersHttpClient, 'patch').mockRejectedValue(
      new ApiError({
        status: 422,
        data: { errors: { role: ['organization must have an owner'] } }
      })
    );

    await patchOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(displayToastSpy).toHaveBeenCalledWith(
      'organization must have an owner',
      'is-danger'
    );
  });

  it('displays a fallback message for non api errors', async () => {
    jest
      .spyOn(organizationMembersHttpClient, 'patch')
      .mockRejectedValue(new Error('some-error'));

    await patchOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(displayToastSpy).toHaveBeenCalledWith(
      'Error on updating :(',
      'is-danger'
    );
  });

  it('keeps the stored role untouched on failure', async () => {
    jest.spyOn(organizationMembersHttpClient, 'patch').mockRejectedValue(
      new ApiError({
        status: 422,
        data: { errors: { role: ['organization must have an owner'] } }
      })
    );

    await patchOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(
      patchOrganizationMemberSuccess(someMember)
    );
  });
});

describe('deleteOrganizationMember', () => {
  it('dispatches start action', () => {
    deleteOrganizationMember(someMember, 'some-organization-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteOrganizationMemberStart());
  });

  it('dispatches success action', async () => {
    jest
      .spyOn(organizationMembersHttpClient, 'delete')
      .mockResolvedValue('some-id');

    await deleteOrganizationMember(
      someMember,
      'some-organization-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      deleteOrganizationMemberSuccess('some-id')
    );
  });

  it('dispatches failure action', async () => {
    const apiError = new Error('some-error');
    jest
      .spyOn(organizationMembersHttpClient, 'delete')
      .mockRejectedValue(apiError);

    await deleteOrganizationMember(
      someMember,
      'some-organization-id'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      deleteOrganizationMemberFailure(apiError)
    );
    expect(displayToastSpy).toHaveBeenCalledWith(
      'Error on removing :(',
      'is-danger'
    );
  });

  it('displays the api error message', async () => {
    jest.spyOn(organizationMembersHttpClient, 'delete').mockRejectedValue(
      new ApiError({
        status: 422,
        data: { errors: { role: ['organization must have an owner'] } }
      })
    );

    await deleteOrganizationMember(
      someMember,
      'some-organization-id'
    )(dispatch);

    expect(displayToastSpy).toHaveBeenCalledWith(
      'organization must have an owner',
      'is-danger'
    );
  });
});
