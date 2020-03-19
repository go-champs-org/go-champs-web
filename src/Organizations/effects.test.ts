import {
  postOrganization,
  patchOrganization,
  getOrganization,
  getOrganizations,
  deleteOrganization
} from './effects';
import { DEFAULT_ORGANIZATION } from './state';
import {
  postOrganizationStart,
  postOrganizationSuccess,
  postOrganizationFailure,
  patchOrganizationStart,
  patchOrganizationSuccess,
  patchOrganizationFailure,
  getOrganizationStart,
  getOrganizationSuccess,
  getOrganizationFailure,
  getOrganizationsFailure,
  getOrganizationsSuccess,
  getOrganizationsStart,
  deleteOrganizationStart,
  deleteOrganizationSuccess,
  deleteOrganizationFailure
} from './actions';
import organizationHttpClient from './organizationHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deleteOrganization', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteOrganization(DEFAULT_ORGANIZATION)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteOrganizationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(organizationHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deleteOrganization(DEFAULT_ORGANIZATION)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteOrganizationSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'delete').mockRejectedValue(apiError);

      deleteOrganization(DEFAULT_ORGANIZATION)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteOrganization(DEFAULT_ORGANIZATION)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deleteOrganizationFailure(apiError)
      );
    });
  });
});

describe('getOrganization', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getOrganization('some-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getOrganizationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(organizationHttpClient, 'get').mockResolvedValue({
        id: 'get-id',
        name: 'get organization',
        slug: 'get-organization-slug'
      });

      getOrganization('some-id')(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getOrganizationSuccess({
          id: 'get-id',
          name: 'get organization',
          slug: 'get-organization-slug'
        })
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'get').mockRejectedValue(apiError);

      getOrganization('some-id')(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getOrganization('some-id')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getOrganizationFailure(apiError));
    });
  });
});

describe('getOrganizations', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getOrganizations()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getOrganizationsStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(organizationHttpClient, 'getAll').mockResolvedValue([
        {
          id: 'get-id',
          name: 'get organization',
          slug: 'get-organization-slug'
        }
      ]);

      getOrganizations()(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getOrganizationsSuccess([
          {
            id: 'get-id',
            name: 'get organization',
            slug: 'get-organization-slug'
          }
        ])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'getAll').mockRejectedValue(apiError);

      getOrganizations()(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getOrganizations()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getOrganizationsFailure(apiError));
    });
  });
});

describe('patchOrganization', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchOrganization(DEFAULT_ORGANIZATION)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchOrganizationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'patch').mockResolvedValue({
        id: 'patched-id',
        name: 'patched organization',
        slug: 'patched-organization-slug'
      });

      patchOrganization(DEFAULT_ORGANIZATION)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchOrganizationSuccess({
          id: 'patched-id',
          name: 'patched organization',
          slug: 'patched-organization-slug'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(toast.displayToast).toHaveBeenCalledWith(
        'patched organization updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { slug: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchOrganization(DEFAULT_ORGANIZATION)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchOrganizationFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await patchOrganization(DEFAULT_ORGANIZATION)(dispatch);

      expect(result).toEqual({
        slug: ['has invalid format']
      });
    });
  });
});

describe('postOrganization', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postOrganization(DEFAULT_ORGANIZATION)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postOrganizationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'post').mockResolvedValue({
        id: 'posted-id',
        name: 'posted organization',
        slug: 'posted-organization-slug'
      });

      postOrganization(DEFAULT_ORGANIZATION)(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postOrganizationSuccess({
          id: 'posted-id',
          name: 'posted organization',
          slug: 'posted-organization-slug'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(toast.displayToast).toHaveBeenCalledWith(
        'posted organization created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { slug: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(organizationHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postOrganization(DEFAULT_ORGANIZATION)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postOrganizationFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await postOrganization(DEFAULT_ORGANIZATION)(dispatch);

      expect(result).toEqual({
        slug: ['has invalid format']
      });
    });
  });
});
