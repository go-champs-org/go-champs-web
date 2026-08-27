import { Dispatch } from 'redux';
import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import {
  deleteOrganizationMemberFailure,
  deleteOrganizationMemberStart,
  deleteOrganizationMemberSuccess,
  getOrganizationMembersFailure,
  getOrganizationMembersStart,
  getOrganizationMembersSuccess,
  patchOrganizationMemberFailure,
  patchOrganizationMemberStart,
  patchOrganizationMemberSuccess,
  postOrganizationMemberFailure,
  postOrganizationMemberStart,
  postOrganizationMemberSuccess
} from './actions';
import organizationMembersHttpClient from './organizationMembersHttpClient';
import { OrganizationMemberEntity } from './state';

export const getOrganizationMembers = (organizationId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getOrganizationMembersStart());

  try {
    const response = await organizationMembersHttpClient.getAll(organizationId);

    dispatch(getOrganizationMembersSuccess(response));
  } catch (err) {
    dispatch(getOrganizationMembersFailure(err));
  }
};

export const postOrganizationMember = (
  organizationMember: OrganizationMemberEntity,
  organizationId: string
) => async (dispatch: Dispatch) => {
  dispatch(postOrganizationMemberStart());

  try {
    const response = await organizationMembersHttpClient.post(
      organizationMember,
      organizationId
    );

    dispatch(postOrganizationMemberSuccess(response));
    displayToast(`${response.username} added!`, 'is-success');
  } catch (err) {
    dispatch(postOrganizationMemberFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const patchOrganizationMember = (
  organizationMember: OrganizationMemberEntity,
  organizationId: string
) => async (dispatch: Dispatch) => {
  dispatch(patchOrganizationMemberStart());

  try {
    const response = await organizationMembersHttpClient.patch(
      organizationMember,
      organizationId
    );

    dispatch(patchOrganizationMemberSuccess(response));
    displayToast(`${response.username} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOrganizationMemberFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const deleteOrganizationMember = (
  organizationMember: OrganizationMemberEntity,
  organizationId: string
) => async (dispatch: Dispatch) => {
  dispatch(deleteOrganizationMemberStart());

  try {
    const response = await organizationMembersHttpClient.delete(
      organizationMember.id,
      organizationId
    );

    dispatch(deleteOrganizationMemberSuccess(response));
    displayToast(`${organizationMember.username} removed!`, 'is-success');
  } catch (err) {
    dispatch(deleteOrganizationMemberFailure(err));
    displayToast(`Error on removing :(`, 'is-danger');

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
