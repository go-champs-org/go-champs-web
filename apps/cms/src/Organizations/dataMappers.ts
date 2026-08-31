import {
  ApiOrganization,
  ApiOrganizationRequest
} from '../Shared/httpClient/apiTypes';
import { mapApiOrganizationSettingToOrganizationSettingEntity } from '../OrganizationSettings/dataMappers';
import { OrganizationEntity } from './state';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';

export const mapApiOrganizationToOrganizationEntity = (
  apiOrganization: ApiOrganization
): OrganizationEntity => ({
  id: apiOrganization.id,
  name: apiOrganization.name,
  slug: apiOrganization.slug,
  logoUrl: apiOrganization.logo_url || '',
  organizationSetting: apiOrganization.organization_setting
    ? mapApiOrganizationSettingToOrganizationSettingEntity(
        apiOrganization.organization_setting
      )
    : undefined
});

export const mapOrganizationEntityToApiOrganizationRequest = (
  organization: OrganizationEntity
): ApiOrganizationRequest => ({
  organization: {
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    logo_url: organization.logoUrl ? organization.logoUrl : undefined
  }
});

export const mapOrganizationLogoToApiFileReference = (
  organization: OrganizationEntity
): FileReference => ({
  publicUrl: organization.logoUrl,
  filename: '',
  url: organization.logoUrl
});

export const mapFileReferenceToApiOrganizationLogo = (
  fileReference: FileReference
) => fileReference.publicUrl;
