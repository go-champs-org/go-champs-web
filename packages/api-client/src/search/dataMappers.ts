import { ApiSearchTournament } from './apiTypes';

export interface SearchResultEntity {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  organizationName: string;
  organizationSlug: string;
  organizationLogoUrl: string;
}

export const mapApiSearchTournamentToSearchResultEntity = (
  apiTournament: ApiSearchTournament
): SearchResultEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  logoUrl: apiTournament.logo_url || '',
  organizationName: apiTournament.organization.name,
  organizationSlug: apiTournament.organization.slug,
  organizationLogoUrl: apiTournament.organization.logo_url || ''
});
