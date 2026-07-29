import {
  OfficialProfileEntity,
  OfficialProfileState,
  DEFAULT_OFFICIAL_PROFILE
} from './state';
import { ApiOfficialInviteWithDetails } from '../Shared/httpClient/apiTypes';

export const officialProfiles = (
  state: OfficialProfileState
): OfficialProfileEntity[] =>
  Object.keys(state.officialProfiles)
    .map((key: string) => state.officialProfiles[key])
    .sort(byOfficialProfileName);

const byOfficialProfileName = (
  officialProfileA: OfficialProfileEntity,
  officialProfileB: OfficialProfileEntity
): number => officialProfileA.name.localeCompare(officialProfileB.name);

export const officialProfileByUsername = (
  state: OfficialProfileState,
  username: string
) => {
  if (!username || !state.officialProfiles[username]) {
    return DEFAULT_OFFICIAL_PROFILE;
  }

  return state.officialProfiles[username];
};

export const officialProfileLoading = (state: OfficialProfileState): boolean =>
  state.isLoadingRequestOfficialProfile;
export const officialProfilesLoading = (state: OfficialProfileState): boolean =>
  state.isLoadingRequestOfficialProfiles;
export const patchingOfficialProfile = (state: OfficialProfileState): boolean =>
  state.isLoadingPatchOfficialProfile;
export const patchingOfficialProfileSignature = (
  state: OfficialProfileState
): boolean => state.isLoadingPatchOfficialProfileSignature;
export const postingOfficialProfile = (state: OfficialProfileState): boolean =>
  state.isLoadingPostOfficialProfile;
export const deletingOfficialProfile = (state: OfficialProfileState): boolean =>
  state.isLoadingDeleteOfficialProfile;

export const pendingInvitesByUsername = (
  state: OfficialProfileState,
  username: string
): ApiOfficialInviteWithDetails[] => {
  const officialProfile = officialProfileByUsername(state, username);
  return officialProfile.pendingInvites || [];
};

export const approvingOfficialProfileInvite = (
  state: OfficialProfileState
): boolean => state.isApprovingOfficialProfileInvite;
