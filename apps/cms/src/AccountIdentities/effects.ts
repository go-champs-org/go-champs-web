import { Dispatch } from 'redux';
import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import {
  deleteAccountIdentityFailure,
  deleteAccountIdentityStart,
  deleteAccountIdentitySuccess,
  postAccountIdentityFailure,
  postAccountIdentityStart,
  postAccountIdentitySuccess,
  putAccountIdentityFailure,
  putAccountIdentityStart,
  putAccountIdentitySuccess,
  requestAccountIdentityFailure,
  requestAccountIdentityNotFound,
  requestAccountIdentityStart,
  requestAccountIdentitySuccess
} from './actions';
import {
  AccountIdentityFormValues,
  AccountIdentityModifiedFields,
  mapApiAccountIdentityToAccountIdentityEntity,
  mapFormValuesToApiAccountIdentityWriteRequest
} from './dataMappers';
import accountIdentityHttpClient from './accountIdentityHttpClient';

export const requestAccountIdentity = () => async (dispatch: Dispatch) => {
  dispatch(requestAccountIdentityStart());

  try {
    const response = await accountIdentityHttpClient.get();

    if (!response || !response.data) {
      dispatch(requestAccountIdentityNotFound());
      return;
    }

    const accountIdentity = mapApiAccountIdentityToAccountIdentityEntity(
      response.data
    );
    dispatch(requestAccountIdentitySuccess(accountIdentity));
  } catch (err) {
    dispatch(requestAccountIdentityFailure(err));
  }
};

export const postAccountIdentity = (
  formValues: AccountIdentityFormValues,
  modified: AccountIdentityModifiedFields
) => async (dispatch: Dispatch) => {
  const body = mapFormValuesToApiAccountIdentityWriteRequest(
    formValues,
    modified
  );

  dispatch(postAccountIdentityStart());

  try {
    const response = await accountIdentityHttpClient.post(body);

    const accountIdentity = mapApiAccountIdentityToAccountIdentityEntity(
      response.data
    );
    dispatch(postAccountIdentitySuccess(accountIdentity));
    displayToast('Identity saved!', 'is-success');
  } catch (err) {
    dispatch(postAccountIdentityFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data && err.payload.data.errors
        ? err.payload.data.errors
        : {};
    }
  }
};

export const putAccountIdentity = (
  formValues: AccountIdentityFormValues,
  modified: AccountIdentityModifiedFields
) => async (dispatch: Dispatch) => {
  const body = mapFormValuesToApiAccountIdentityWriteRequest(
    formValues,
    modified
  );

  dispatch(putAccountIdentityStart());

  try {
    const response = await accountIdentityHttpClient.put(body);

    const accountIdentity = mapApiAccountIdentityToAccountIdentityEntity(
      response.data
    );
    dispatch(putAccountIdentitySuccess(accountIdentity));
    displayToast('Identity saved!', 'is-success');
  } catch (err) {
    dispatch(putAccountIdentityFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data && err.payload.data.errors
        ? err.payload.data.errors
        : {};
    }
  }
};

export const deleteAccountIdentity = () => async (dispatch: Dispatch) => {
  dispatch(deleteAccountIdentityStart());

  try {
    await accountIdentityHttpClient.delete();

    dispatch(deleteAccountIdentitySuccess());
    displayToast('Identity removed!', 'is-success');
  } catch (err) {
    dispatch(deleteAccountIdentityFailure(err));
  }
};
