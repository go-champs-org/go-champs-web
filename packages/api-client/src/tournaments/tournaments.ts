import ApiError from '../ApiError';
import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiTournamentToTournamentEntity,
  mapApiTournamentToTournamentWithTeamsEntity,
  TournamentEntity,
  TournamentWithTeamsEntity
} from './dataMappers';
import { ApiTournamentResponse, ApiTournamentsResponse } from './apiTypes';

export const getTournamentsByOrganizationSlug = async (
  organizationSlug: string
): Promise<TournamentEntity[]> => {
  const url = new URL('v1/tournaments', getApiHost());
  url.searchParams.set('where[organization_slug]', organizationSlug);

  const { data } = await httpClient.get<ApiTournamentsResponse>(
    url.toString()
  );
  return data.map(mapApiTournamentToTournamentEntity);
};

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

  if (matches.length === 0) {
    throw new ApiError({
      status: 404,
      data: `Tournament not found for organizationSlug="${organizationSlug}", tournamentSlug="${tournamentSlug}"`
    });
  }

  const url = new URL(`v1/tournaments/${matches[0].id}`, getApiHost());
  const { data } = await httpClient.get<ApiTournamentResponse>(url.toString());
  return mapApiTournamentToTournamentWithTeamsEntity(data);
};
