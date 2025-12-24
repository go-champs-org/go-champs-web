import reducer from './reducer';
import {
  requestAthleteProfilesStart,
  requestAthleteProfilesSuccess,
  requestAthleteProfilesFailure,
  postAthleteProfileStart,
  postAthleteProfileSuccess,
  postAthleteProfileFailure,
  deleteAthleteProfileStart,
  deleteAthleteProfileSuccess,
  deleteAthleteProfileFailure
} from './actions';
import { initialState, AthleteProfileEntity } from './state';

describe('AthleteProfiles reducer', () => {
  it('returns initial state', () => {
    const result = reducer(undefined, { type: 'UNKNOWN' });

    expect(result).toEqual(initialState);
  });

  describe('REQUEST_ATHLETE_PROFILES', () => {
    it('sets isLoadingRequestAthleteProfiles to true', () => {
      const result = reducer(initialState, requestAthleteProfilesStart());

      expect(result.isLoadingRequestAthleteProfiles).toBe(true);
    });

    it('sets isLoadingRequestAthleteProfiles to false and updates athlete profiles on success', () => {
      const athleteProfiles: AthleteProfileEntity[] = [
        {
          username: 'athlete1',
          name: 'John Doe',
          photoUrl: 'https://example.com/photo.jpg',
          facebook: 'john.doe',
          instagram: 'john_doe',
          twitter: '@johndoe'
        },
        {
          username: 'athlete2',
          name: 'Jane Smith',
          photoUrl: 'https://example.com/jane.jpg',
          facebook: '',
          instagram: 'jane_smith',
          twitter: ''
        }
      ];

      const stateWithLoading = {
        ...initialState,
        isLoadingRequestAthleteProfiles: true
      };

      const result = reducer(
        stateWithLoading,
        requestAthleteProfilesSuccess(athleteProfiles)
      );

      expect(result.isLoadingRequestAthleteProfiles).toBe(false);
      expect(result.athleteProfiles).toEqual({
        athlete1: {
          username: 'athlete1',
          name: 'John Doe',
          photoUrl: 'https://example.com/photo.jpg',
          facebook: 'john.doe',
          instagram: 'john_doe',
          twitter: '@johndoe'
        },
        athlete2: {
          username: 'athlete2',
          name: 'Jane Smith',
          photoUrl: 'https://example.com/jane.jpg',
          facebook: '',
          instagram: 'jane_smith',
          twitter: ''
        }
      });
    });

    it('sets isLoadingRequestAthleteProfiles to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingRequestAthleteProfiles: true
      };

      const result = reducer(
        stateWithLoading,
        requestAthleteProfilesFailure('Error')
      );

      expect(result.isLoadingRequestAthleteProfiles).toBe(false);
    });
  });

  describe('POST_ATHLETE_PROFILE', () => {
    it('sets isLoadingPostAthleteProfile to true', () => {
      const result = reducer(initialState, postAthleteProfileStart());

      expect(result.isLoadingPostAthleteProfile).toBe(true);
    });

    it('sets isLoadingPostAthleteProfile to false and adds new athlete profile on success', () => {
      const newAthleteProfile: AthleteProfileEntity = {
        username: 'newathlete',
        name: 'New Athlete',
        photoUrl: 'https://example.com/new.jpg',
        facebook: 'new.athlete',
        instagram: 'new_athlete',
        twitter: '@newathlete'
      };

      const stateWithLoading = {
        ...initialState,
        isLoadingPostAthleteProfile: true
      };

      const result = reducer(
        stateWithLoading,
        postAthleteProfileSuccess(newAthleteProfile)
      );

      expect(result.isLoadingPostAthleteProfile).toBe(false);
      expect(result.athleteProfiles.newathlete).toEqual(newAthleteProfile);
    });

    it('sets isLoadingPostAthleteProfile to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingPostAthleteProfile: true
      };

      const result = reducer(
        stateWithLoading,
        postAthleteProfileFailure('Error')
      );

      expect(result.isLoadingPostAthleteProfile).toBe(false);
    });
  });

  describe('DELETE_ATHLETE_PROFILE', () => {
    it('sets isLoadingDeleteAthleteProfile to true', () => {
      const result = reducer(initialState, deleteAthleteProfileStart());

      expect(result.isLoadingDeleteAthleteProfile).toBe(true);
    });

    it('sets isLoadingDeleteAthleteProfile to false and removes athlete profile on success', () => {
      const existingAthleteProfile: AthleteProfileEntity = {
        username: 'athlete1',
        name: 'John Doe',
        photoUrl: 'https://example.com/photo.jpg',
        facebook: 'john.doe',
        instagram: 'john_doe',
        twitter: '@johndoe'
      };

      const stateWithAthleteProfile = {
        ...initialState,
        isLoadingDeleteAthleteProfile: true,
        athleteProfiles: {
          athlete1: existingAthleteProfile
        }
      };

      const result = reducer(
        stateWithAthleteProfile,
        deleteAthleteProfileSuccess('athlete1')
      );

      expect(result.isLoadingDeleteAthleteProfile).toBe(false);
      expect(result.athleteProfiles.athlete1).toBeUndefined();
      expect(Object.keys(result.athleteProfiles)).toHaveLength(0);
    });

    it('sets isLoadingDeleteAthleteProfile to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingDeleteAthleteProfile: true
      };

      const result = reducer(
        stateWithLoading,
        deleteAthleteProfileFailure('Error')
      );

      expect(result.isLoadingDeleteAthleteProfile).toBe(false);
    });
  });
});
