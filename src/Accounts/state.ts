import { AccountEntity } from './entity';

export interface AccountState {
  isAccountRecoveryLoading: boolean;
  isLoadingDeactive: boolean;
  isLoadingAccountReset: boolean;
  isLoadingPatchAccount: boolean;
  isLoadingSingIn: boolean;
  isLoadingSingUp: boolean;
  isLoadingRequestAccount: boolean;
  account: AccountEntity | null;
}

export const initialState: AccountState = {
  isAccountRecoveryLoading: false,
  isLoadingDeactive: false,
  isLoadingAccountReset: false,
  isLoadingPatchAccount: false,
  isLoadingSingIn: false,
  isLoadingSingUp: false,
  isLoadingRequestAccount: false,
  account: null
};
