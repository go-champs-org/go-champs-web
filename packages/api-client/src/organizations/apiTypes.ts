export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
}

export interface ApiRecentlyViewedOrganization {
  last_relevant_update_at?: string;
  organization: ApiOrganization;
  total_views?: number;
}

export interface ApiRecentlyViewedOrganizationsResponse {
  data: ApiRecentlyViewedOrganization[];
}
