import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiOrganizationToOrganizationEntity,
  OrganizationEntity
} from './dataMappers';
import { ApiRecentlyViewedOrganizationsResponse } from './apiTypes';

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
