import { ApiGovTypeIdEnum, ApiTaxIdEnum } from '../Shared/httpClient/apiTypes';

export interface AccountIdentityEntity {
  id: string;
  fullLegalName: string;
  taxIdType: ApiTaxIdEnum;
  taxIdLast4: string;
  governmentIdType: ApiGovTypeIdEnum;
  governmentIdLast4: string;
  dateOfBirth: string;
}

export const DEFAULT_ACCOUNT_IDENTITY: AccountIdentityEntity = {
  id: '',
  fullLegalName: '',
  taxIdType: ApiTaxIdEnum.CPF,
  taxIdLast4: '',
  governmentIdType: ApiGovTypeIdEnum.RG,
  governmentIdLast4: '',
  dateOfBirth: ''
};

export interface AccountIdentityState {
  isLoadingDeleteAccountIdentity: boolean;
  isLoadingPostAccountIdentity: boolean;
  isLoadingPutAccountIdentity: boolean;
  isLoadingRequestAccountIdentity: boolean;
  accountIdentity: AccountIdentityEntity;
}

export const initialState: AccountIdentityState = {
  isLoadingDeleteAccountIdentity: false,
  isLoadingPostAccountIdentity: false,
  isLoadingPutAccountIdentity: false,
  isLoadingRequestAccountIdentity: false,
  accountIdentity: DEFAULT_ACCOUNT_IDENTITY
};
