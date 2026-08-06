import { API_HOST } from '../env';
import httpClient from '../httpClient';
import {
  mapApiSearchTournamentToSearchResultEntity,
  SearchResultEntity
} from './dataMappers';
import { ApiSearchTournamentsResponse } from './apiTypes';

export const search = async (term: string): Promise<SearchResultEntity[]> => {
  const url = `${API_HOST}v1/search?term=${encodeURIComponent(term)}`;
  const { data } = await httpClient.get<ApiSearchTournamentsResponse>(url);
  return data.map(mapApiSearchTournamentToSearchResultEntity);
};
