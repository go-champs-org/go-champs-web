import { Dispatch } from 'redux';
import { History } from 'history';
import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import {
  deletePlayerIdentityFailure,
  deletePlayerIdentityStart,
  deletePlayerIdentitySuccess,
  postPlayerIdentityFailure,
  postPlayerIdentityStart,
  postPlayerIdentitySuccess,
  putPlayerIdentityFailure,
  putPlayerIdentityStart,
  putPlayerIdentitySuccess,
  requestPlayerIdentityFailure,
  requestPlayerIdentityNotFound,
  requestPlayerIdentityStart,
  requestPlayerIdentitySuccess
} from './actions';
import {
  mapApiPlayerIdentityToPlayerIdentityEntity,
  mapFormValuesToApiPlayerIdentityWriteRequest,
  PlayerIdentityFormValues,
  PlayerIdentityModifiedFields
} from './dataMappers';
import playerIdentityHttpClient from './playerIdentityHttpClient';

export const requestPlayerIdentity = (playerId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestPlayerIdentityStart());

  try {
    const response = await playerIdentityHttpClient.get(playerId);

    if (!response || !response.data) {
      dispatch(requestPlayerIdentityNotFound(playerId));
      return;
    }

    const playerIdentity = mapApiPlayerIdentityToPlayerIdentityEntity(
      response.data,
      playerId
    );
    dispatch(requestPlayerIdentitySuccess(playerIdentity));
  } catch (err) {
    dispatch(requestPlayerIdentityFailure(err));
  }
};

export const postPlayerIdentity = (
  playerId: string,
  formValues: PlayerIdentityFormValues,
  modified: PlayerIdentityModifiedFields,
  history: History,
  backUrl: string
) => async (dispatch: Dispatch) => {
  const body = mapFormValuesToApiPlayerIdentityWriteRequest(
    formValues,
    modified
  );

  dispatch(postPlayerIdentityStart());

  try {
    const response = await playerIdentityHttpClient.post(playerId, body);

    const playerIdentity = mapApiPlayerIdentityToPlayerIdentityEntity(
      response.data,
      playerId
    );
    dispatch(postPlayerIdentitySuccess(playerIdentity));
    displayToast('Player identity saved!', 'is-success');
    history.push(backUrl);
  } catch (err) {
    dispatch(postPlayerIdentityFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data && err.payload.data.errors
        ? err.payload.data.errors
        : {};
    }
  }
};

export const putPlayerIdentity = (
  playerId: string,
  formValues: PlayerIdentityFormValues,
  modified: PlayerIdentityModifiedFields,
  history: History,
  backUrl: string
) => async (dispatch: Dispatch) => {
  const body = mapFormValuesToApiPlayerIdentityWriteRequest(
    formValues,
    modified
  );

  dispatch(putPlayerIdentityStart());

  try {
    const response = await playerIdentityHttpClient.put(playerId, body);

    const playerIdentity = mapApiPlayerIdentityToPlayerIdentityEntity(
      response.data,
      playerId
    );
    dispatch(putPlayerIdentitySuccess(playerIdentity));
    displayToast('Player identity saved!', 'is-success');
    history.push(backUrl);
  } catch (err) {
    dispatch(putPlayerIdentityFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data && err.payload.data.errors
        ? err.payload.data.errors
        : {};
    }
  }
};

export const deletePlayerIdentity = (
  playerId: string,
  history: History,
  backUrl: string
) => async (dispatch: Dispatch) => {
  dispatch(deletePlayerIdentityStart());

  try {
    await playerIdentityHttpClient.delete(playerId);

    dispatch(deletePlayerIdentitySuccess(playerId));
    displayToast('Player identity removed!', 'is-success');
    history.push(backUrl);
  } catch (err) {
    dispatch(deletePlayerIdentityFailure(err));
  }
};
