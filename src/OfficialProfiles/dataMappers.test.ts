import {
  mapApiOfficialProfileToOfficialProfileEntity,
  mapOfficialProfileEntityToApiOfficialProfilePatchRequest,
  mapOfficialProfileEntityToApiOfficialProfilePostRequest
} from './dataMappers';
import { OfficialProfileEntity } from './state';
import { ApiOfficialProfile } from '../Shared/httpClient/apiTypes';

describe('OfficialProfiles dataMappers', () => {
  describe('mapApiOfficialProfileToOfficialProfileEntity', () => {
    it('maps API official profile to entity with all fields', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123',
        name: 'Jane Doe',
        photo_url: 'https://example.com/photo.jpg',
        signature: 'data:image/png;base64,abc123',
        signature_pin: '1234'
      };

      const result = mapApiOfficialProfileToOfficialProfileEntity(
        apiOfficialProfile
      );

      expect(result).toEqual({
        username: 'official123',
        name: 'Jane Doe',
        photoUrl: 'https://example.com/photo.jpg',
        signature: 'data:image/png;base64,abc123',
        signaturePin: '1234'
      });
    });

    it('maps API official profile with missing optional fields to entity with empty strings', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123'
      };

      const result = mapApiOfficialProfileToOfficialProfileEntity(
        apiOfficialProfile
      );

      expect(result).toEqual({
        username: 'official123',
        name: '',
        photoUrl: '',
        signature: '',
        signaturePin: ''
      });
    });

    it('maps API official profile with undefined optional fields to entity with empty strings', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123',
        name: undefined,
        photo_url: undefined,
        signature: undefined,
        signature_pin: undefined
      };

      const result = mapApiOfficialProfileToOfficialProfileEntity(
        apiOfficialProfile
      );

      expect(result).toEqual({
        username: 'official123',
        name: '',
        photoUrl: '',
        signature: '',
        signaturePin: ''
      });
    });
  });

  describe('mapOfficialProfileEntityToApiOfficialProfilePostRequest', () => {
    it('maps official profile entity to API POST request', () => {
      const officialProfile: OfficialProfileEntity = {
        username: 'official123',
        name: 'Jane Doe',
        photoUrl: 'https://example.com/photo.jpg',
        signature: 'data:image/png;base64,abc123',
        signaturePin: '1234'
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePostRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: 'Jane Doe',
          photo_url: 'https://example.com/photo.jpg',
          signature: 'data:image/png;base64,abc123',
          signature_pin: '1234'
        }
      });
    });

    it('maps official profile entity with empty fields to API POST request', () => {
      const officialProfile: OfficialProfileEntity = {
        username: 'official123',
        name: '',
        photoUrl: '',
        signature: '',
        signaturePin: ''
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePostRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: '',
          photo_url: '',
          signature: '',
          signature_pin: ''
        }
      });
    });
  });

  describe('mapOfficialProfileEntityToApiOfficialProfilePatchRequest', () => {
    it('maps official profile entity to API PATCH request', () => {
      const officialProfile: OfficialProfileEntity = {
        username: 'official123',
        name: 'Jane Doe Updated',
        photoUrl: 'https://example.com/new-photo.jpg',
        signature: 'data:image/png;base64,xyz789',
        signaturePin: '5678'
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePatchRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: 'Jane Doe Updated',
          photo_url: 'https://example.com/new-photo.jpg',
          signature: 'data:image/png;base64,xyz789',
          signature_pin: '5678'
        }
      });
    });
  });
});
