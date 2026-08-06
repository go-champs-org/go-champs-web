import {
  ApiAccountIdentity,
  ApiAccountIdentityWriteRequest,
  ApiGovTypeIdEnum,
  ApiTaxIdEnum
} from '../Shared/httpClient/apiTypes';
import { modifiedValue } from '../Shared/dataMappers/modifiedValue';
import { AccountIdentityEntity } from './state';

export const mapApiAccountIdentityToAccountIdentityEntity = (
  apiAccountIdentity: ApiAccountIdentity
): AccountIdentityEntity => ({
  id: apiAccountIdentity.id || '',
  fullLegalName: apiAccountIdentity.full_legal_name || '',
  taxIdType: apiAccountIdentity.tax_id_type || ApiTaxIdEnum.CPF,
  taxIdLast4: apiAccountIdentity.tax_id_last4 || '',
  governmentIdType:
    apiAccountIdentity.government_id_type || ApiGovTypeIdEnum.RG,
  governmentIdLast4: apiAccountIdentity.government_id_last4 || '',
  dateOfBirth: apiAccountIdentity.date_of_birth || ''
});

export interface AccountIdentityFormValues {
  fullLegalName: string;
  taxId: string;
  governmentId: string;
  dateOfBirth: string;
}

export type AccountIdentityModifiedFields = Partial<
  Record<keyof AccountIdentityFormValues, boolean>
>;

export const mapFormValuesToApiAccountIdentityWriteRequest = (
  formValues: AccountIdentityFormValues,
  modified: AccountIdentityModifiedFields
): ApiAccountIdentityWriteRequest => ({
  account_identity: {
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
    date_of_birth: modifiedValue(formValues, 'dateOfBirth', modified)
  }
});
