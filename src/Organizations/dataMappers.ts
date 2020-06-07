import {
  ApiOrganization,
  ApiOrganizationRequest
} from '../Shared/httpClient/apiTypes';
import { OrganizationEntity } from './state';

export const mapApiOrganizationToOrganizationEntity = (
  apiOrganization: ApiOrganization
): OrganizationEntity => ({
  id: apiOrganization.id,
  name: apiOrganization.name,
  slug: apiOrganization.slug,
  members: apiOrganization.members || []
});

export const mapOrganizationEntityToApiOrganizationRequest = (
  organization: OrganizationEntity
): ApiOrganizationRequest => ({
  organization: {
    id: organization.id,
    name: organization.name,
    slug: organization.slug
  }
});
