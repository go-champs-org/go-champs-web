import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiSportResponse,
  ApiSportsResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { mapApiSportToSportEntity } from './dataMappers';
import { SportEntity } from './state';

const SPORTS_API = `${REACT_APP_API_HOST}v1/sports`;

export const get = async (sportSlug: string): Promise<SportEntity> => {
  const { data } = await httpClient.get<ApiSportResponse>(
    `${SPORTS_API}/${sportSlug}`
  );
  return mapApiSportToSportEntity(data);
};

export const getAll = async (): Promise<SportEntity[]> => {
  const { data } = await httpClient.get<ApiSportsResponse>(SPORTS_API);
  return data.map(mapApiSportToSportEntity);
};

export default {
  get,
  getAll
};
