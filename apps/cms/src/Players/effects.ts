import { displayToast } from '../Shared/bulma/toast';
import {
  deletePlayerFailure,
  deletePlayerStart,
  deletePlayerSuccess,
  patchPlayerFailure,
  patchPlayerStart,
  patchPlayerSuccess,
  postPlayerFailure,
  postPlayerStart,
  postPlayerSuccess
} from './actions';
import { PlayerEntity } from './state';
import playerHttpClient from './playerHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deletePlayer = (player: PlayerEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(deletePlayerStart());

  try {
    const response = await playerHttpClient.delete(player.id);

    dispatch(deletePlayerSuccess(response));
    displayToast(`${player.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePlayerFailure(err));
  }
};

export const patchPlayer = (player: PlayerEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchPlayerStart());

  try {
    const response = await playerHttpClient.patch(player);

    dispatch(patchPlayerSuccess(response));
    displayToast(`${response.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPlayerFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postPlayer = (
  player: PlayerEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postPlayerStart());

  try {
    const response = await playerHttpClient.post(player, tournamentId);

    dispatch(postPlayerSuccess(response));
    displayToast(`${response.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postPlayerFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
