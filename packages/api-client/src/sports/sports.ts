import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiSportToEntity, SportEntity } from './dataMappers';
import { ApiSportResponse } from './apiTypes';

// A sport carries the catalogue of statistics its games are scored with,
// which is what decides the columns of a box score.
export const getSportBySlug = async (slug: string): Promise<SportEntity> => {
  // Encoded because `new URL` resolves path segments: an unencoded "../x"
  // would silently request a different endpoint instead of 404ing.
  const url = new URL(`v1/sports/${encodeURIComponent(slug)}`, getApiHost());
  const { data } = await httpClient.get<ApiSportResponse>(url.toString());
  return mapApiSportToEntity(data);
};
