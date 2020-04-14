import accountReducer from './reducer';
import { initialState, AccountState } from './state';
import { signInStart, signInSuccess, signInFailure } from './actions';

describe('accountReducer', () => {
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
});
