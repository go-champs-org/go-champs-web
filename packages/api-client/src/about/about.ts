import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { ApiAboutStatsResponse } from './apiTypes';

export interface AboutStats {
  gamesCount: number;
  tournamentsCount: number;
  organizationsCount: number;
}

export const getAboutStats = async (): Promise<AboutStats> => {
  const url = new URL('public/about', getApiHost());

  const { data } = await httpClient.get<ApiAboutStatsResponse>(url.toString());

  return {
    gamesCount: data.public_games_count,
    tournamentsCount: data.public_tournaments_count,
    organizationsCount: data.organizations_with_public_tournaments_count
  };
};
