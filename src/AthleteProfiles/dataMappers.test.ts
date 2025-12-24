import {
  mapApiAthleteProfileToAthleteProfileEntity,
  mapAthleteProfileEntityToApiAthleteProfilePatchRequest,
  mapAthleteProfileEntityToApiAthleteProfilePostRequest
} from './dataMappers';
import { AthleteProfileEntity } from './state';
import { ApiAthleteProfile } from '../Shared/httpClient/apiTypes';

describe('AthleteProfiles dataMappers', () => {
  describe('mapApiAthleteProfileToAthleteProfileEntity', () => {
    it('maps API athlete profile to entity with all fields', () => {
      const apiAthleteProfile: ApiAthleteProfile = {
        username: 'athlete123',
        name: 'John Doe',
        photo_url: 'https://example.com/photo.jpg',
        facebook: 'john.doe',
        instagram: 'john_doe',
        twitter: '@johndoe'
      };

      const result = mapApiAthleteProfileToAthleteProfileEntity(
        apiAthleteProfile
      );

      expect(result).toEqual({
        username: 'athlete123',
        name: 'John Doe',
        photoUrl: 'https://example.com/photo.jpg',
        facebook: 'john.doe',
        instagram: 'john_doe',
        twitter: '@johndoe'
      });
    });

    it('maps API athlete profile with missing optional fields to entity with empty strings', () => {
      const apiAthleteProfile: ApiAthleteProfile = {
        username: 'athlete123'
      };

      const result = mapApiAthleteProfileToAthleteProfileEntity(
        apiAthleteProfile
      );

      expect(result).toEqual({
        username: 'athlete123',
        name: '',
        photoUrl: '',
        facebook: '',
        instagram: '',
        twitter: ''
      });
    });

    it('maps API athlete profile with undefined optional fields to entity with empty strings', () => {
      const apiAthleteProfile: ApiAthleteProfile = {
        username: 'athlete123',
        name: undefined,
        photo_url: undefined,
        facebook: undefined,
        instagram: undefined,
        twitter: undefined
      };

      const result = mapApiAthleteProfileToAthleteProfileEntity(
        apiAthleteProfile
      );

      expect(result).toEqual({
        username: 'athlete123',
        name: '',
        photoUrl: '',
        facebook: '',
        instagram: '',
        twitter: ''
      });
    });
  });

  describe('mapAthleteProfileEntityToApiAthleteProfilePostRequest', () => {
    it('maps athlete profile entity to API POST request', () => {
      const athleteProfile: AthleteProfileEntity = {
        username: 'athlete123',
        name: 'John Doe',
        photoUrl: 'https://example.com/photo.jpg',
        facebook: 'john.doe',
        instagram: 'john_doe',
        twitter: '@johndoe'
      };

      const result = mapAthleteProfileEntityToApiAthleteProfilePostRequest(
        athleteProfile
      );

      expect(result).toEqual({
        athlete_profile: {
          username: 'athlete123',
          name: 'John Doe',
          photo_url: 'https://example.com/photo.jpg',
          facebook: 'john.doe',
          instagram: 'john_doe',
          twitter: '@johndoe'
        }
      });
    });

    it('maps athlete profile entity with empty fields to API POST request', () => {
      const athleteProfile: AthleteProfileEntity = {
        username: 'athlete123',
        name: '',
        photoUrl: '',
        facebook: '',
        instagram: '',
        twitter: ''
      };

      const result = mapAthleteProfileEntityToApiAthleteProfilePostRequest(
        athleteProfile
      );

      expect(result).toEqual({
        athlete_profile: {
          username: 'athlete123',
          name: '',
          photo_url: '',
          facebook: '',
          instagram: '',
          twitter: ''
        }
      });
    });
  });

  describe('mapAthleteProfileEntityToApiAthleteProfilePatchRequest', () => {
    it('maps athlete profile entity to API PATCH request', () => {
      const athleteProfile: AthleteProfileEntity = {
        username: 'athlete123',
        name: 'John Doe Updated',
        photoUrl: 'https://example.com/new-photo.jpg',
        facebook: 'john.doe.updated',
        instagram: 'john_doe_updated',
        twitter: '@johndoeupdated'
      };

      const result = mapAthleteProfileEntityToApiAthleteProfilePatchRequest(
        athleteProfile
      );

      expect(result).toEqual({
        athlete_profile: {
          username: 'athlete123',
          name: 'John Doe Updated',
          photo_url: 'https://example.com/new-photo.jpg',
          facebook: 'john.doe.updated',
          instagram: 'john_doe_updated',
          twitter: '@johndoeupdated'
        }
      });
    });
  });
});
