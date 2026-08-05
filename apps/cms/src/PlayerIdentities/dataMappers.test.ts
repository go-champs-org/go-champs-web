import { ApiPlayerIdentity } from '../Shared/httpClient/apiTypes';
import {
  mapApiPlayerIdentityToPlayerIdentityEntity,
  mapFormValuesToApiPlayerIdentityWriteRequest,
  PlayerIdentityFormValues,
  PLAYER_IDENTITY_GOVERNMENT_ID_TYPE,
  PLAYER_IDENTITY_TAX_ID_TYPE
} from './dataMappers';

describe('PlayerIdentities dataMappers', () => {
  describe('mapApiPlayerIdentityToPlayerIdentityEntity', () => {
    it('maps API player identity to entity with all fields', () => {
      const apiPlayerIdentity: ApiPlayerIdentity = {
        full_legal_name: 'Jane Doe',
        tax_id_type: 'CPF',
        tax_id_last4: '1234',
        government_id_type: 'RG',
        government_id_last4: '5678',
        date_of_birth: '1990-01-01',
        username: 'janedoe',
        email: 'jane@example.com'
      };

      const result = mapApiPlayerIdentityToPlayerIdentityEntity(
        apiPlayerIdentity,
        'player-id'
      );

      expect(result).toEqual({
        playerId: 'player-id',
        exists: true,
        fullLegalName: 'Jane Doe',
        taxIdType: 'CPF',
        taxIdLast4: '1234',
        governmentIdType: 'RG',
        governmentIdLast4: '5678',
        dateOfBirth: '1990-01-01',
        username: 'janedoe',
        email: 'jane@example.com'
      });
    });

    it('defaults missing optional fields to empty strings and the default document types', () => {
      const apiPlayerIdentity = {} as ApiPlayerIdentity;

      const result = mapApiPlayerIdentityToPlayerIdentityEntity(
        apiPlayerIdentity,
        'player-id'
      );

      expect(result).toEqual({
        playerId: 'player-id',
        exists: true,
        fullLegalName: '',
        taxIdType: PLAYER_IDENTITY_TAX_ID_TYPE,
        taxIdLast4: '',
        governmentIdType: PLAYER_IDENTITY_GOVERNMENT_ID_TYPE,
        governmentIdLast4: '',
        dateOfBirth: '',
        username: '',
        email: ''
      });
    });
  });

  describe('mapFormValuesToApiPlayerIdentityWriteRequest', () => {
    const formValues: PlayerIdentityFormValues = {
      fullLegalName: 'Jane Doe',
      taxId: '52998224725',
      governmentId: '123456',
      dateOfBirth: '1990-01-01',
      username: 'janedoe',
      email: 'jane@example.com'
    };

    it('omits fields the user never touched', () => {
      const result = mapFormValuesToApiPlayerIdentityWriteRequest(
        formValues,
        {}
      );

      expect(result).toEqual({
        player_identity: {
          full_legal_name: undefined,
          tax_id_type: undefined,
          tax_id: undefined,
          government_id_type: undefined,
          government_id: undefined,
          date_of_birth: undefined,
          username: undefined,
          email: undefined
        }
      });
    });

    it('sends the value for fields the user modified', () => {
      const result = mapFormValuesToApiPlayerIdentityWriteRequest(formValues, {
        fullLegalName: true,
        taxId: true,
        governmentId: true,
        dateOfBirth: true,
        username: true,
        email: true
      });

      expect(result).toEqual({
        player_identity: {
          full_legal_name: 'Jane Doe',
          tax_id_type: 'CPF',
          tax_id: '52998224725',
          government_id_type: 'RG',
          government_id: '123456',
          date_of_birth: '1990-01-01',
          username: 'janedoe',
          email: 'jane@example.com'
        }
      });
    });

    it('sends null for fields the user modified and left blank, instead of omitting them', () => {
      const blankFormValues: PlayerIdentityFormValues = {
        fullLegalName: '',
        taxId: '',
        governmentId: '',
        dateOfBirth: '',
        username: '',
        email: ''
      };

      const result = mapFormValuesToApiPlayerIdentityWriteRequest(
        blankFormValues,
        {
          fullLegalName: true,
          taxId: true,
          governmentId: true,
          dateOfBirth: true,
          username: true,
          email: true
        }
      );

      expect(result).toEqual({
        player_identity: {
          full_legal_name: null,
          tax_id_type: null,
          tax_id: null,
          government_id_type: null,
          government_id: null,
          date_of_birth: null,
          username: null,
          email: null
        }
      });
    });

    it('only sends the touched fields, leaving the rest untouched', () => {
      const result = mapFormValuesToApiPlayerIdentityWriteRequest(formValues, {
        fullLegalName: true
      });

      expect(result).toEqual({
        player_identity: {
          full_legal_name: 'Jane Doe',
          tax_id_type: undefined,
          tax_id: undefined,
          government_id_type: undefined,
          government_id: undefined,
          date_of_birth: undefined,
          username: undefined,
          email: undefined
        }
      });
    });
  });
});
