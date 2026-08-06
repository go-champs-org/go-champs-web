import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiSearchTournamentToSearchResultEntity,
  SearchResultEntity
} from './dataMappers';
import { ApiSearchTournamentsResponse } from './apiTypes';

export const search = async (term: string): Promise<SearchResultEntity[]> => {
  const url = new URL('v1/search', getApiHost());
  url.searchParams.set('term', term);

  const { data } = await httpClient.get<ApiSearchTournamentsResponse>(
    url.toString()
  );
  return data.map(mapApiSearchTournamentToSearchResultEntity);
};
