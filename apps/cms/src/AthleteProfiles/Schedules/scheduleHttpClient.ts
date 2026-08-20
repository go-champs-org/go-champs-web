import { REACT_APP_API_HOST } from '../../Shared/env';
import ApiError from '../../Shared/httpClient/ApiError';
import { ApiProfileSchedulesResponse } from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../../Shared/httpClient/requestFilter';
import { mapApiScheduleGameToScheduleGameEntity } from '../../Shared/Schedules/dataMappers';
import { ScheduleGameEntity } from '../../Shared/Schedules/state';

const SCHEDULES_API = `${REACT_APP_API_HOST}v1/athlete-profiles/me/schedules`;

const getByFilter = async (
  where: RequestFilter = {}
): Promise<ScheduleGameEntity[]> => {
  const queryString = mapRequestFilterToQueryString(where);
  const url = queryString ? `${SCHEDULES_API}?${queryString}` : SCHEDULES_API;

  const response = await httpClient.get<ApiProfileSchedulesResponse>(url);

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
