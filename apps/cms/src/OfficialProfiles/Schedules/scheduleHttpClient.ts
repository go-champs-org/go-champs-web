import { REACT_APP_API_HOST } from '../../Shared/env';
import ApiError from '../../Shared/httpClient/ApiError';
import { ApiOfficialProfileSchedulesResponse } from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../../Shared/httpClient/requestFilter';
import { mapApiScheduleGameToScheduleGameEntity } from './dataMappers';
import { ScheduleGameEntity } from './state';

const SCHEDULES_API = `${REACT_APP_API_HOST}v1/official-profiles/me/schedules`;

const getByFilter = async (
  where: RequestFilter = {}
): Promise<ScheduleGameEntity[]> => {
  const queryString = mapRequestFilterToQueryString(where);
  const url = queryString ? `${SCHEDULES_API}?${queryString}` : SCHEDULES_API;

  const response = await httpClient.get<ApiOfficialProfileSchedulesResponse>(
    url
  );

  // httpClient.get does not check response.ok, so an API error resolves with
  // the error body instead of throwing. Turn it into an ApiError here.
  if (!response || !Array.isArray(response.data)) {
    throw new ApiError({ status: 0, data: response });
  }

  return response.data.map(mapApiScheduleGameToScheduleGameEntity);
};

export default {
  getByFilter
};
