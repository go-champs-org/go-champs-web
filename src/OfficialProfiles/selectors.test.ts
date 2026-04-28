import {
  officialProfiles,
  officialProfileByUsername,
  officialProfileLoading,
  officialProfilesLoading,
  patchingOfficialProfile,
  patchingOfficialProfileSignature,
  postingOfficialProfile,
  deletingOfficialProfile,
  pendingInvitesByUsername,
  approvingOfficialProfileInvite
} from './selectors';
import { OfficialProfileState, OfficialProfileEntity } from './state';

describe('OfficialProfiles selectors', () => {
  const mockOfficialProfile1: OfficialProfileEntity = {
    username: 'official1',
    name: 'Jane Doe',
    photoUrl: 'https://example.com/photo.jpg',
    category: 'Referee',
    licenseNumber: 'LN12345',
    signature: 'data:image/png;base64,abc123',
    signaturePin: '1234',
    pendingInvites: []
  };

  const mockOfficialProfile2: OfficialProfileEntity = {
    username: 'official2',
    name: 'John Smith',
    photoUrl: 'https://example.com/john.jpg',
    category: 'Umpire',
    licenseNumber: 'LN67890',
    signature: '',
    signaturePin: '',
    pendingInvites: [
      {
        id: 'invite1',
        invitee_type: 'official_profile',
        invitee_id: 'official2',
        invitee: {
          id: 'official2',
          username: 'official2',
          name: 'John Smith'
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

  const mockState: OfficialProfileState = {
    isLoadingDeleteOfficialProfile: false,
    isLoadingPatchOfficialProfile: false,
    isLoadingPatchOfficialProfileSignature: false,
    isLoadingPostOfficialProfile: false,
    isLoadingRequestOfficialProfile: false,
    isLoadingRequestOfficialProfiles: false,
    isApprovingOfficialProfileInvite: false,
    officialProfiles: {
      official1: mockOfficialProfile1,
      official2: mockOfficialProfile2
    }
  };

  describe('officialProfiles', () => {
    it('returns all official profiles sorted by name', () => {
      const result = officialProfiles(mockState);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Jane Doe');
      expect(result[1].name).toBe('John Smith');
    });

    it('returns empty array when no official profiles exist', () => {
      const emptyState: OfficialProfileState = {
        ...mockState,
        officialProfiles: {}
      };

      const result = officialProfiles(emptyState);

      expect(result).toEqual([]);
    });
  });

  describe('officialProfileByUsername', () => {
    it('returns official profile when username exists', () => {
      const result = officialProfileByUsername(mockState, 'official1');

      expect(result).toEqual(mockOfficialProfile1);
    });

    it('returns DEFAULT_OFFICIAL_PROFILE when username does not exist', () => {
      const result = officialProfileByUsername(mockState, 'nonexistent');

      expect(result.username).toBe('');
      expect(result.name).toBe('');
      expect(result.pendingInvites).toEqual([]);
    });

    it('returns DEFAULT_OFFICIAL_PROFILE when username is empty', () => {
      const result = officialProfileByUsername(mockState, '');

      expect(result.username).toBe('');
      expect(result.name).toBe('');
    });
  });

  describe('pendingInvitesByUsername', () => {
    it('returns pending invites for official profile with invites', () => {
      const result = pendingInvitesByUsername(mockState, 'official2');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('invite1');
      expect(result[0].registration?.tournament?.name).toBe('Test Tournament');
    });

    it('returns empty array for official profile without invites', () => {
      const result = pendingInvitesByUsername(mockState, 'official1');

      expect(result).toEqual([]);
    });

    it('returns empty array when username does not exist', () => {
      const result = pendingInvitesByUsername(mockState, 'nonexistent');

      expect(result).toEqual([]);
    });

    it('returns empty array when username is empty', () => {
      const result = pendingInvitesByUsername(mockState, '');

      expect(result).toEqual([]);
    });
  });

  describe('loading state selectors', () => {
    it('officialProfileLoading returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingRequestOfficialProfile: true
      };

      expect(officialProfileLoading(loadingState)).toBe(true);
      expect(officialProfileLoading(mockState)).toBe(false);
    });

    it('officialProfilesLoading returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingRequestOfficialProfiles: true
      };

      expect(officialProfilesLoading(loadingState)).toBe(true);
      expect(officialProfilesLoading(mockState)).toBe(false);
    });

    it('patchingOfficialProfile returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingPatchOfficialProfile: true
      };

      expect(patchingOfficialProfile(loadingState)).toBe(true);
      expect(patchingOfficialProfile(mockState)).toBe(false);
    });

    it('patchingOfficialProfileSignature returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingPatchOfficialProfileSignature: true
      };

      expect(patchingOfficialProfileSignature(loadingState)).toBe(true);
      expect(patchingOfficialProfileSignature(mockState)).toBe(false);
    });

    it('postingOfficialProfile returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingPostOfficialProfile: true
      };

      expect(postingOfficialProfile(loadingState)).toBe(true);
      expect(postingOfficialProfile(mockState)).toBe(false);
    });

    it('deletingOfficialProfile returns loading state', () => {
      const loadingState = {
        ...mockState,
        isLoadingDeleteOfficialProfile: true
      };

      expect(deletingOfficialProfile(loadingState)).toBe(true);
      expect(deletingOfficialProfile(mockState)).toBe(false);
    });

    it('approvingOfficialProfileInvite returns loading state', () => {
      const loadingState = {
        ...mockState,
        isApprovingOfficialProfileInvite: true
      };

      expect(approvingOfficialProfileInvite(loadingState)).toBe(true);
      expect(approvingOfficialProfileInvite(mockState)).toBe(false);
    });
  });
});
