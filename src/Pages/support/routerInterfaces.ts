export interface RouteProps {
  gameId?: string;
  organizationSlug?: string;
  phaseId?: string;
  teamId?: string;
  tournamentSlug?: string;
}

// TODO: Remove this interface
export interface OrganizationHomeMatchProps {
  organizationSlug: string;
}

// TODO: Remove this interface
export interface TournamentHomeMatchProps {
  organizationSlug: string;
  tournamentSlug: string;
}
