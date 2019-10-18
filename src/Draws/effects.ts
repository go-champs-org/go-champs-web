import { displayToast } from '../Shared/bulma/toast';
import {
  deleteDrawFailure,
  deleteDrawStart,
  deleteDrawSuccess,
  patchDrawFailure,
  patchDrawStart,
  patchDrawSuccess,
  postDrawFailure,
  postDrawStart,
  postDrawSuccess
} from './actions';
import drawHttpClient from './drawHttpClient';
import { DrawEntity } from './state';

export const deleteDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch(deleteDrawStart());

  try {
    const response = await drawHttpClient.delete(phaseId, draw.id);

    dispatch(deleteDrawSuccess(response));
    displayToast(`${draw.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteDrawFailure(err));
  }
};

export const patchDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch(patchDrawStart());

  try {
    const response = await drawHttpClient.patch(phaseId, draw);

    dispatch(patchDrawSuccess(response));
    displayToast(`${draw.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchDrawFailure(err));
  }
};

export const postDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch(postDrawStart());

  try {
    const response = await drawHttpClient.post(phaseId, draw);

    dispatch(postDrawSuccess(response));
    displayToast(`${draw.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postDrawFailure(err));
  }
};
