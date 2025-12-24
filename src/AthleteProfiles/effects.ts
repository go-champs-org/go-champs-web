import { Dispatch } from 'redux';
import {
  deleteAthleteProfileFailure,
  deleteAthleteProfileStart,
  deleteAthleteProfileSuccess,
  patchAthleteProfileFailure,
  patchAthleteProfileStart,
  patchAthleteProfileSuccess,
  postAthleteProfileFailure,
  postAthleteProfileStart,
  postAthleteProfileSuccess,
  requestAthleteProfileFailure,
  requestAthleteProfileStart,
  requestAthleteProfileSuccess,
  requestAthleteProfilesFailure,
  requestAthleteProfilesStart,
  requestAthleteProfilesSuccess
} from './actions';
import {
  mapApiAthleteProfileToAthleteProfileEntity,
  mapAthleteProfileEntityToApiAthleteProfilePatchRequest,
  mapAthleteProfileEntityToApiAthleteProfilePostRequest
} from './dataMappers';
import athleteProfileHttpClient from './athleteProfileHttpClient';
import { AthleteProfileEntity } from './state';
import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteAthleteProfile = (username: string) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteAthleteProfileStart());

  try {
    await athleteProfileHttpClient.delete(username);

    dispatch(deleteAthleteProfileSuccess(username));
    displayToast('Athlete profile deleted!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err);
    dispatch(deleteAthleteProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const patchAthleteProfile = (
  athleteProfile: AthleteProfileEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchAthleteProfileStart());

  const apiAthleteProfileRequest = mapAthleteProfileEntityToApiAthleteProfilePatchRequest(
    athleteProfile
  );

  try {
    const response = await athleteProfileHttpClient.patch(
      apiAthleteProfileRequest,
      athleteProfile.username
    );

    const updatedAthleteProfile = mapApiAthleteProfileToAthleteProfileEntity(
      response.data
    );
    dispatch(patchAthleteProfileSuccess(updatedAthleteProfile));
    displayToast('Athlete profile updated!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err);
    dispatch(patchAthleteProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const postAthleteProfile = (
  athleteProfile: AthleteProfileEntity
) => async (dispatch: Dispatch) => {
  dispatch(postAthleteProfileStart());

  const apiAthleteProfileRequest = mapAthleteProfileEntityToApiAthleteProfilePostRequest(
    athleteProfile
  );

  try {
    const response = await athleteProfileHttpClient.post(
      apiAthleteProfileRequest
    );

    const newAthleteProfile = mapApiAthleteProfileToAthleteProfileEntity(
      response.data
    );
    dispatch(postAthleteProfileSuccess(newAthleteProfile));
    displayToast('Athlete profile created!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err);
    dispatch(postAthleteProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const requestAthleteProfile = (username: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestAthleteProfileStart());

  try {
    const response = await athleteProfileHttpClient.get(username);

    const athleteProfile = mapApiAthleteProfileToAthleteProfileEntity(
      response.data
    );
    dispatch(requestAthleteProfileSuccess(athleteProfile));
  } catch (err) {
    dispatch(requestAthleteProfileFailure(err));
  }
};

export const requestAthleteProfiles = () => async (dispatch: Dispatch) => {
  dispatch(requestAthleteProfilesStart());

  try {
    const response = await athleteProfileHttpClient.getAll();

    const athleteProfiles = response.data.map(
      mapApiAthleteProfileToAthleteProfileEntity
    );
    dispatch(requestAthleteProfilesSuccess(athleteProfiles));
  } catch (err) {
    dispatch(requestAthleteProfilesFailure(err));
  }
};
