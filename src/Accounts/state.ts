import { AccountEntity } from './entity';

export interface AccountState {
  isLoadingDeactive: boolean;
  isLoadingPasswordReset: boolean;
  isLoadingPatchAccount: boolean;
  isLoadingSingIn: boolean;
  isLoadingSingUp: boolean;
  isLoadingRequestAccount: boolean;
  account: AccountEntity | null;
}

export const initialState: AccountState = {
  isLoadingDeactive: false,
  isLoadingPasswordReset: false,
  isLoadingPatchAccount: false,
  isLoadingSingIn: false,
  isLoadingSingUp: false,
  isLoadingRequestAccount: false,
  account: null
};
