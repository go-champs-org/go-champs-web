import { ApiRecentlyView } from './apiTypes';

export interface RecentlyViewEntity {
  tournamentId: string;
  tournamentName: string;
  tournamentSlug: string;
  organizationName: string;
  organizationSlug: string;
  organizationLogoUrl: string;
  views: number;
}

export const mapApiRecentlyViewToRecentlyViewEntity = (
  apiRecentlyView: ApiRecentlyView
): RecentlyViewEntity => ({
  tournamentId: apiRecentlyView.tournament.id,
  tournamentName: apiRecentlyView.tournament.name,
  tournamentSlug: apiRecentlyView.tournament.slug,
  organizationName: apiRecentlyView.tournament.organization.name,
  organizationSlug: apiRecentlyView.tournament.organization.slug,
  organizationLogoUrl: apiRecentlyView.tournament.organization.logo_url || '',
  views: apiRecentlyView.views
});
