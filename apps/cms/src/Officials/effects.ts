import { displayToast } from '../Shared/bulma/toast';
import {
  deleteOfficialFailure,
  deleteOfficialStart,
  deleteOfficialSuccess,
  patchOfficialFailure,
  patchOfficialStart,
  patchOfficialSuccess,
  postOfficialFailure,
  postOfficialStart,
  postOfficialSuccess
} from './actions';
import { OfficialEntity } from './state';
import officialHttpClient from './officialHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteOfficial = (official: OfficialEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteOfficialStart());

  try {
    const response = await officialHttpClient.delete(official.id);

    dispatch(deleteOfficialSuccess(response));
    displayToast(`${official.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteOfficialFailure(err));
  }
};

export const patchOfficial = (official: OfficialEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchOfficialStart());

  try {
    const response = await officialHttpClient.patch(official);

    dispatch(patchOfficialSuccess(response));
    displayToast(`${response.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOfficialFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postOfficial = (
  official: OfficialEntity,
  tournamentId: string
) => async (dispatch: Dispatch) => {
  dispatch(postOfficialStart());

  try {
    const response = await officialHttpClient.post(official, tournamentId);

    dispatch(postOfficialSuccess(response));
    displayToast(`${response.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postOfficialFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
