export interface ApiSearchOrganization {
  id: string;
  name: string;
  slug: string;
}

export interface ApiSearchTournament {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  organization: ApiSearchOrganization;
}

export interface ApiSearchTournamentsResponse {
  data: ApiSearchTournament[];
}
