import { AccountState } from './state';

export const isResetingPassword = (state: AccountState): boolean =>
  state.isLoadingPasswordReset;
export const isSigingIn = (state: AccountState): boolean =>
  state.isLoadingSingIn;
export const isSigingUp = (state: AccountState): boolean =>
  state.isLoadingSingUp;
