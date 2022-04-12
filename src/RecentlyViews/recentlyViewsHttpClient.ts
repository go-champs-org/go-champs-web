import {
  ApiRecentlyView,
  ApiRecentlyViewPostResponse,
  ApiRecentlyViewRequest,
  ApiRecentlyViewResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiRecentlyViewResponseToRecentlyViewResponse,
  mapTournamentIdToRecentlyViewRequest
} from './dataMapper';
import { RecentlyViewEntity } from './state';

const RECENTLY_VIEWS_API = `${process.env.REACT_APP_API_HOST}v1/recently-view`;

const get = async (): Promise<ApiRecentlyView[]> => {
  const url = RECENTLY_VIEWS_API;

  const { data } = await httpClient.get<ApiRecentlyViewResponse>(url);
  return data;
};

const post = async (tournamentId: string): Promise<RecentlyViewEntity> => {
  const url = RECENTLY_VIEWS_API;
  const body = mapTournamentIdToRecentlyViewRequest(tournamentId);

  const { data } = await httpClient.post<
    ApiRecentlyViewRequest,
    ApiRecentlyViewPostResponse
  >(url, body);
  return mapApiRecentlyViewResponseToRecentlyViewResponse(data);
};

export default {
  get,
  post
};
