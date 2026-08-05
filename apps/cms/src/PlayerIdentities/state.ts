import { ApiGovTypeIdEnum, ApiTaxIdEnum } from '../Shared/httpClient/apiTypes';

export interface PlayerIdentityEntity {
  id: string;
  playerId: string;
  fullLegalName: string;
  taxIdType: ApiTaxIdEnum;
  taxIdLast4: string;
  governmentIdType: ApiGovTypeIdEnum;
  governmentIdLast4: string;
  dateOfBirth: string;
  username: string;
  email: string;
}

export const DEFAULT_PLAYER_IDENTITY: PlayerIdentityEntity = {
  id: '',
  playerId: '',
  fullLegalName: '',
  taxIdType: ApiTaxIdEnum.CPF,
  taxIdLast4: '',
  governmentIdType: ApiGovTypeIdEnum.RG,
  governmentIdLast4: '',
  dateOfBirth: '',
  username: '',
  email: ''
};
