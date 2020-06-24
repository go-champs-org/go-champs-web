import { AccountEntity } from './entity';

export interface AccountState {
  isGettingAccountLoading: boolean;
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
  isGettingAccountLoading: false,
  isAccountRecoveryLoading: false,
  isLoadingDeactive: false,
  isLoadingAccountReset: false,
  isLoadingPatchAccount: false,
  isLoadingSingIn: false,
  isLoadingSingUp: false,
  isLoadingRequestAccount: false,
  account: null
};
