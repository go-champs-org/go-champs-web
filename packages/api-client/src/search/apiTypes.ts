import { ApiOrganization } from '../organizations/apiTypes';

export interface ApiSearchTournament {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  organization: ApiOrganization;
}

export interface ApiSearchTournamentsResponse {
  data: ApiSearchTournament[];
}
