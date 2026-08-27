import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_ORGANIZATION_MEMBER,
  DELETE_ORGANIZATION_MEMBER_FAILURE,
  DELETE_ORGANIZATION_MEMBER_SUCCESS,
  GET_ORGANIZATION_MEMBERS,
  GET_ORGANIZATION_MEMBERS_FAILURE,
  GET_ORGANIZATION_MEMBERS_SUCCESS,
  PATCH_ORGANIZATION_MEMBER,
  PATCH_ORGANIZATION_MEMBER_FAILURE,
  PATCH_ORGANIZATION_MEMBER_SUCCESS,
  POST_ORGANIZATION_MEMBER,
  POST_ORGANIZATION_MEMBER_FAILURE,
  POST_ORGANIZATION_MEMBER_SUCCESS
} from './actions';
import {
  initialState,
  OrganizationMemberEntity,
  OrganizationMemberState
} from './state';

const organizationMemberMapEntities = mapEntities<OrganizationMemberEntity>(
  returnProperty('id')
);

const getOrganizationMembers = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingRequestOrganizationMembers: true
});

const getOrganizationMembersFailure = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingRequestOrganizationMembers: false
});

const getOrganizationMembersSuccess = (
  state: OrganizationMemberState,
  action: HttpAction<ActionTypes, OrganizationMemberEntity[]>
) => ({
  ...state,
  isLoadingRequestOrganizationMembers: false,
  organizationMembers: action.payload!.reduce(organizationMemberMapEntities, {})
});

const postOrganizationMember = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingPostOrganizationMember: true
});

const postOrganizationMemberFailure = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingPostOrganizationMember: false
});

const postOrganizationMemberSuccess = (
  state: OrganizationMemberState,
  action: HttpAction<ActionTypes, OrganizationMemberEntity>
) => ({
  ...state,
  isLoadingPostOrganizationMember: false,
  organizationMembers: [action.payload!].reduce(
    organizationMemberMapEntities,
    state.organizationMembers
  )
});

const patchOrganizationMember = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingPatchOrganizationMember: true
});

const patchOrganizationMemberFailure = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingPatchOrganizationMember: false
});

const patchOrganizationMemberSuccess = (
  state: OrganizationMemberState,
  action: HttpAction<ActionTypes, OrganizationMemberEntity>
) => ({
  ...state,
  isLoadingPatchOrganizationMember: false,
  organizationMembers: [action.payload!].reduce(
    organizationMemberMapEntities,
    state.organizationMembers
  )
});

const deleteOrganizationMember = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingDeleteOrganizationMember: true
});

const deleteOrganizationMemberFailure = (state: OrganizationMemberState) => ({
  ...state,
  isLoadingDeleteOrganizationMember: false
});

const deleteOrganizationMemberSuccess = (
  state: OrganizationMemberState,
  action: HttpAction<ActionTypes, string>
) => {
  const organizationMembers = Object.keys(state.organizationMembers)
    .filter(entityById(state.organizationMembers, action.payload!))
    .reduce(mapEntitiesByKey(state.organizationMembers), {});

  return {
    ...state,
    organizationMembers,
    isLoadingDeleteOrganizationMember: false
  };
};

export default createReducer(initialState, {
  [GET_ORGANIZATION_MEMBERS]: getOrganizationMembers,
  [GET_ORGANIZATION_MEMBERS_FAILURE]: getOrganizationMembersFailure,
  [GET_ORGANIZATION_MEMBERS_SUCCESS]: getOrganizationMembersSuccess,
  [POST_ORGANIZATION_MEMBER]: postOrganizationMember,
  [POST_ORGANIZATION_MEMBER_FAILURE]: postOrganizationMemberFailure,
  [POST_ORGANIZATION_MEMBER_SUCCESS]: postOrganizationMemberSuccess,
  [PATCH_ORGANIZATION_MEMBER]: patchOrganizationMember,
  [PATCH_ORGANIZATION_MEMBER_FAILURE]: patchOrganizationMemberFailure,
  [PATCH_ORGANIZATION_MEMBER_SUCCESS]: patchOrganizationMemberSuccess,
  [DELETE_ORGANIZATION_MEMBER]: deleteOrganizationMember,
  [DELETE_ORGANIZATION_MEMBER_FAILURE]: deleteOrganizationMemberFailure,
  [DELETE_ORGANIZATION_MEMBER_SUCCESS]: deleteOrganizationMemberSuccess
});
