import type { TournamentWithTeamsEntity } from '@gochamps/api-client';

export const organizationIdOf = (
  tournament: TournamentWithTeamsEntity | null
): string => (tournament ? tournament.organization.id : '');
