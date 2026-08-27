import { HttpAction } from '../Shared/store/interfaces';
import { OrganizationMemberEntity } from './state';

export const GET_ORGANIZATION_MEMBERS = 'API_GET_ORGANIZATION_MEMBERS';
export const GET_ORGANIZATION_MEMBERS_SUCCESS =
  'API_GET_ORGANIZATION_MEMBERS_SUCCESS';
export const GET_ORGANIZATION_MEMBERS_FAILURE =
  'API_GET_ORGANIZATION_MEMBERS_FAILURE';
export const POST_ORGANIZATION_MEMBER = 'API_POST_ORGANIZATION_MEMBER';
export const POST_ORGANIZATION_MEMBER_SUCCESS =
  'API_POST_ORGANIZATION_MEMBER_SUCCESS';
export const POST_ORGANIZATION_MEMBER_FAILURE =
  'API_POST_ORGANIZATION_MEMBER_FAILURE';
export const PATCH_ORGANIZATION_MEMBER = 'API_PATCH_ORGANIZATION_MEMBER';
export const PATCH_ORGANIZATION_MEMBER_SUCCESS =
  'API_PATCH_ORGANIZATION_MEMBER_SUCCESS';
export const PATCH_ORGANIZATION_MEMBER_FAILURE =
  'API_PATCH_ORGANIZATION_MEMBER_FAILURE';
export const DELETE_ORGANIZATION_MEMBER = 'API_DELETE_ORGANIZATION_MEMBER';
export const DELETE_ORGANIZATION_MEMBER_SUCCESS =
  'API_DELETE_ORGANIZATION_MEMBER_SUCCESS';
export const DELETE_ORGANIZATION_MEMBER_FAILURE =
  'API_DELETE_ORGANIZATION_MEMBER_FAILURE';

export const getOrganizationMembersStart = (): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATION_MEMBERS
});

export const getOrganizationMembersSuccess = (
  payload: OrganizationMemberEntity[]
): HttpAction<ActionTypes, OrganizationMemberEntity[]> => ({
  type: GET_ORGANIZATION_MEMBERS_SUCCESS,
  payload
});

export const getOrganizationMembersFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATION_MEMBERS_FAILURE,
  payload
});

export const postOrganizationMemberStart = (): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION_MEMBER
});

export const postOrganizationMemberSuccess = (
  payload: OrganizationMemberEntity
): HttpAction<ActionTypes, OrganizationMemberEntity> => ({
  type: POST_ORGANIZATION_MEMBER_SUCCESS,
  payload
});

export const postOrganizationMemberFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION_MEMBER_FAILURE,
  payload
});

export const patchOrganizationMemberStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION_MEMBER
});

export const patchOrganizationMemberSuccess = (
  payload: OrganizationMemberEntity
): HttpAction<ActionTypes, OrganizationMemberEntity> => ({
  type: PATCH_ORGANIZATION_MEMBER_SUCCESS,
  payload
});

export const patchOrganizationMemberFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION_MEMBER_FAILURE,
  payload
});

export const deleteOrganizationMemberStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION_MEMBER
});

export const deleteOrganizationMemberSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_ORGANIZATION_MEMBER_SUCCESS,
  payload
});

export const deleteOrganizationMemberFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION_MEMBER_FAILURE,
  payload
});

export type ActionTypes =
  | typeof GET_ORGANIZATION_MEMBERS
  | typeof GET_ORGANIZATION_MEMBERS_SUCCESS
  | typeof GET_ORGANIZATION_MEMBERS_FAILURE
  | typeof POST_ORGANIZATION_MEMBER
  | typeof POST_ORGANIZATION_MEMBER_SUCCESS
  | typeof POST_ORGANIZATION_MEMBER_FAILURE
  | typeof PATCH_ORGANIZATION_MEMBER
  | typeof PATCH_ORGANIZATION_MEMBER_SUCCESS
  | typeof PATCH_ORGANIZATION_MEMBER_FAILURE
  | typeof DELETE_ORGANIZATION_MEMBER
  | typeof DELETE_ORGANIZATION_MEMBER_SUCCESS
  | typeof DELETE_ORGANIZATION_MEMBER_FAILURE;
export type Actions = HttpAction<ActionTypes>;
