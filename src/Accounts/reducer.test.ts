import accountReducer from './reducer';
import { initialState, AccountState } from './state';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  passwordResetFailure,
  passwordResetSuccess,
  passwordResetStart
} from './actions';

describe('accountReducer', () => {
  describe('on passwordResetStart', () => {
    it('sets isSignInLoading to true', () => {
      const state = accountReducer(initialState, passwordResetStart());

      expect(state.isLoadingPasswordReset).toBe(true);
    });
  });

  describe('on passwordResetSuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingPasswordReset: true },
        passwordResetSuccess({
          data: { email: 'some email', token: 'some token' }
        })
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingPasswordReset).toBe(false);
    });

    it('sets response email', () => {
      expect(state.account!.email).toEqual('some email');
    });
  });

  describe('on passwordResetFailure', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingPasswordReset: true },
        passwordResetFailure({})
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingPasswordReset).toBe(false);
    });
  });

  describe('on signInStart', () => {
    it('sets isSignInLoading to true', () => {
      const state = accountReducer(initialState, signInStart());

      expect(state.isLoadingSingIn).toBe(true);
    });
  });

  describe('on signInSuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingSingIn: true },
        signInSuccess({ data: { email: 'some email', token: 'some token' } })
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingSingIn).toBe(false);
    });

    it('sets response email', () => {
      expect(state.account!.email).toEqual('some email');
    });
  });

  describe('on signInFailure', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingSingIn: true },
        signInFailure({})
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingSingIn).toBe(false);
    });
  });

  describe('on signUpStart', () => {
    it('sets isSignInLoading to true', () => {
      const state = accountReducer(initialState, signUpStart());

      expect(state.isLoadingSingUp).toBe(true);
    });
  });

  describe('on signUpSuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingSingUp: true },
        signUpSuccess({ data: { email: 'some email', token: 'some token' } })
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingSingUp).toBe(false);
    });

    it('sets response email', () => {
      expect(state.account!.email).toEqual('some email');
    });
  });

  describe('on signUpFailure', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingSingUp: true },
        signUpFailure({})
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingSingUp).toBe(false);
    });
  });
});
