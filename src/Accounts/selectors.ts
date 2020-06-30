import { AccountState } from './state';

export const account = (state: AccountState) => state.account;
export const isAccountRecovering = (state: AccountState): boolean =>
  state.isAccountRecoveryLoading;
export const isResetingPassword = (state: AccountState): boolean =>
  state.isLoadingAccountReset;
export const isSigingIn = (state: AccountState): boolean =>
  state.isLoadingSingIn;
export const isSigingUp = (state: AccountState): boolean =>
  state.isLoadingSingUp;
