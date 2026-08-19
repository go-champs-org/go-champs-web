import { ApiOrganization } from '../organizations/apiTypes';

export interface ApiRecentlyViewTournament {
  id: string;
  name: string;
  slug: string;
  organization: ApiOrganization;
}

export interface ApiRecentlyView {
  tournament: ApiRecentlyViewTournament;
  views: number;
}

export interface ApiRecentlyViewsResponse {
  data: ApiRecentlyView[];
}
