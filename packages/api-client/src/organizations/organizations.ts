import ApiError from '../ApiError';
import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiOrganizationToOrganizationEntity,
  OrganizationEntity
} from './dataMappers';
import {
  ApiOrganizationsResponse,
  ApiRecentlyViewedOrganizationsResponse
} from './apiTypes';

export const getOrganizationBySlug = async (
  slug: string
): Promise<OrganizationEntity> => {
  const url = new URL('v1/organizations', getApiHost());
  url.searchParams.set('where[slug]', slug);

  const { data } = await httpClient.get<ApiOrganizationsResponse>(
    url.toString()
  );

  if (data.length === 0) {
    throw new ApiError({
      status: 404,
      data: `Organization not found for slug="${slug}"`
    });
  }

  return mapApiOrganizationToOrganizationEntity(data[0]);
};

export const getRecentlyViewedOrganizations = async (): Promise<
  OrganizationEntity[]
> => {
  const url = new URL('v1/organizations/recently-viewed', getApiHost());

  const { data } = await httpClient.get<ApiRecentlyViewedOrganizationsResponse>(
    url.toString()
  );
  return data.map(entry =>
    mapApiOrganizationToOrganizationEntity(entry.organization)
  );
};
