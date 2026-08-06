import {
  ApiAccountIdentity,
  ApiGovTypeIdEnum,
  ApiTaxIdEnum
} from '../Shared/httpClient/apiTypes';
import {
  AccountIdentityFormValues,
  mapApiAccountIdentityToAccountIdentityEntity,
  mapFormValuesToApiAccountIdentityWriteRequest
} from './dataMappers';

describe('AccountIdentities dataMappers', () => {
  describe('mapApiAccountIdentityToAccountIdentityEntity', () => {
    it('maps API account identity to entity with all fields', () => {
      const apiAccountIdentity: ApiAccountIdentity = {
        id: 'identity-id',
        account_id: 'account-id',
        full_legal_name: 'Jane Doe',
        tax_id_type: ApiTaxIdEnum.CPF,
        tax_id_last4: '1234',
        government_id_type: ApiGovTypeIdEnum.RG,
        government_id_last4: '5678',
        date_of_birth: '1990-01-01'
      };

      const result = mapApiAccountIdentityToAccountIdentityEntity(
        apiAccountIdentity
      );

      expect(result).toEqual({
        id: 'identity-id',
        fullLegalName: 'Jane Doe',
        taxIdType: ApiTaxIdEnum.CPF,
        taxIdLast4: '1234',
        governmentIdType: ApiGovTypeIdEnum.RG,
        governmentIdLast4: '5678',
        dateOfBirth: '1990-01-01'
      });
    });

    it('defaults missing optional fields to empty strings and the default document types', () => {
      const apiAccountIdentity = {} as ApiAccountIdentity;

      const result = mapApiAccountIdentityToAccountIdentityEntity(
        apiAccountIdentity
      );

      expect(result).toEqual({
        id: '',
        fullLegalName: '',
        taxIdType: ApiTaxIdEnum.CPF,
        taxIdLast4: '',
        governmentIdType: ApiGovTypeIdEnum.RG,
        governmentIdLast4: '',
        dateOfBirth: ''
      });
    });
  });

  describe('mapFormValuesToApiAccountIdentityWriteRequest', () => {
    const formValues: AccountIdentityFormValues = {
      fullLegalName: 'Jane Doe',
      taxId: '52998224725',
      governmentId: '123456',
      dateOfBirth: '1990-01-01'
    };

    it('omits fields the user never touched', () => {
      const result = mapFormValuesToApiAccountIdentityWriteRequest(
        formValues,
        {}
      );

      expect(result).toEqual({
        account_identity: {
          full_legal_name: undefined,
          tax_id_type: undefined,
          tax_id: undefined,
          government_id_type: undefined,
          government_id: undefined,
          date_of_birth: undefined
        }
      });
    });

    it('sends the value for fields the user modified', () => {
      const result = mapFormValuesToApiAccountIdentityWriteRequest(formValues, {
        fullLegalName: true,
        taxId: true,
        governmentId: true,
        dateOfBirth: true
      });

      expect(result).toEqual({
        account_identity: {
          full_legal_name: 'Jane Doe',
          tax_id_type: ApiTaxIdEnum.CPF,
          tax_id: '52998224725',
          government_id_type: ApiGovTypeIdEnum.RG,
          government_id: '123456',
          date_of_birth: '1990-01-01'
        }
      });
    });

    it('sends null for fields the user modified and left blank, instead of omitting them', () => {
      const blankFormValues: AccountIdentityFormValues = {
        fullLegalName: '',
        taxId: '',
        governmentId: '',
        dateOfBirth: ''
      };

      const result = mapFormValuesToApiAccountIdentityWriteRequest(
        blankFormValues,
        {
          fullLegalName: true,
          taxId: true,
          governmentId: true,
          dateOfBirth: true
        }
      );

      expect(result).toEqual({
        account_identity: {
          full_legal_name: null,
          tax_id_type: null,
          tax_id: null,
          government_id_type: null,
          government_id: null,
          date_of_birth: null
        }
      });
    });

    it('only sends the touched fields, leaving the rest untouched', () => {
      const result = mapFormValuesToApiAccountIdentityWriteRequest(formValues, {
        fullLegalName: true
      });

      expect(result).toEqual({
        account_identity: {
          full_legal_name: 'Jane Doe',
          tax_id_type: undefined,
          tax_id: undefined,
          government_id_type: undefined,
          government_id: undefined,
          date_of_birth: undefined
        }
      });
    });
  });
});
