import { displayToast } from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import i18n from 'i18next';
import {
  ExtendedRequestFilter,
  RequestFilter
} from '../Shared/httpClient/requestFilter';
import {
  deleteGameFailure,
  deleteGameStart,
  deleteGameSuccess,
  getGameFailure,
  getGamesByFilterFailure,
  getGamesByFilterStart,
  getGamesByFilterSuccess,
  getGameStart,
  getGameSuccess,
  patchGameFailure,
  patchGameStart,
  patchGameSuccess,
  postGameFailure,
  postGameStart,
  postGameSuccess
} from './actions';
import gameHttpClient from './gameHttpClient';
import { GameEntity } from './state';
import { Dispatch } from 'redux';

export const deleteGame = (game: GameEntity) => async (dispatch: Dispatch) => {
  dispatch(deleteGameStart());

  try {
    const response = await gameHttpClient.delete(game.id);

    dispatch(deleteGameSuccess(response));
    displayToast(`Game deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteGameFailure(err));
  }
};

export const patchGame = (game: GameEntity) => async (dispatch: Dispatch) => {
  dispatch(patchGameStart());

  try {
    const response = await gameHttpClient.patch(game);

    dispatch(patchGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};

export const postGame = (game: GameEntity, phaseId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(postGameStart());

  try {
    const response = await gameHttpClient.post(game, phaseId);

    dispatch(postGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postGameFailure(err));

    if (
      err instanceof ApiError &&
      err.payload.data &&
      err.payload.data.errors &&
      err.payload.data.errors.base &&
      err.payload.data.errors.base[0] ===
        'An active billing agreement is required to create games for this tournament'
    ) {
      displayToast(i18n.t('activeBillingAgreementRequired'), 'is-danger');
    }
  }
};

export const getGame = (gameId: string) => async (dispatch: Dispatch) => {
  dispatch(getGameStart());

  try {
    const response = await gameHttpClient.get(gameId);

    dispatch(getGameSuccess(response));
  } catch (err) {
    dispatch(getGameFailure(err));
  }
};

export const getGamesByFilter = (
  where: RequestFilter | ExtendedRequestFilter
) => async (dispatch: Dispatch) => {
  dispatch(getGamesByFilterStart());

  try {
    const response = await gameHttpClient.getByFilter(where);

    dispatch(getGamesByFilterSuccess(response));
  } catch (err) {
    dispatch(getGamesByFilterFailure(err));
  }
};

export const migrateGameToNewPhase = (
  gameId: string,
  newPhaseId: string
) => async (dispatch: Dispatch) => {
  dispatch(patchGameStart());

  try {
    const response = await gameHttpClient.migrateToNewPhase(gameId, newPhaseId);

    dispatch(patchGameSuccess(response));
    displayToast(`Game migrated to new phase!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};
