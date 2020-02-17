import { displayToast } from '../Shared/bulma/toast';
import { RequestFilter } from '../Shared/httpClient/requestFilter';
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

export const patchGame = (phaseId: string) => (game: GameEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchGameStart());

  try {
    const response = await gameHttpClient.patch(game);

    dispatch(patchGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};

export const postGame = (phaseId: string) => (game: GameEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(postGameStart());

  try {
    const response = await gameHttpClient.post(game);

    dispatch(postGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postGameFailure(err));
  }
};

export const getGame = (phaseId: string, gameId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getGameStart());

  try {
    const response = await gameHttpClient.get(gameId);

    dispatch(getGameSuccess(response));
  } catch (err) {
    dispatch(getGameFailure(err));
  }
};

export const getGamesByFilter = (where: RequestFilter) => async (
  dispatch: Dispatch
) => {
  dispatch(getGamesByFilterStart());

  try {
    const response = await gameHttpClient.getByFilter(where);

    dispatch(getGamesByFilterSuccess(response));
  } catch (err) {
    dispatch(getGamesByFilterFailure(err));
  }
};
