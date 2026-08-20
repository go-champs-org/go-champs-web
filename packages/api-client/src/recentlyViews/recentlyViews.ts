import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiRecentlyViewToRecentlyViewEntity,
  RecentlyViewEntity
} from './dataMappers';
import { ApiRecentlyViewsResponse } from './apiTypes';

export const getRecentlyViews = async (): Promise<RecentlyViewEntity[]> => {
  const url = new URL('v1/recently-view', getApiHost());

  const { data } = await httpClient.get<ApiRecentlyViewsResponse>(
    url.toString()
  );
  return data.map(mapApiRecentlyViewToRecentlyViewEntity);
};
