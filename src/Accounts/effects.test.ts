import { signIn } from './effects';
import { UserEntity } from './entity';
import { History } from 'history';
import { signInStart, signInSuccess, signInFailure } from './actions';
import accountHttpClient from './accountHttpClient';
import ApiError from '../Shared/httpClient/ApiError';

let dispatch: jest.Mock;

describe.only('signIn', () => {
  const SOME_USER: UserEntity = {
    email: 'some@email.com',
    password: 'some password'
  };
  const mockHistory = ({
    push: jest.fn()
  } as unknown) as History;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start sign in action', () => {
    signIn(SOME_USER, mockHistory)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(signInStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(accountHttpClient, 'signIn').mockResolvedValue({
        data: { email: 'some@email.com', token: 'some token' }
      });

      signIn(SOME_USER, mockHistory)(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        signInSuccess({
          data: {
            email: 'some@email.com',
            token: 'some token'
          }
        })
      );
    });

    it('redirects to account page', () => {
      expect(mockHistory.push).toHaveBeenCalledWith('/Account');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(accountHttpClient, 'signIn')
        .mockRejectedValue(new Error('some error'));
    });

    it('dispatches post failure action', async () => {
      await signIn(SOME_USER, mockHistory)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        signInFailure(new Error('some error'))
      );
    });

    describe('with not found error', () => {
      const apiError = new ApiError({
        status: 404,
        data: { errors: { detail: 'not found' } }
      });

      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'signIn').mockRejectedValue(apiError);
      });

      it('returns formatted errors', async () => {
        const result = await signIn(SOME_USER, mockHistory)(dispatch);
        expect(result).toEqual({
          email: ['user not found']
        });
      });
    });

    describe('with unauthorized', () => {
      const apiError = new ApiError({
        status: 401,
        data: { errors: { detail: 'Unauthorized' } }
      });

      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'signIn').mockRejectedValue(apiError);
      });

      it('returns formatted errors', async () => {
        const result = await signIn(SOME_USER, mockHistory)(dispatch);
        expect(result).toEqual({
          email: ['invalid credentials'],
          password: ['invalid credentials']
        });
      });
    });
  });
});
