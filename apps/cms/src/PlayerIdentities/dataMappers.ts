import {
  ApiPlayerIdentity,
  ApiPlayerIdentityGovernmentIdType,
  ApiPlayerIdentityTaxIdType,
  ApiPlayerIdentityWriteRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerIdentityEntity } from './state';

export const PLAYER_IDENTITY_TAX_ID_TYPE: ApiPlayerIdentityTaxIdType = 'CPF';
export const PLAYER_IDENTITY_GOVERNMENT_ID_TYPE: ApiPlayerIdentityGovernmentIdType =
  'RG';

export const mapApiPlayerIdentityToPlayerIdentityEntity = (
  apiPlayerIdentity: ApiPlayerIdentity,
  playerId: string
): PlayerIdentityEntity => ({
  playerId,
  exists: true,
  fullLegalName: apiPlayerIdentity.full_legal_name || '',
  taxIdType: apiPlayerIdentity.tax_id_type || PLAYER_IDENTITY_TAX_ID_TYPE,
  taxIdLast4: apiPlayerIdentity.tax_id_last4 || '',
  governmentIdType:
    apiPlayerIdentity.government_id_type || PLAYER_IDENTITY_GOVERNMENT_ID_TYPE,
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

const modifiedValue = (
  formValues: PlayerIdentityFormValues,
  fieldName: keyof PlayerIdentityFormValues,
  modified: PlayerIdentityModifiedFields
): string | null | undefined => {
  if (!modified[fieldName]) return undefined;

  return formValues[fieldName] || null;
};

export const mapFormValuesToApiPlayerIdentityWriteRequest = (
  formValues: PlayerIdentityFormValues,
  modified: PlayerIdentityModifiedFields
): ApiPlayerIdentityWriteRequest => ({
  player_identity: {
    full_legal_name: modifiedValue(formValues, 'fullLegalName', modified),
    tax_id_type: modified.taxId
      ? formValues.taxId
        ? PLAYER_IDENTITY_TAX_ID_TYPE
        : null
      : undefined,
    tax_id: modifiedValue(formValues, 'taxId', modified),
    government_id_type: modified.governmentId
      ? formValues.governmentId
        ? PLAYER_IDENTITY_GOVERNMENT_ID_TYPE
        : null
      : undefined,
    government_id: modifiedValue(formValues, 'governmentId', modified),
    date_of_birth: modifiedValue(formValues, 'dateOfBirth', modified),
    username: modifiedValue(formValues, 'username', modified),
    email: modifiedValue(formValues, 'email', modified)
  }
});
