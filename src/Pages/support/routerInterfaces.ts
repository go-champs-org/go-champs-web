export interface RouteProps {
  drawId?: string;
  eliminationId?: string;
  fixedPlayerStatsTableId?: string;
  gameId?: string;
  organizationSlug?: string;
  phaseId?: string;
  playerId?: string;
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
