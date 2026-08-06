import { AccountIdentityState } from './state';

export const accountIdentity = (state: AccountIdentityState) =>
  state.accountIdentity;
export const accountIdentityLoading = (state: AccountIdentityState): boolean =>
  state.isLoadingRequestAccountIdentity;
export const savingAccountIdentity = (state: AccountIdentityState): boolean =>
  state.isLoadingPostAccountIdentity || state.isLoadingPutAccountIdentity;
export const deletingAccountIdentity = (state: AccountIdentityState): boolean =>
  state.isLoadingDeleteAccountIdentity;
