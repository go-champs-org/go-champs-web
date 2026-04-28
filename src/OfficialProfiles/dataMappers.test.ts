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
        category: 'Referee',
        license_number: 'LN12345',
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
        category: 'Referee',
        licenseNumber: 'LN12345',
        signature: 'data:image/png;base64,abc123',
        signaturePin: '1234',
        pendingInvites: [],
        tournaments: []
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
        category: '',
        licenseNumber: '',
        signature: '',
        signaturePin: '',
        pendingInvites: [],
        tournaments: []
      });
    });

    it('maps API official profile with undefined optional fields to entity with empty strings', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123',
        name: undefined,
        photo_url: undefined,
        category: undefined,
        license_number: undefined,
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
        category: '',
        licenseNumber: '',
        signature: '',
        signaturePin: '',
        pendingInvites: [],
        tournaments: []
      });
    });

    it('maps API official profile with pending invites to entity', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123',
        name: 'Jane Doe',
        pending_invites: [
          {
            id: 'invite1',
            invitee_type: 'official_profile',
            invitee_id: 'official123',
            invitee: {
              id: 'official123',
              username: 'official123',
              name: 'Jane Doe'
            },
            registration_id: 'reg1',
            registration: {
              id: 'reg1',
              title: 'System - Officials',
              type: 'official_roster_invites',
              tournament_id: 'tournament1',
              tournament: {
                id: 'tournament1',
                name: 'Test Tournament',
                slug: 'test-tournament'
              }
            }
          }
        ]
      };

      const result = mapApiOfficialProfileToOfficialProfileEntity(
        apiOfficialProfile
      );

      expect(result.pendingInvites).toHaveLength(1);
      expect(result.pendingInvites[0].id).toBe('invite1');
      expect(result.pendingInvites[0].registration?.tournament?.name).toBe(
        'Test Tournament'
      );
    });

    it('maps API official profile with tournaments to entity', () => {
      const apiOfficialProfile: ApiOfficialProfile = {
        username: 'official123',
        name: 'Jane Doe',
        tournaments: [
          {
            id: 'tournament1',
            name: 'Tournament 1',
            slug: 'tournament-1'
          } as any,
          {
            id: 'tournament2',
            name: 'Tournament 2',
            slug: 'tournament-2'
          } as any
        ]
      };

      const result = mapApiOfficialProfileToOfficialProfileEntity(
        apiOfficialProfile
      );

      expect(result.tournaments).toHaveLength(2);
      expect(result.tournaments?.[0].id).toBe('tournament1');
      expect(result.tournaments?.[1].name).toBe('Tournament 2');
    });
  });

  describe('mapOfficialProfileEntityToApiOfficialProfilePostRequest', () => {
    it('maps official profile entity to API POST request', () => {
      const officialProfile: OfficialProfileEntity = {
        username: 'official123',
        name: 'Jane Doe',
        photoUrl: 'https://example.com/photo.jpg',
        category: 'Referee',
        licenseNumber: 'LN12345',
        signature: 'data:image/png;base64,abc123',
        signaturePin: '1234',
        pendingInvites: [],
        tournaments: []
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePostRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: 'Jane Doe',
          photo_url: 'https://example.com/photo.jpg',
          category: 'Referee',
          license_number: 'LN12345',
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
        category: '',
        licenseNumber: '',
        signature: '',
        signaturePin: '',
        pendingInvites: [],
        tournaments: []
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePostRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: '',
          photo_url: '',
          category: '',
          license_number: '',
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
        category: 'Head Referee',
        licenseNumber: 'LN12345',
        signature: 'data:image/png;base64,xyz789',
        signaturePin: '5678',
        pendingInvites: [],
        tournaments: []
      };

      const result = mapOfficialProfileEntityToApiOfficialProfilePatchRequest(
        officialProfile
      );

      expect(result).toEqual({
        official_profile: {
          username: 'official123',
          name: 'Jane Doe Updated',
          photo_url: 'https://example.com/new-photo.jpg',
          category: 'Head Referee',
          license_number: 'LN12345',
          signature: 'data:image/png;base64,xyz789',
          signature_pin: '5678'
        }
      });
    });
  });
});
