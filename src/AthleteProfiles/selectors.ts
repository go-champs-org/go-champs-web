import {
  AthleteProfileEntity,
  AthleteProfileState,
  DEFAULT_ATHLETE_PROFILE
} from './state';

export const athleteProfiles = (
  state: AthleteProfileState
): AthleteProfileEntity[] =>
  Object.keys(state.athleteProfiles)
    .map((key: string) => state.athleteProfiles[key])
    .sort(byAthleteProfileName);

const byAthleteProfileName = (
  athleteProfileA: AthleteProfileEntity,
  athleteProfileB: AthleteProfileEntity
): number => athleteProfileA.name.localeCompare(athleteProfileB.name);

export const athleteProfileByUsername = (
  state: AthleteProfileState,
  username: string
) => {
  if (!username || !state.athleteProfiles[username]) {
    return DEFAULT_ATHLETE_PROFILE;
  }

  return state.athleteProfiles[username];
};

export const athleteProfilesLoading = (state: AthleteProfileState) =>
  state.isLoadingRequestAthleteProfiles;
export const patchingAthleteProfile = (state: AthleteProfileState): boolean =>
  state.isLoadingPatchAthleteProfile;
export const postingAthleteProfile = (state: AthleteProfileState): boolean =>
  state.isLoadingPostAthleteProfile;
export const deletingAthleteProfile = (state: AthleteProfileState): boolean =>
  state.isLoadingDeleteAthleteProfile;
