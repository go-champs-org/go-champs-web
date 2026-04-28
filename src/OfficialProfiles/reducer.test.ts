import reducer from './reducer';
import {
  requestOfficialProfilesStart,
  requestOfficialProfilesSuccess,
  requestOfficialProfilesFailure,
  postOfficialProfileStart,
  postOfficialProfileSuccess,
  postOfficialProfileFailure,
  deleteOfficialProfileStart,
  deleteOfficialProfileSuccess,
  deleteOfficialProfileFailure,
  requestOfficialProfileStart,
  requestOfficialProfileSuccess,
  requestOfficialProfileFailure,
  approveOfficialProfileInviteStart,
  approveOfficialProfileInviteSuccess,
  approveOfficialProfileInviteFailure
} from './actions';
import { initialState, OfficialProfileEntity } from './state';

describe('OfficialProfiles reducer', () => {
  it('returns initial state', () => {
    const result = reducer(undefined, { type: 'UNKNOWN' });

    expect(result).toEqual(initialState);
  });

  describe('REQUEST_OFFICIAL_PROFILE', () => {
    it('sets isLoadingRequestOfficialProfile to true', () => {
      const result = reducer(initialState, requestOfficialProfileStart());

      expect(result.isLoadingRequestOfficialProfile).toBe(true);
    });

    it('sets isLoadingRequestOfficialProfile to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingRequestOfficialProfile: true
      };

      const result = reducer(
        stateWithLoading,
        requestOfficialProfileFailure('Error')
      );

      expect(result.isLoadingRequestOfficialProfile).toBe(false);
    });

    it('sets isLoadingRequestOfficialProfile to false on success', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingRequestOfficialProfile: true
      };

      const result = reducer(
        stateWithLoading,
        requestOfficialProfileSuccess({
          username: 'official1',
          name: 'Jane Doe',
          photoUrl: 'https://example.com/photo.jpg',
          signature: 'data:image/png;base64,abc123',
          signaturePin: '1234',
          category: '',
          licenseNumber: '',
          pendingInvites: []
        })
      );

      expect(result.isLoadingRequestOfficialProfile).toBe(false);
      expect(result.officialProfiles).toEqual({
        official1: {
          username: 'official1',
          name: 'Jane Doe',
          photoUrl: 'https://example.com/photo.jpg',
          signature: 'data:image/png;base64,abc123',
          signaturePin: '1234',
          category: '',
          licenseNumber: '',
          pendingInvites: []
        }
      });
    });
  });

  describe('REQUEST_OFFICIAL_PROFILES', () => {
    it('sets isLoadingRequestOfficialProfiles to true', () => {
      const result = reducer(initialState, requestOfficialProfilesStart());

      expect(result.isLoadingRequestOfficialProfiles).toBe(true);
    });

    it('sets isLoadingRequestOfficialProfiles to false and updates official profiles on success', () => {
      const officialProfiles: OfficialProfileEntity[] = [
        {
          username: 'official1',
          name: 'Jane Doe',
          photoUrl: 'https://example.com/photo.jpg',
          category: 'Referee',
          licenseNumber: '',
          signature: 'data:image/png;base64,abc123',
          signaturePin: '1234',
          pendingInvites: []
        },
        {
          username: 'official2',
          name: 'John Smith',
          photoUrl: 'https://example.com/john.jpg',
          category: 'Umpire',
          licenseNumber: '',
          signature: '',
          signaturePin: '',
          pendingInvites: []
        }
      ];

      const stateWithLoading = {
        ...initialState,
        isLoadingRequestOfficialProfiles: true
      };

      const result = reducer(
        stateWithLoading,
        requestOfficialProfilesSuccess(officialProfiles)
      );

      expect(result.isLoadingRequestOfficialProfiles).toBe(false);
      expect(result.officialProfiles).toEqual({
        official1: {
          username: 'official1',
          name: 'Jane Doe',
          photoUrl: 'https://example.com/photo.jpg',
          category: 'Referee',
          licenseNumber: '',
          signature: 'data:image/png;base64,abc123',
          signaturePin: '1234',
          pendingInvites: []
        },
        official2: {
          username: 'official2',
          name: 'John Smith',
          photoUrl: 'https://example.com/john.jpg',
          category: 'Umpire',
          licenseNumber: '',
          signature: '',
          signaturePin: '',
          pendingInvites: []
        }
      });
    });

    it('sets isLoadingRequestOfficialProfiles to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingRequestOfficialProfiles: true
      };

      const result = reducer(
        stateWithLoading,
        requestOfficialProfilesFailure('Error')
      );

      expect(result.isLoadingRequestOfficialProfiles).toBe(false);
    });
  });

  describe('POST_OFFICIAL_PROFILE', () => {
    it('sets isLoadingPostOfficialProfile to true', () => {
      const result = reducer(initialState, postOfficialProfileStart());

      expect(result.isLoadingPostOfficialProfile).toBe(true);
    });

    it('sets isLoadingPostOfficialProfile to false and adds new official profile on success', () => {
      const newOfficialProfile: OfficialProfileEntity = {
        username: 'newofficial',
        name: 'New Official',
        photoUrl: 'https://example.com/new.jpg',
        category: 'Referee',
        licenseNumber: '',
        signature: 'data:image/png;base64,new123',
        signaturePin: '0000',
        pendingInvites: []
      };

      const stateWithLoading = {
        ...initialState,
        isLoadingPostOfficialProfile: true
      };

      const result = reducer(
        stateWithLoading,
        postOfficialProfileSuccess(newOfficialProfile)
      );

      expect(result.isLoadingPostOfficialProfile).toBe(false);
      expect(result.officialProfiles.newofficial).toEqual(newOfficialProfile);
    });

    it('sets isLoadingPostOfficialProfile to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingPostOfficialProfile: true
      };

      const result = reducer(
        stateWithLoading,
        postOfficialProfileFailure('Error')
      );

      expect(result.isLoadingPostOfficialProfile).toBe(false);
    });
  });

  describe('DELETE_OFFICIAL_PROFILE', () => {
    it('sets isLoadingDeleteOfficialProfile to true', () => {
      const result = reducer(initialState, deleteOfficialProfileStart());

      expect(result.isLoadingDeleteOfficialProfile).toBe(true);
    });

    it('sets isLoadingDeleteOfficialProfile to false and removes official profile on success', () => {
      const existingOfficialProfile: OfficialProfileEntity = {
        username: 'official1',
        name: 'Jane Doe',
        photoUrl: 'https://example.com/photo.jpg',
        category: 'Referee',
        licenseNumber: '',
        signature: 'data:image/png;base64,abc123',
        signaturePin: '1234',
        pendingInvites: []
      };

      const stateWithOfficialProfile = {
        ...initialState,
        isLoadingDeleteOfficialProfile: true,
        officialProfiles: {
          official1: existingOfficialProfile
        }
      };

      const result = reducer(
        stateWithOfficialProfile,
        deleteOfficialProfileSuccess('official1')
      );

      expect(result.isLoadingDeleteOfficialProfile).toBe(false);
      expect(result.officialProfiles.official1).toBeUndefined();
      expect(Object.keys(result.officialProfiles)).toHaveLength(0);
    });

    it('sets isLoadingDeleteOfficialProfile to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isLoadingDeleteOfficialProfile: true
      };

      const result = reducer(
        stateWithLoading,
        deleteOfficialProfileFailure('Error')
      );

      expect(result.isLoadingDeleteOfficialProfile).toBe(false);
    });
  });

  describe('APPROVE_OFFICIAL_PROFILE_INVITE', () => {
    it('sets isApprovingOfficialProfileInvite to true', () => {
      const result = reducer(initialState, approveOfficialProfileInviteStart());

      expect(result.isApprovingOfficialProfileInvite).toBe(true);
    });

    it('sets isApprovingOfficialProfileInvite to false on success', () => {
      const stateWithLoading = {
        ...initialState,
        isApprovingOfficialProfileInvite: true
      };

      const result = reducer(
        stateWithLoading,
        approveOfficialProfileInviteSuccess()
      );

      expect(result.isApprovingOfficialProfileInvite).toBe(false);
    });

    it('sets isApprovingOfficialProfileInvite to false on failure', () => {
      const stateWithLoading = {
        ...initialState,
        isApprovingOfficialProfileInvite: true
      };

      const result = reducer(
        stateWithLoading,
        approveOfficialProfileInviteFailure('Error')
      );

      expect(result.isApprovingOfficialProfileInvite).toBe(false);
    });
  });
});
