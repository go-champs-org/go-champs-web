import { postPlayer, patchPlayer, deletePlayer } from './effects';
import { DEFAULT_PLAYER } from './state';
import {
  postPlayerStart,
  postPlayerSuccess,
  postPlayerFailure,
  patchPlayerStart,
  patchPlayerSuccess,
  patchPlayerFailure,
  deletePlayerStart,
  deletePlayerSuccess,
  deletePlayerFailure
} from './actions';
import playerHttpClient from './playerHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deletePlayer', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deletePlayer(DEFAULT_PLAYER)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deletePlayerStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(playerHttpClient, 'delete').mockResolvedValue('delete-id');

      deletePlayer(DEFAULT_PLAYER)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(deletePlayerSuccess('delete-id'));
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(playerHttpClient, 'delete').mockRejectedValue(apiError);

      deletePlayer(DEFAULT_PLAYER)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deletePlayer(DEFAULT_PLAYER)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(deletePlayerFailure(apiError));
    });
  });
});

describe('patchPlayer', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchPlayer(DEFAULT_PLAYER)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchPlayerStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(playerHttpClient, 'patch').mockResolvedValue({
        id: 'patched-id',
        name: 'patched player',
        facebook: 'patched-facebook',
        instagram: 'patched-instagram',
        twitter: 'patched-twitter',
        username: 'patched-username'
      });

      patchPlayer(DEFAULT_PLAYER)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchPlayerSuccess({
          id: 'patched-id',
          name: 'patched player',
          facebook: 'patched-facebook',
          instagram: 'patched-instagram',
          twitter: 'patched-twitter',
          username: 'patched-username'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'patched player updated!',
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

      jest.spyOn(playerHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchPlayer(DEFAULT_PLAYER)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchPlayerFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await patchPlayer(DEFAULT_PLAYER)(dispatch);

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});

describe('postPlayer', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postPlayer(DEFAULT_PLAYER, 'tournament-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postPlayerStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(playerHttpClient, 'post').mockResolvedValue({
        id: 'posted-id',
        name: 'posted player',
        facebook: 'posted-facebook',
        instagram: 'posted-instagram',
        twitter: 'posted-twitter',
        username: 'posted-username'
      });

      postPlayer(DEFAULT_PLAYER, 'tournament-id')(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postPlayerSuccess({
          id: 'posted-id',
          name: 'posted player',
          facebook: 'posted-facebook',
          instagram: 'posted-instagram',
          twitter: 'posted-twitter',
          username: 'posted-username'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'posted player created!',
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

      jest.spyOn(playerHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postPlayer(DEFAULT_PLAYER, 'tournament-id')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postPlayerFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await postPlayer(
        DEFAULT_PLAYER,
        'tournament-id'
      )(dispatch);

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});
