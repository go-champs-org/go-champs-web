import {
  createReducer,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  DELETE_OFFICIAL_PROFILE,
  DELETE_OFFICIAL_PROFILE_FAILURE,
  DELETE_OFFICIAL_PROFILE_SUCCESS,
  PATCH_OFFICIAL_PROFILE,
  PATCH_OFFICIAL_PROFILE_FAILURE,
  PATCH_OFFICIAL_PROFILE_SUCCESS,
  PATCH_OFFICIAL_PROFILE_SIGNATURE,
  PATCH_OFFICIAL_PROFILE_SIGNATURE_FAILURE,
  PATCH_OFFICIAL_PROFILE_SIGNATURE_SUCCESS,
  POST_OFFICIAL_PROFILE,
  POST_OFFICIAL_PROFILE_FAILURE,
  POST_OFFICIAL_PROFILE_SUCCESS,
  REQUEST_OFFICIAL_PROFILE,
  REQUEST_OFFICIAL_PROFILE_FAILURE,
  REQUEST_OFFICIAL_PROFILE_SUCCESS,
  REQUEST_OFFICIAL_PROFILES,
  REQUEST_OFFICIAL_PROFILES_FAILURE,
  REQUEST_OFFICIAL_PROFILES_SUCCESS
} from './actions';
import {
  OfficialProfileEntity,
  OfficialProfileState,
  initialState
} from './state';

const officialProfileMapEntities = mapEntities<OfficialProfileEntity>(
  returnProperty('username')
);

const deleteOfficialProfile = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingDeleteOfficialProfile: true
});

const deleteOfficialProfileFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingDeleteOfficialProfile: false
});

const deleteOfficialProfileSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => {
  const officialProfiles = Object.keys(state.officialProfiles)
    .filter((username: string) => username !== action.payload)
    .reduce(mapEntitiesByKey(state.officialProfiles), {});
  return {
    ...state,
    isLoadingDeleteOfficialProfile: false,
    officialProfiles
  };
};

const patchOfficialProfile = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchOfficialProfile: true
});

const patchOfficialProfileFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchOfficialProfile: false
});

const patchOfficialProfileSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string, OfficialProfileEntity>
) => ({
  ...state,
  isLoadingPatchOfficialProfile: false,
  officialProfiles: [action.payload].reduce(
    officialProfileMapEntities,
    state.officialProfiles
  )
});

const patchOfficialProfileSignature = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchOfficialProfileSignature: true
});

const patchOfficialProfileSignatureFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchOfficialProfileSignature: false
});

const patchOfficialProfileSignatureSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string, string>
) => ({
  ...state,
  isLoadingPatchOfficialProfileSignature: false
});

const postOfficialProfile = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPostOfficialProfile: true
});

const postOfficialProfileFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPostOfficialProfile: false
});

const postOfficialProfileSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string, OfficialProfileEntity>
) => ({
  ...state,
  isLoadingPostOfficialProfile: false,
  officialProfiles: [action.payload].reduce(
    officialProfileMapEntities,
    state.officialProfiles
  )
});

const requestOfficialProfile = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestOfficialProfile: true
});

const requestOfficialProfileFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestOfficialProfile: false
});

const requestOfficialProfileSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string, OfficialProfileEntity>
) => ({
  ...state,
  isLoadingRequestOfficialProfile: false,
  officialProfiles: [action.payload].reduce(
    officialProfileMapEntities,
    state.officialProfiles
  )
});

const requestOfficialProfiles = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestOfficialProfiles: true
});

const requestOfficialProfilesFailure = (
  state: OfficialProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestOfficialProfiles: false
});

const requestOfficialProfilesSuccess = (
  state: OfficialProfileState,
  action: HttpAction<string, OfficialProfileEntity[]>
) => ({
  ...state,
  isLoadingRequestOfficialProfiles: false,
  officialProfiles: action.payload!.reduce(officialProfileMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_OFFICIAL_PROFILE]: deleteOfficialProfile,
  [DELETE_OFFICIAL_PROFILE_FAILURE]: deleteOfficialProfileFailure,
  [DELETE_OFFICIAL_PROFILE_SUCCESS]: deleteOfficialProfileSuccess,
  [PATCH_OFFICIAL_PROFILE]: patchOfficialProfile,
  [PATCH_OFFICIAL_PROFILE_FAILURE]: patchOfficialProfileFailure,
  [PATCH_OFFICIAL_PROFILE_SUCCESS]: patchOfficialProfileSuccess,
  [PATCH_OFFICIAL_PROFILE_SIGNATURE]: patchOfficialProfileSignature,
  [PATCH_OFFICIAL_PROFILE_SIGNATURE_FAILURE]: patchOfficialProfileSignatureFailure,
  [PATCH_OFFICIAL_PROFILE_SIGNATURE_SUCCESS]: patchOfficialProfileSignatureSuccess,
  [POST_OFFICIAL_PROFILE]: postOfficialProfile,
  [POST_OFFICIAL_PROFILE_FAILURE]: postOfficialProfileFailure,
  [POST_OFFICIAL_PROFILE_SUCCESS]: postOfficialProfileSuccess,
  [REQUEST_OFFICIAL_PROFILE]: requestOfficialProfile,
  [REQUEST_OFFICIAL_PROFILE_FAILURE]: requestOfficialProfileFailure,
  [REQUEST_OFFICIAL_PROFILE_SUCCESS]: requestOfficialProfileSuccess,
  [REQUEST_OFFICIAL_PROFILES]: requestOfficialProfiles,
  [REQUEST_OFFICIAL_PROFILES_FAILURE]: requestOfficialProfilesFailure,
  [REQUEST_OFFICIAL_PROFILES_SUCCESS]: requestOfficialProfilesSuccess
});
