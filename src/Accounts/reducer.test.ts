import accountReducer from './reducer';
import { initialState, AccountState } from './state';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  accountResetFailure,
  accountResetSuccess,
  accountResetStart,
  accountRecoveryStart,
  accountRecoverySuccess,
  accountRecoveryFailure
} from './actions';

describe('accountReducer', () => {
  describe('on accountResetStart', () => {
    it('sets isSignInLoading to true', () => {
      const state = accountReducer(initialState, accountResetStart());

      expect(state.isLoadingAccountReset).toBe(true);
    });
  });

  describe('on accountResetSuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingAccountReset: true },
        accountResetSuccess()
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingAccountReset).toBe(false);
    });
  });

  describe('on accountResetFailure', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingAccountReset: true },
        accountResetFailure({})
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingAccountReset).toBe(false);
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
        signInSuccess({
          data: {
            email: 'some email',
            token: 'some token',
            username: 'someusername'
          }
        })
      );
    });

    it('sets isSignInLoading to false', () => {
      expect(state.isLoadingSingIn).toBe(false);
    });

    it('sets response email and username', () => {
      expect(state.account!.email).toEqual('some email');
      expect(state.account!.username).toEqual('someusername');
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
    it('sets isSignUpLoading to true', () => {
      const state = accountReducer(initialState, signUpStart());

      expect(state.isLoadingSingUp).toBe(true);
    });
  });

  describe('on signUpSuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isLoadingSingUp: true },
        signUpSuccess({
          data: {
            email: 'some email',
            token: 'some token',
            username: 'someusername'
          }
        })
      );
    });

    it('sets isSignUpLoading to false', () => {
      expect(state.isLoadingSingUp).toBe(false);
    });

    it('sets response email and username', () => {
      expect(state.account!.email).toEqual('some email');
      expect(state.account!.username).toEqual('someusername');
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

    it('sets isSignUpLoading to false', () => {
      expect(state.isLoadingSingUp).toBe(false);
    });
  });

  describe('on accountRecoveryStart', () => {
    it('sets isAccountRecoveryLoading to true', () => {
      const state = accountReducer(initialState, accountRecoveryStart());

      expect(state.isAccountRecoveryLoading).toBe(true);
    });
  });

  describe('on accountRecoverySuccess', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isAccountRecoveryLoading: true },
        accountRecoverySuccess()
      );
    });

    it('sets isAccountRecoveryLoading to false', () => {
      expect(state.isAccountRecoveryLoading).toBe(false);
    });
  });

  describe('on accountRecoveryFailure', () => {
    let state: AccountState;

    beforeEach(() => {
      state = accountReducer(
        { ...initialState, isAccountRecoveryLoading: true },
        accountRecoveryFailure({})
      );
    });

    it('sets isAccountRecoveryLoading to false', () => {
      expect(state.isAccountRecoveryLoading).toBe(false);
    });
  });
});
