import { ApiOrganization } from './apiTypes';

export interface OrganizationEntity {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
}

export const mapApiOrganizationToOrganizationEntity = (
  apiOrganization: ApiOrganization
): OrganizationEntity => ({
  id: apiOrganization.id,
  name: apiOrganization.name,
  slug: apiOrganization.slug,
  logoUrl: apiOrganization.logo_url || ''
});
