import {
  postRegistration,
  patchRegistration,
  deleteRegistration
} from './effects';
import { DEFAULT_REGISTRATION } from './state';
import {
  postRegistrationStart,
  postRegistrationSuccess,
  postRegistrationFailure,
  patchRegistrationStart,
  patchRegistrationSuccess,
  patchRegistrationFailure,
  deleteRegistrationStart,
  deleteRegistrationSuccess,
  deleteRegistrationFailure
} from './actions';
import registrationHttpClient from './registrationHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deleteRegistration', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteRegistration(DEFAULT_REGISTRATION)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteRegistrationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(registrationHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deleteRegistration(DEFAULT_REGISTRATION)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteRegistrationSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(registrationHttpClient, 'delete').mockRejectedValue(apiError);

      deleteRegistration(DEFAULT_REGISTRATION)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteRegistration(DEFAULT_REGISTRATION)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deleteRegistrationFailure(apiError)
      );
    });
  });
});

describe('patchRegistration', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchRegistration(DEFAULT_REGISTRATION)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchRegistrationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(registrationHttpClient, 'patch').mockResolvedValue({
        id: 'patched-id',
        title: 'patched registration',
        startDate: 'patched-start-date',
        endDate: 'patched-end-date',
        autoApprove: false,
        customFields: [],
        type: 'team_roster_invites'
      });

      patchRegistration(DEFAULT_REGISTRATION)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchRegistrationSuccess({
          id: 'patched-id',
          title: 'patched registration',
          startDate: 'patched-start-date',
          endDate: 'patched-end-date',
          autoApprove: false,
          customFields: [],
          type: 'team_roster_invites'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'patched registration updated!',
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

      jest.spyOn(registrationHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchRegistration(DEFAULT_REGISTRATION)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchRegistrationFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await patchRegistration(DEFAULT_REGISTRATION)(dispatch);

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});

describe('postRegistration', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postRegistration(DEFAULT_REGISTRATION, 'tournament-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postRegistrationStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(registrationHttpClient, 'post').mockResolvedValue({
        id: 'posted-id',
        title: 'posted registration',
        startDate: 'posted-start-date',
        endDate: 'posted-end-date',
        autoApprove: false,
        customFields: [],
        type: 'team_roster_invites'
      });

      postRegistration(DEFAULT_REGISTRATION, 'tournament-id')(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postRegistrationSuccess({
          id: 'posted-id',
          title: 'posted registration',
          startDate: 'posted-start-date',
          endDate: 'posted-end-date',
          autoApprove: false,
          customFields: [],
          type: 'team_roster_invites'
        })
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'posted registration created!',
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

      jest.spyOn(registrationHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postRegistration(DEFAULT_REGISTRATION, 'tournament-id')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postRegistrationFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await postRegistration(
        DEFAULT_REGISTRATION,
        'tournament-id'
      )(dispatch);

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});
