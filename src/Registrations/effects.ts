import { displayToast } from '../Shared/bulma/toast';
import {
  deleteRegistrationFailure,
  deleteRegistrationStart,
  deleteRegistrationSuccess,
  patchRegistrationFailure,
  patchRegistrationStart,
  patchRegistrationSuccess,
  putRegistrationGenerateInvitesStart,
  putRegistrationGenerateInvitesSuccess,
  putRegistrationGenerateInvitesFailure,
  postRegistrationFailure,
  postRegistrationStart,
  postRegistrationSuccess,
  getRegistrationStart,
  getRegistrationSuccess,
  getRegistrationFailure,
  getRegistrationInviteFailure,
  getRegistrationInviteSuccess,
  getRegistrationInviteStart,
  putRegistrationResponseApproveStart,
  putRegistrationResponseApproveSuccess,
  putRegistrationResponseApproveFailure
} from './actions';
import { RegistrationEntity, RegistrationResponseEntity } from './state';
import registrationHttpClient from './registrationHttpClient';
import registrationResponseHttpClient from './registrationResponseHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';
import registrationInviteHttpClient from './registrationInviteHttpClient';

export const deleteRegistration = (registration: RegistrationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteRegistrationStart());

  try {
    const response = await registrationHttpClient.delete(registration.id);

    dispatch(deleteRegistrationSuccess(response));
    displayToast(`${registration.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteRegistrationFailure(err));
  }
};

export const getRegistration = (registrationId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getRegistrationStart());

  try {
    const response = await registrationHttpClient.get(registrationId);

    dispatch(getRegistrationSuccess(response));
  } catch (err) {
    dispatch(getRegistrationFailure(err));
  }
};

export const getRegistrationInvite = (registrationInviteId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getRegistrationInviteStart());

  try {
    const response = await registrationInviteHttpClient.get(
      registrationInviteId
    );

    dispatch(getRegistrationInviteSuccess(response));
  } catch (err) {
    dispatch(getRegistrationInviteFailure(err));
  }
};

export const patchRegistration = (registration: RegistrationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchRegistrationStart());

  try {
    const response = await registrationHttpClient.patch(registration);

    dispatch(patchRegistrationSuccess(response));
    displayToast(`${response.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchRegistrationFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const putRegistrationGenerateInvites = (
  registrationId: string
) => async (dispatch: Dispatch) => {
  dispatch(putRegistrationGenerateInvitesStart());

  try {
    const response = await registrationHttpClient.generateInvites(
      registrationId
    );

    dispatch(putRegistrationGenerateInvitesSuccess(response));
    displayToast(`${response.title} invites generated!`, 'is-success');
  } catch (err) {
    dispatch(putRegistrationGenerateInvitesFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postRegistration = (
  registration: RegistrationEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postRegistrationStart());

  try {
    const response = await registrationHttpClient.post(
      registration,
      tournamentId
    );

    dispatch(postRegistrationSuccess(response));
    displayToast(`${response.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postRegistrationFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const putRegistrationResponseApprove = (
  registrationResponses: RegistrationResponseEntity[]
) => async (dispatch: Dispatch) => {
  dispatch(putRegistrationResponseApproveStart());

  try {
    const response = await registrationResponseHttpClient.approve(
      registrationResponses
    );

    dispatch(putRegistrationResponseApproveSuccess(response));
    displayToast('Responses were approved!', 'is-success');
  } catch (err) {
    dispatch(putRegistrationResponseApproveFailure(err));

    if (err instanceof ApiError) {
      displayToast(err.payload.data.errors, 'is-danger');
    }
  }
};
