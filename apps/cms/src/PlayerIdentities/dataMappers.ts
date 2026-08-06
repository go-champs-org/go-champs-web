import {
  ApiGovTypeIdEnum,
  ApiPlayerIdentity,
  ApiPlayerIdentityWriteRequest,
  ApiTaxIdEnum
} from '../Shared/httpClient/apiTypes';
import { modifiedValue } from '../Shared/dataMappers/modifiedValue';
import { PlayerIdentityEntity } from './state';

export const mapApiPlayerIdentityToPlayerIdentityEntity = (
  apiPlayerIdentity: ApiPlayerIdentity,
  playerId: string
): PlayerIdentityEntity => ({
  id: apiPlayerIdentity.id || '',
  playerId,
  fullLegalName: apiPlayerIdentity.full_legal_name || '',
  taxIdType: apiPlayerIdentity.tax_id_type || ApiTaxIdEnum.CPF,
  taxIdLast4: apiPlayerIdentity.tax_id_last4 || '',
  governmentIdType: apiPlayerIdentity.government_id_type || ApiGovTypeIdEnum.RG,
  governmentIdLast4: apiPlayerIdentity.government_id_last4 || '',
  dateOfBirth: apiPlayerIdentity.date_of_birth || '',
  username: apiPlayerIdentity.username || '',
  email: apiPlayerIdentity.email || ''
});

export interface PlayerIdentityFormValues {
  fullLegalName: string;
  taxId: string;
  governmentId: string;
  dateOfBirth: string;
  username: string;
  email: string;
}

export type PlayerIdentityModifiedFields = Partial<
  Record<keyof PlayerIdentityFormValues, boolean>
>;

export const mapFormValuesToApiPlayerIdentityWriteRequest = (
  formValues: PlayerIdentityFormValues,
  modified: PlayerIdentityModifiedFields
): ApiPlayerIdentityWriteRequest => ({
  player_identity: {
    full_legal_name: modifiedValue(formValues, 'fullLegalName', modified),
    tax_id_type: modified.taxId
      ? formValues.taxId
        ? ApiTaxIdEnum.CPF
        : null
      : undefined,
    tax_id: modifiedValue(formValues, 'taxId', modified),
    government_id_type: modified.governmentId
      ? formValues.governmentId
        ? ApiGovTypeIdEnum.RG
        : null
      : undefined,
    government_id: modifiedValue(formValues, 'governmentId', modified),
    date_of_birth: modifiedValue(formValues, 'dateOfBirth', modified),
    username: modifiedValue(formValues, 'username', modified),
    email: modifiedValue(formValues, 'email', modified)
  }
});
