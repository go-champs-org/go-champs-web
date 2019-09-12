export interface OrganizationHomeMatchProps {
  organizationSlug: string;
}

export interface TournamentHomeMatchProps {
  tournamentSlug: string;
  organizationSlug: string;
  phaseId: string;
}
