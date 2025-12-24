import { AthleteProfileEntity } from './state';

export const DELETE_ATHLETE_PROFILE = 'DELETE_ATHLETE_PROFILE';
export const DELETE_ATHLETE_PROFILE_SUCCESS = 'DELETE_ATHLETE_PROFILE_SUCCESS';
export const DELETE_ATHLETE_PROFILE_FAILURE = 'DELETE_ATHLETE_PROFILE_FAILURE';

export const PATCH_ATHLETE_PROFILE = 'PATCH_ATHLETE_PROFILE';
export const PATCH_ATHLETE_PROFILE_SUCCESS = 'PATCH_ATHLETE_PROFILE_SUCCESS';
export const PATCH_ATHLETE_PROFILE_FAILURE = 'PATCH_ATHLETE_PROFILE_FAILURE';

export const POST_ATHLETE_PROFILE = 'POST_ATHLETE_PROFILE';
export const POST_ATHLETE_PROFILE_SUCCESS = 'POST_ATHLETE_PROFILE_SUCCESS';
export const POST_ATHLETE_PROFILE_FAILURE = 'POST_ATHLETE_PROFILE_FAILURE';

export const REQUEST_ATHLETE_PROFILE = 'REQUEST_ATHLETE_PROFILE';
export const REQUEST_ATHLETE_PROFILE_SUCCESS =
  'REQUEST_ATHLETE_PROFILE_SUCCESS';
export const REQUEST_ATHLETE_PROFILE_FAILURE =
  'REQUEST_ATHLETE_PROFILE_FAILURE';

export const REQUEST_ATHLETE_PROFILES = 'REQUEST_ATHLETE_PROFILES';
export const REQUEST_ATHLETE_PROFILES_SUCCESS =
  'REQUEST_ATHLETE_PROFILES_SUCCESS';
export const REQUEST_ATHLETE_PROFILES_FAILURE =
  'REQUEST_ATHLETE_PROFILES_FAILURE';

export const deleteAthleteProfileStart = () => ({
  type: DELETE_ATHLETE_PROFILE
});

export const deleteAthleteProfileSuccess = (username: string) => ({
  type: DELETE_ATHLETE_PROFILE_SUCCESS,
  payload: username
});

export const deleteAthleteProfileFailure = (error: any) => ({
  type: DELETE_ATHLETE_PROFILE_FAILURE,
  payload: error
});

export const patchAthleteProfileStart = () => ({
  type: PATCH_ATHLETE_PROFILE
});

export const patchAthleteProfileSuccess = (
  athleteProfile: AthleteProfileEntity
) => ({
  type: PATCH_ATHLETE_PROFILE_SUCCESS,
  payload: athleteProfile
});

export const patchAthleteProfileFailure = (error: any) => ({
  type: PATCH_ATHLETE_PROFILE_FAILURE,
  payload: error
});

export const postAthleteProfileStart = () => ({
  type: POST_ATHLETE_PROFILE
});

export const postAthleteProfileSuccess = (
  athleteProfile: AthleteProfileEntity
) => ({
  type: POST_ATHLETE_PROFILE_SUCCESS,
  payload: athleteProfile
});

export const postAthleteProfileFailure = (error: any) => ({
  type: POST_ATHLETE_PROFILE_FAILURE,
  payload: error
});

export const requestAthleteProfileStart = () => ({
  type: REQUEST_ATHLETE_PROFILE
});

export const requestAthleteProfileSuccess = (
  athleteProfile: AthleteProfileEntity
) => ({
  type: REQUEST_ATHLETE_PROFILE_SUCCESS,
  payload: athleteProfile
});

export const requestAthleteProfileFailure = (error: any) => ({
  type: REQUEST_ATHLETE_PROFILE_FAILURE,
  payload: error
});

export const requestAthleteProfilesStart = () => ({
  type: REQUEST_ATHLETE_PROFILES
});

export const requestAthleteProfilesSuccess = (
  athleteProfiles: AthleteProfileEntity[]
) => ({
  type: REQUEST_ATHLETE_PROFILES_SUCCESS,
  payload: athleteProfiles
});

export const requestAthleteProfilesFailure = (error: any) => ({
  type: REQUEST_ATHLETE_PROFILES_FAILURE,
  payload: error
});
