import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiTournamentToTournamentWithTeamsEntity,
  TournamentWithTeamsEntity
} from './dataMappers';
import { ApiTournamentResponse, ApiTournamentsResponse } from './apiTypes';

export const getTournamentBySlug = async (
  organizationSlug: string,
  tournamentSlug: string
): Promise<TournamentWithTeamsEntity> => {
  const filterUrl = new URL('v1/tournaments', getApiHost());
  filterUrl.searchParams.set('where[organization_slug]', organizationSlug);
  filterUrl.searchParams.set('where[slug]', tournamentSlug);
  const { data: matches } = await httpClient.get<ApiTournamentsResponse>(
    filterUrl.toString()
  );

  const url = new URL(`v1/tournaments/${matches[0].id}`, getApiHost());
  const { data } = await httpClient.get<ApiTournamentResponse>(url.toString());
  return mapApiTournamentToTournamentWithTeamsEntity(data);
};
