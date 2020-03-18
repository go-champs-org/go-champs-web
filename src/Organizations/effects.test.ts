import { postOrganization } from './effects';
import { DEFAULT_ORGANIZATION } from './state';
import {
  postOrganizationStart,
  postOrganizationSuccess,
  postOrganizationFailure
} from './actions';
import organizationHttpClient from './organizationHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

jest.spyOn(toast, 'displayToast');

describe('postOrganization', () => {
  const dispatch = jest.fn();

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
