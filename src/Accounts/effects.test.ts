import {
  signIn,
  signUp,
  signUpWithRegistration,
  accountReset,
  accountRecovery,
  getAccount,
  facebookSignUp
} from './effects';
import {
  SignInEntity,
  SignUpEntity,
  AccountResetEntity,
  AccountRecoveryEntity,
  FacebookSignUpEntity
} from './entity';
import * as toast from '../Shared/bulma/toast';
import { History, Location } from 'history';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  accountResetStart,
  accountResetSuccess,
  accountResetFailure,
  accountRecoveryStart,
  accountRecoverySuccess,
  accountRecoveryFailure,
  getAccountStart,
  getAccountFailure,
  getAccountSuccess
} from './actions';
import accountHttpClient from './accountHttpClient';
import ApiError from '../Shared/httpClient/ApiError';

let dispatch: jest.Mock;

const ACCOUNT_RECOVERY: AccountRecoveryEntity = {
  email: 'some@email.com',
  recaptcha: 'some recaptcha'
};
const ACCOUNT_RESET: AccountResetEntity = {
  username: 'username',
  password: 'some password',
  recaptcha: 'some recaptcha',
  recoveryToken: 'some token',
  repeatedPassword: 'some repeated password'
};
const SIGN_UP: SignUpEntity = {
  email: 'some@email.com',
  username: 'someusername',
  password: 'some password',
  recaptcha: 'some recaptcha',
  repeatedPassword: 'some repeated password'
};
const FACEBOOK_SIGN_UP: FacebookSignUpEntity = {
  email: 'some@email.com',
  facebookId: 'some-facebook-id',
  recaptcha: 'some recaptcha',
  username: 'someusername'
};
const SOME_USER: SignInEntity = {
  username: 'some@email.com',
  password: 'some password'
};

describe('accountEffects', () => {
  let mockHistory: History;

  beforeEach(() => {
    mockHistory = ({
      push: jest.fn()
    } as unknown) as History;

    jest.spyOn(toast, 'displayToast');
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation();
  });

  describe('signIn', () => {
    let mockLocation: Location;

    beforeEach(() => {
      mockLocation = ({
        search: ''
      } as unknown) as Location;

      dispatch = jest.fn();
    });

    it('dispatches start sign in action', () => {
      signIn(SOME_USER, { history: mockHistory, location: mockLocation })(
        dispatch
      );

      expect(dispatch).toHaveBeenCalledWith(signInStart());
    });

    describe('on success', () => {
      let pushSpy: jest.SpyInstance;

      beforeEach(async () => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'signIn').mockResolvedValue({
          data: {
            email: 'some@email.com',
            token: 'some token',
            username: 'someusername'
          }
        });

        pushSpy = jest.spyOn(mockHistory, 'push');

        signIn(SOME_USER, { history: mockHistory, location: mockLocation })(
          dispatch
        );
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signInSuccess({
            data: {
              email: 'some@email.com',
              token: 'some token',
              username: 'someusername'
            }
          })
        );
      });

      it('sets the token on local storage', () => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'token',
          'some token'
        );
      });

      it('sets the username on local storage', () => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'username',
          'someusername'
        );
      });

      it('redirects to account page', () => {
        expect(pushSpy).toHaveBeenCalledWith('/Account');
      });

      it('redirects to redirectTo search param', async () => {
        mockLocation.search = '?redirectTo=/someOtherLocation';

        await signIn(SOME_USER, {
          history: mockHistory,
          location: mockLocation
        })(dispatch);

        expect(pushSpy.mock.calls.pop()[0]).toEqual('/someOtherLocation');
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
        await signIn(SOME_USER, {
          history: mockHistory,
          location: mockLocation
        })(dispatch);

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
          const result = await signIn(SOME_USER, {
            history: mockHistory,
            location: mockLocation
          })(dispatch);
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
          const result = await signIn(SOME_USER, {
            history: mockHistory,
            location: mockLocation
          })(dispatch);
          expect(result).toEqual({
            email: ['invalid credentials'],
            password: ['invalid credentials']
          });
        });
      });
    });
  });

  describe('signUp', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start sign in action', () => {
      signUp(SIGN_UP, mockHistory)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(signUpStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'signUp').mockResolvedValue({
          data: { email: 'some@email.com', token: 'some token' }
        });

        signUp(SIGN_UP, mockHistory)(dispatch);
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpSuccess({
            data: {
              email: 'some@email.com',
              token: 'some token'
            }
          })
        );
      });

      it('redirects to account page', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/SignIn');
      });
    });

    describe('on failure', () => {
      beforeEach(async () => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'signUp')
          .mockRejectedValue(new Error('some error'));

        await signUp(SIGN_UP, mockHistory)(dispatch);
      });

      it('dispatches post failure action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpFailure(new Error('some error'))
        );
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Sign up failed :(',
          'is-primary'
        );
      });
    });
  });

  describe('signUpWithRegistration', () => {
    const registrationResponseId = 'registration-response-123';

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start sign up action', () => {
      signUpWithRegistration(
        SIGN_UP,
        registrationResponseId,
        mockHistory
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(signUpStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'signUpWithRegistration')
          .mockResolvedValue({
            data: { email: 'some@email.com', token: 'some token' }
          });

        signUpWithRegistration(
          SIGN_UP,
          registrationResponseId,
          mockHistory
        )(dispatch);
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpSuccess({
            data: {
              email: 'some@email.com',
              token: 'some token'
            }
          })
        );
      });

      it('redirects to sign in page', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/SignIn');
      });
    });

    describe('on failure', () => {
      beforeEach(async () => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'signUpWithRegistration')
          .mockRejectedValue(new Error('some error'));

        await signUpWithRegistration(
          SIGN_UP,
          registrationResponseId,
          mockHistory
        )(dispatch);
      });

      it('dispatches post failure action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpFailure(new Error('some error'))
        );
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Sign up failed :(',
          'is-primary'
        );
      });
    });
  });

  describe('facebookSignUp', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start sign in action', () => {
      facebookSignUp(FACEBOOK_SIGN_UP, mockHistory)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(signUpStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'facebookSignUp').mockResolvedValue({
          data: { email: 'some@email.com', token: 'some token' }
        });

        facebookSignUp(FACEBOOK_SIGN_UP, mockHistory)(dispatch);
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpSuccess({
            data: {
              email: 'some@email.com',
              token: 'some token'
            }
          })
        );
      });

      it('redirects to account page', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/SignIn');
      });
    });

    describe('on failure', () => {
      beforeEach(async () => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'facebookSignUp')
          .mockRejectedValue(new Error('some error'));

        await facebookSignUp(FACEBOOK_SIGN_UP, mockHistory)(dispatch);
      });

      it('dispatches post failure action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          signUpFailure(new Error('some error'))
        );
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Sign up failed :(',
          'is-primary'
        );
      });
    });
  });

  describe('accountReset', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start sign in action', () => {
      accountReset(ACCOUNT_RESET, mockHistory)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(accountResetStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'reset').mockResolvedValue();

        accountReset(ACCOUNT_RESET, mockHistory)(dispatch);
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(accountResetSuccess());
      });

      it('redirects to account page', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/SignIn');
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Account reset successful',
          'is-success'
        );
      });
    });

    describe('on failure', () => {
      beforeEach(async () => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'reset')
          .mockRejectedValue(new Error('some error'));

        await accountReset(ACCOUNT_RESET, mockHistory)(dispatch);
      });

      it('dispatches post failure action', async () => {
        expect(dispatch).toHaveBeenCalledWith(
          accountResetFailure(new Error('some error'))
        );
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Account reset failed :(',
          'is-primary'
        );
      });
    });
  });

  describe('accountRecovery', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start sign in action', () => {
      accountRecovery(ACCOUNT_RECOVERY, mockHistory)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(accountRecoveryStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'recovery').mockResolvedValue();

        accountRecovery(ACCOUNT_RECOVERY, mockHistory)(dispatch);
      });

      it('dispatches post success action', () => {
        expect(dispatch).toHaveBeenCalledWith(accountRecoverySuccess());
      });

      it('redirects to account page', () => {
        expect(mockHistory.push).toHaveBeenCalledWith('/SignIn');
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Check your e-mail',
          'is-success'
        );
      });
    });

    describe('on failure', () => {
      beforeEach(async () => {
        dispatch.mockReset();

        jest
          .spyOn(accountHttpClient, 'recovery')
          .mockRejectedValue(new Error('some error'));

        await accountRecovery(ACCOUNT_RECOVERY, mockHistory)(dispatch);
      });

      it('dispatches post failure action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          accountRecoveryFailure(new Error('some error'))
        );
      });

      it('dispatches display toast', () => {
        expect(toast.displayToast).toHaveBeenCalledWith(
          'Account recovery failed :(',
          'is-primary'
        );
      });
    });
  });

  describe('getAccount', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches start get action', () => {
      getAccount('someusername')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getAccountStart());
    });

    describe('on success', () => {
      beforeEach(() => {
        jest.spyOn(accountHttpClient, 'getAccount').mockResolvedValue({
          data: {
            email: 'some@email.com',
            username: 'someusername',
            organizations: [
              {
                id: 'some-org-id',
                name: 'some org name',
                slug: 'some-org-slug'
              },
              {
                id: 'another-org-id',
                name: 'another org name',
                slug: 'another-org-slug'
              }
            ]
          }
        });

        getAccount('someusername')(dispatch);
      });

      it('sets the organization ids on local storage', () => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'organizations',
          'some-org-id,another-org-id'
        );
      });

      it('dispatches get success action', () => {
        expect(dispatch).toHaveBeenCalledWith(
          getAccountSuccess({
            data: {
              email: 'some@email.com',
              username: 'someusername',
              organizations: [
                {
                  id: 'some-org-id',
                  name: 'some org name',
                  slug: 'some-org-slug'
                },
                {
                  id: 'another-org-id',
                  name: 'another org name',
                  slug: 'another-org-slug'
                }
              ]
            }
          })
        );
      });
    });

    describe('on failure', () => {
      const apiError = new Error('some-error');

      beforeEach(() => {
        dispatch.mockReset();

        jest.spyOn(accountHttpClient, 'getAccount').mockRejectedValue(apiError);

        getAccount('some-id')(dispatch);
      });

      it('dispatches get failure action', async () => {
        await getAccount('some-id')(dispatch);

        expect(dispatch).toHaveBeenCalledWith(getAccountFailure(apiError));
      });
    });
  });
});
