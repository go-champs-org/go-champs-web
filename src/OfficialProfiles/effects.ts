import { Dispatch } from 'redux';
import {
  deleteOfficialProfileFailure,
  deleteOfficialProfileStart,
  deleteOfficialProfileSuccess,
  patchOfficialProfileFailure,
  patchOfficialProfileStart,
  patchOfficialProfileSuccess,
  patchOfficialProfileSignatureFailure,
  patchOfficialProfileSignatureStart,
  patchOfficialProfileSignatureSuccess,
  postOfficialProfileFailure,
  postOfficialProfileStart,
  postOfficialProfileSuccess,
  requestOfficialProfileFailure,
  requestOfficialProfileStart,
  requestOfficialProfileSuccess,
  requestOfficialProfilesFailure,
  requestOfficialProfilesStart,
  requestOfficialProfilesSuccess
} from './actions';
import {
  mapApiOfficialProfileToOfficialProfileEntity,
  mapOfficialProfileEntityToApiOfficialProfilePatchRequest,
  mapOfficialProfileEntityToApiOfficialProfilePostRequest
} from './dataMappers';
import officialProfileHttpClient from './officialProfileHttpClient';
import { OfficialProfileEntity } from './state';
import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteOfficialProfile = (username: string) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteOfficialProfileStart());

  try {
    await officialProfileHttpClient.delete(username);

    dispatch(deleteOfficialProfileSuccess(username));
    displayToast('Official profile deleted!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err as any);
    dispatch(deleteOfficialProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const patchOfficialProfile = (
  officialProfile: OfficialProfileEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchOfficialProfileStart());

  const apiOfficialProfileRequest = mapOfficialProfileEntityToApiOfficialProfilePatchRequest(
    officialProfile
  );

  try {
    const response = await officialProfileHttpClient.patch(
      apiOfficialProfileRequest,
      officialProfile.username
    );

    const updatedOfficialProfile = mapApiOfficialProfileToOfficialProfileEntity(
      response.data
    );
    dispatch(patchOfficialProfileSuccess(updatedOfficialProfile));
    displayToast('Official profile updated!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err as any);
    dispatch(patchOfficialProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const patchOfficialProfileSignature = (
  signature: string,
  signaturePin: string,
  username: string
) => async (dispatch: Dispatch) => {
  dispatch(patchOfficialProfileSignatureStart());

  try {
    const response = await officialProfileHttpClient.patchSignature(
      { signature, signature_pin: signaturePin },
      username
    );

    const updatedOfficialProfile = mapApiOfficialProfileToOfficialProfileEntity(
      response.data
    );
    dispatch(patchOfficialProfileSignatureSuccess(updatedOfficialProfile));
    displayToast('Signature updated!', 'is-success');
    window.location.href = `/Account/EditOfficialProfile/${username}`;
  } catch (err) {
    const apiError = new ApiError(err as any);
    dispatch(patchOfficialProfileSignatureFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const postOfficialProfile = (
  officialProfile: OfficialProfileEntity
) => async (dispatch: Dispatch) => {
  dispatch(postOfficialProfileStart());

  const apiOfficialProfileRequest = mapOfficialProfileEntityToApiOfficialProfilePostRequest(
    officialProfile
  );

  try {
    const response = await officialProfileHttpClient.post(
      apiOfficialProfileRequest
    );

    const newOfficialProfile = mapApiOfficialProfileToOfficialProfileEntity(
      response.data
    );
    dispatch(postOfficialProfileSuccess(newOfficialProfile));
    displayToast('Official profile created!', 'is-success');
  } catch (err) {
    const apiError = new ApiError(err as any);
    dispatch(postOfficialProfileFailure(err));
    displayToast(apiError.message, 'is-danger');
  }
};

export const requestOfficialProfile = (username: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestOfficialProfileStart());

  try {
    const response = await officialProfileHttpClient.get(username);

    const officialProfile = mapApiOfficialProfileToOfficialProfileEntity(
      response.data
    );
    dispatch(requestOfficialProfileSuccess(officialProfile));
  } catch (err) {
    dispatch(requestOfficialProfileFailure(err));
  }
};

export const requestOfficialProfiles = () => async (dispatch: Dispatch) => {
  dispatch(requestOfficialProfilesStart());

  try {
    const response = await officialProfileHttpClient.getAll();

    const officialProfiles = response.data.map(
      mapApiOfficialProfileToOfficialProfileEntity
    );
    dispatch(requestOfficialProfilesSuccess(officialProfiles));
  } catch (err) {
    dispatch(requestOfficialProfilesFailure(err));
  }
};
