import { createReducer } from '../Shared/store/helpers';
import {
  AccountIdentityState,
  initialState,
  DEFAULT_ACCOUNT_IDENTITY
} from './state';
import {
  DELETE_ACCOUNT_IDENTITY,
  DELETE_ACCOUNT_IDENTITY_SUCCESS,
  DELETE_ACCOUNT_IDENTITY_FAILURE,
  POST_ACCOUNT_IDENTITY,
  POST_ACCOUNT_IDENTITY_SUCCESS,
  POST_ACCOUNT_IDENTITY_FAILURE,
  PUT_ACCOUNT_IDENTITY,
  PUT_ACCOUNT_IDENTITY_SUCCESS,
  PUT_ACCOUNT_IDENTITY_FAILURE,
  REQUEST_ACCOUNT_IDENTITY,
  REQUEST_ACCOUNT_IDENTITY_SUCCESS,
  REQUEST_ACCOUNT_IDENTITY_FAILURE,
  REQUEST_ACCOUNT_IDENTITY_NOT_FOUND,
  ActionTypes
} from './actions';
import { AccountIdentityEntity } from './state';
import { HttpAction } from '../Shared/store/interfaces';

const deleteAccountIdentity = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingDeleteAccountIdentity: true
});

const deleteAccountIdentitySuccess = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingDeleteAccountIdentity: false,
  accountIdentity: DEFAULT_ACCOUNT_IDENTITY
});

const deleteAccountIdentityFailure = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingDeleteAccountIdentity: false
});

const postAccountIdentity = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingPostAccountIdentity: true
});

const postAccountIdentitySuccess = (
  state: AccountIdentityState,
  action: HttpAction<ActionTypes, AccountIdentityEntity>
): AccountIdentityState => ({
  ...state,
  isLoadingPostAccountIdentity: false,
  accountIdentity: action.payload!
});

const postAccountIdentityFailure = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingPostAccountIdentity: false
});

const putAccountIdentity = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingPutAccountIdentity: true
});

const putAccountIdentitySuccess = (
  state: AccountIdentityState,
  action: HttpAction<ActionTypes, AccountIdentityEntity>
): AccountIdentityState => ({
  ...state,
  isLoadingPutAccountIdentity: false,
  accountIdentity: action.payload!
});

const putAccountIdentityFailure = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingPutAccountIdentity: false
});

const requestAccountIdentity = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingRequestAccountIdentity: true
});

const requestAccountIdentitySuccess = (
  state: AccountIdentityState,
  action: HttpAction<ActionTypes, AccountIdentityEntity>
): AccountIdentityState => ({
  ...state,
  isLoadingRequestAccountIdentity: false,
  accountIdentity: action.payload!
});

const requestAccountIdentityFailure = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingRequestAccountIdentity: false
});

const requestAccountIdentityNotFound = (
  state: AccountIdentityState
): AccountIdentityState => ({
  ...state,
  isLoadingRequestAccountIdentity: false,
  accountIdentity: DEFAULT_ACCOUNT_IDENTITY
});

export default createReducer<AccountIdentityState>(initialState, {
  [DELETE_ACCOUNT_IDENTITY]: deleteAccountIdentity,
  [DELETE_ACCOUNT_IDENTITY_SUCCESS]: deleteAccountIdentitySuccess,
  [DELETE_ACCOUNT_IDENTITY_FAILURE]: deleteAccountIdentityFailure,
  [POST_ACCOUNT_IDENTITY]: postAccountIdentity,
  [POST_ACCOUNT_IDENTITY_SUCCESS]: postAccountIdentitySuccess,
  [POST_ACCOUNT_IDENTITY_FAILURE]: postAccountIdentityFailure,
  [PUT_ACCOUNT_IDENTITY]: putAccountIdentity,
  [PUT_ACCOUNT_IDENTITY_SUCCESS]: putAccountIdentitySuccess,
  [PUT_ACCOUNT_IDENTITY_FAILURE]: putAccountIdentityFailure,
  [REQUEST_ACCOUNT_IDENTITY]: requestAccountIdentity,
  [REQUEST_ACCOUNT_IDENTITY_SUCCESS]: requestAccountIdentitySuccess,
  [REQUEST_ACCOUNT_IDENTITY_FAILURE]: requestAccountIdentityFailure,
  [REQUEST_ACCOUNT_IDENTITY_NOT_FOUND]: requestAccountIdentityNotFound
});
