import {
  getAggregatedPlayerStatsLogsByFilterStart,
  getAggregatedPlayerStatsLogsByFilterSuccess,
  getAggregatedPlayerStatsLogsByFilterFailure
} from './actions';
import { RequestFilter } from '../Shared/httpClient/requestFilter';
import { Dispatch } from 'redux';
import aggregatedPlayerStatsLogHttpClient from './aggregatedPlayerStatsHttpClient';

export const getAggregatedPlayerStatsLogsByFilter = (
  where: RequestFilter
) => async (dispatch: Dispatch) => {
  dispatch(getAggregatedPlayerStatsLogsByFilterStart());

  try {
    const response = await aggregatedPlayerStatsLogHttpClient.getByFilter(
      where
    );

    dispatch(getAggregatedPlayerStatsLogsByFilterSuccess(response));
  } catch (err) {
    dispatch(getAggregatedPlayerStatsLogsByFilterFailure(err));
  }
};
