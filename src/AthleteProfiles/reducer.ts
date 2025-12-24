import {
  createReducer,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  DELETE_ATHLETE_PROFILE,
  DELETE_ATHLETE_PROFILE_FAILURE,
  DELETE_ATHLETE_PROFILE_SUCCESS,
  PATCH_ATHLETE_PROFILE,
  PATCH_ATHLETE_PROFILE_FAILURE,
  PATCH_ATHLETE_PROFILE_SUCCESS,
  POST_ATHLETE_PROFILE,
  POST_ATHLETE_PROFILE_FAILURE,
  POST_ATHLETE_PROFILE_SUCCESS,
  REQUEST_ATHLETE_PROFILE,
  REQUEST_ATHLETE_PROFILE_FAILURE,
  REQUEST_ATHLETE_PROFILE_SUCCESS,
  REQUEST_ATHLETE_PROFILES,
  REQUEST_ATHLETE_PROFILES_FAILURE,
  REQUEST_ATHLETE_PROFILES_SUCCESS
} from './actions';
import {
  AthleteProfileEntity,
  AthleteProfileState,
  initialState
} from './state';

const athleteProfileMapEntities = mapEntities<AthleteProfileEntity>(
  returnProperty('username')
);

const deleteAthleteProfile = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingDeleteAthleteProfile: true
});

const deleteAthleteProfileFailure = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingDeleteAthleteProfile: false
});

const deleteAthleteProfileSuccess = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => {
  const athleteProfiles = Object.keys(state.athleteProfiles)
    .filter((username: string) => username !== action.payload)
    .reduce(mapEntitiesByKey(state.athleteProfiles), {});
  return {
    ...state,
    isLoadingDeleteAthleteProfile: false,
    athleteProfiles
  };
};

const patchAthleteProfile = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchAthleteProfile: true
});

const patchAthleteProfileFailure = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPatchAthleteProfile: false
});

const patchAthleteProfileSuccess = (
  state: AthleteProfileState,
  action: HttpAction<string, AthleteProfileEntity>
) => ({
  ...state,
  isLoadingPatchAthleteProfile: false,
  athleteProfiles: [action.payload].reduce(
    athleteProfileMapEntities,
    state.athleteProfiles
  )
});

const postAthleteProfile = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPostAthleteProfile: true
});

const postAthleteProfileFailure = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingPostAthleteProfile: false
});

const postAthleteProfileSuccess = (
  state: AthleteProfileState,
  action: HttpAction<string, AthleteProfileEntity>
) => ({
  ...state,
  isLoadingPostAthleteProfile: false,
  athleteProfiles: [action.payload].reduce(
    athleteProfileMapEntities,
    state.athleteProfiles
  )
});

const requestAthleteProfile = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestAthleteProfile: true
});

const requestAthleteProfileFailure = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestAthleteProfile: false
});

const requestAthleteProfileSuccess = (
  state: AthleteProfileState,
  action: HttpAction<string, AthleteProfileEntity>
) => ({
  ...state,
  isLoadingRequestAthleteProfile: false,
  athleteProfiles: [action.payload].reduce(
    athleteProfileMapEntities,
    state.athleteProfiles
  )
});

const requestAthleteProfiles = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestAthleteProfiles: true
});

const requestAthleteProfilesFailure = (
  state: AthleteProfileState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestAthleteProfiles: false
});

const requestAthleteProfilesSuccess = (
  state: AthleteProfileState,
  action: HttpAction<string, AthleteProfileEntity[]>
) => ({
  ...state,
  isLoadingRequestAthleteProfiles: false,
  athleteProfiles: action.payload!.reduce(athleteProfileMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_ATHLETE_PROFILE]: deleteAthleteProfile,
  [DELETE_ATHLETE_PROFILE_FAILURE]: deleteAthleteProfileFailure,
  [DELETE_ATHLETE_PROFILE_SUCCESS]: deleteAthleteProfileSuccess,
  [PATCH_ATHLETE_PROFILE]: patchAthleteProfile,
  [PATCH_ATHLETE_PROFILE_FAILURE]: patchAthleteProfileFailure,
  [PATCH_ATHLETE_PROFILE_SUCCESS]: patchAthleteProfileSuccess,
  [POST_ATHLETE_PROFILE]: postAthleteProfile,
  [POST_ATHLETE_PROFILE_FAILURE]: postAthleteProfileFailure,
  [POST_ATHLETE_PROFILE_SUCCESS]: postAthleteProfileSuccess,
  [REQUEST_ATHLETE_PROFILE]: requestAthleteProfile,
  [REQUEST_ATHLETE_PROFILE_FAILURE]: requestAthleteProfileFailure,
  [REQUEST_ATHLETE_PROFILE_SUCCESS]: requestAthleteProfileSuccess,
  [REQUEST_ATHLETE_PROFILES]: requestAthleteProfiles,
  [REQUEST_ATHLETE_PROFILES_FAILURE]: requestAthleteProfilesFailure,
  [REQUEST_ATHLETE_PROFILES_SUCCESS]: requestAthleteProfilesSuccess
});
