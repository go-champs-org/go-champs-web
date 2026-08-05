import {
  ApiPlayerIdentity,
  ApiPlayerIdentityWriteRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerIdentityEntity } from './state';

export const mapApiPlayerIdentityToPlayerIdentityEntity = (
  apiPlayerIdentity: ApiPlayerIdentity,
  playerId: string
): PlayerIdentityEntity => ({
  playerId,
  exists: true,
  fullLegalName: apiPlayerIdentity.full_legal_name || '',
  taxIdType: apiPlayerIdentity.tax_id_type || 'CPF',
  taxIdLast4: apiPlayerIdentity.tax_id_last4 || '',
  governmentIdType: apiPlayerIdentity.government_id_type || 'RG',
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
  email: string;
}

export const mapFormValuesToApiPlayerIdentityWriteRequest = (
  formValues: PlayerIdentityFormValues
): ApiPlayerIdentityWriteRequest => ({
  player_identity: {
    full_legal_name: formValues.fullLegalName || undefined,
    tax_id_type: formValues.taxId ? 'CPF' : undefined,
    tax_id: formValues.taxId || undefined,
    government_id_type: formValues.governmentId ? 'RG' : undefined,
    government_id: formValues.governmentId || undefined,
    date_of_birth: formValues.dateOfBirth || undefined,
    email: formValues.email || undefined
  }
});
