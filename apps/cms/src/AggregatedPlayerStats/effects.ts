import {
  getAggregatedPlayerStatsLogsByFilterStart,
  getAggregatedPlayerStatsLogsByFilterSuccess,
  getAggregatedPlayerStatsLogsByFilterFailure
} from './actions';
import { RequestFilter } from '../Shared/httpClient/requestFilter';
import { Dispatch } from 'redux';
import aggregatedPlayerStatsLogHttpClient from './aggregatedPlayerStatsHttpClient';

export const getAggregatedPlayerStatsLogsByFilter = (
  where: RequestFilter,
  sort?: string
) => async (dispatch: Dispatch) => {
  dispatch(getAggregatedPlayerStatsLogsByFilterStart());

  try {
    const request = sort
      ? aggregatedPlayerStatsLogHttpClient.getByFilterAndSort(where, sort)
      : aggregatedPlayerStatsLogHttpClient.getByFilter(where);
    const response = await request;

    dispatch(getAggregatedPlayerStatsLogsByFilterSuccess(response));
  } catch (err) {
    dispatch(getAggregatedPlayerStatsLogsByFilterFailure(err));
  }
};
