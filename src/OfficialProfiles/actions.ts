import { OfficialProfileEntity } from './state';

export const DELETE_OFFICIAL_PROFILE = 'DELETE_OFFICIAL_PROFILE';
export const DELETE_OFFICIAL_PROFILE_SUCCESS =
  'DELETE_OFFICIAL_PROFILE_SUCCESS';
export const DELETE_OFFICIAL_PROFILE_FAILURE =
  'DELETE_OFFICIAL_PROFILE_FAILURE';

export const PATCH_OFFICIAL_PROFILE = 'PATCH_OFFICIAL_PROFILE';
export const PATCH_OFFICIAL_PROFILE_SUCCESS = 'PATCH_OFFICIAL_PROFILE_SUCCESS';
export const PATCH_OFFICIAL_PROFILE_FAILURE = 'PATCH_OFFICIAL_PROFILE_FAILURE';

export const PATCH_OFFICIAL_PROFILE_SIGNATURE =
  'PATCH_OFFICIAL_PROFILE_SIGNATURE';
export const PATCH_OFFICIAL_PROFILE_SIGNATURE_SUCCESS =
  'PATCH_OFFICIAL_PROFILE_SIGNATURE_SUCCESS';
export const PATCH_OFFICIAL_PROFILE_SIGNATURE_FAILURE =
  'PATCH_OFFICIAL_PROFILE_SIGNATURE_FAILURE';

export const POST_OFFICIAL_PROFILE = 'POST_OFFICIAL_PROFILE';
export const POST_OFFICIAL_PROFILE_SUCCESS = 'POST_OFFICIAL_PROFILE_SUCCESS';
export const POST_OFFICIAL_PROFILE_FAILURE = 'POST_OFFICIAL_PROFILE_FAILURE';

export const REQUEST_OFFICIAL_PROFILE = 'REQUEST_OFFICIAL_PROFILE';
export const REQUEST_OFFICIAL_PROFILE_SUCCESS =
  'REQUEST_OFFICIAL_PROFILE_SUCCESS';
export const REQUEST_OFFICIAL_PROFILE_FAILURE =
  'REQUEST_OFFICIAL_PROFILE_FAILURE';

export const REQUEST_OFFICIAL_PROFILES = 'REQUEST_OFFICIAL_PROFILES';
export const REQUEST_OFFICIAL_PROFILES_SUCCESS =
  'REQUEST_OFFICIAL_PROFILES_SUCCESS';
export const REQUEST_OFFICIAL_PROFILES_FAILURE =
  'REQUEST_OFFICIAL_PROFILES_FAILURE';

export const deleteOfficialProfileStart = () => ({
  type: DELETE_OFFICIAL_PROFILE
});

export const deleteOfficialProfileSuccess = (username: string) => ({
  type: DELETE_OFFICIAL_PROFILE_SUCCESS,
  payload: username
});

export const deleteOfficialProfileFailure = (error: any) => ({
  type: DELETE_OFFICIAL_PROFILE_FAILURE,
  payload: error
});

export const patchOfficialProfileStart = () => ({
  type: PATCH_OFFICIAL_PROFILE
});

export const patchOfficialProfileSuccess = (
  officialProfile: OfficialProfileEntity
) => ({
  type: PATCH_OFFICIAL_PROFILE_SUCCESS,
  payload: officialProfile
});

export const patchOfficialProfileFailure = (error: any) => ({
  type: PATCH_OFFICIAL_PROFILE_FAILURE,
  payload: error
});

export const patchOfficialProfileSignatureStart = () => ({
  type: PATCH_OFFICIAL_PROFILE_SIGNATURE
});

export const patchOfficialProfileSignatureSuccess = (
  officialProfile: OfficialProfileEntity
) => ({
  type: PATCH_OFFICIAL_PROFILE_SIGNATURE_SUCCESS,
  payload: officialProfile
});

export const patchOfficialProfileSignatureFailure = (error: any) => ({
  type: PATCH_OFFICIAL_PROFILE_SIGNATURE_FAILURE,
  payload: error
});

export const postOfficialProfileStart = () => ({
  type: POST_OFFICIAL_PROFILE
});

export const postOfficialProfileSuccess = (
  officialProfile: OfficialProfileEntity
) => ({
  type: POST_OFFICIAL_PROFILE_SUCCESS,
  payload: officialProfile
});

export const postOfficialProfileFailure = (error: any) => ({
  type: POST_OFFICIAL_PROFILE_FAILURE,
  payload: error
});

export const requestOfficialProfileStart = () => ({
  type: REQUEST_OFFICIAL_PROFILE
});

export const requestOfficialProfileSuccess = (
  officialProfile: OfficialProfileEntity
) => ({
  type: REQUEST_OFFICIAL_PROFILE_SUCCESS,
  payload: officialProfile
});

export const requestOfficialProfileFailure = (error: any) => ({
  type: REQUEST_OFFICIAL_PROFILE_FAILURE,
  payload: error
});

export const requestOfficialProfilesStart = () => ({
  type: REQUEST_OFFICIAL_PROFILES
});

export const requestOfficialProfilesSuccess = (
  officialProfiles: OfficialProfileEntity[]
) => ({
  type: REQUEST_OFFICIAL_PROFILES_SUCCESS,
  payload: officialProfiles
});

export const requestOfficialProfilesFailure = (error: any) => ({
  type: REQUEST_OFFICIAL_PROFILES_FAILURE,
  payload: error
});
