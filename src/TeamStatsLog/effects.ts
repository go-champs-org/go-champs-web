import { RequestFilter } from '../Shared/httpClient/requestFilter';
import {
  getTeamStatsLogsByFilterFailure,
  getTeamStatsLogsByFilterStart,
  getTeamStatsLogsByFilterSuccess
} from './actions';
import teamStatsLogHttpClient from './teamStatsLogHttpClient';
import { Dispatch } from 'redux';

export const getTeamStatsLogsByFilter = (where: RequestFilter) => async (
  dispatch: Dispatch
) => {
  dispatch(getTeamStatsLogsByFilterStart());

  try {
    const response = await teamStatsLogHttpClient.getByFilter(where);

    dispatch(getTeamStatsLogsByFilterSuccess(response));
  } catch (err) {
    dispatch(getTeamStatsLogsByFilterFailure(err));
  }
};
