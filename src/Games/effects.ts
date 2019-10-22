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

export const deleteGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch(deleteGameStart());

  try {
    const response = await gameHttpClient.delete(phaseId, tournamentGame.id);

    dispatch(deleteGameSuccess(response));
    displayToast(`Game deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteGameFailure(err));
  }
};

export const patchGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch(patchGameStart());

  try {
    const response = await gameHttpClient.patch(phaseId, tournamentGame);

    dispatch(patchGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};

export const postGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch(postGameStart());

  try {
    const response = await gameHttpClient.post(phaseId, tournamentGame);

    dispatch(postGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postGameFailure(err));
  }
};

export const getGame = (phaseId: string, tournamentGameId: string) => async (
  dispatch: any
) => {
  dispatch(getGameStart());

  try {
    const response = await gameHttpClient.get(phaseId, tournamentGameId);

    dispatch(getGameSuccess(response));
  } catch (err) {
    dispatch(getGameFailure(err));
  }
};

export const getGamesByFilter = (where: RequestFilter) => async (
  dispatch: any
) => {
  dispatch(getGamesByFilterStart());

  try {
    const response = await gameHttpClient.getByFilter(where);

    dispatch(getGamesByFilterSuccess(response));
  } catch (err) {
    dispatch(getGamesByFilterFailure(err));
  }
};
