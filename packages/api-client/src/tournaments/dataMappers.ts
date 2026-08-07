import { TeamEntity } from '@gochamps/domain-types';
import { mapApiTeamToTeamEntity } from '../teams/dataMappers';
import { ApiTournamentWithTeams } from './apiTypes';

export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
}

export interface TournamentWithTeamsEntity extends TournamentEntity {
  teams: TeamEntity[];
}

export const mapApiTournamentToTournamentWithTeamsEntity = (
  apiTournament: ApiTournamentWithTeams
): TournamentWithTeamsEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  logoUrl: apiTournament.logo_url || '',
  teams: apiTournament.teams.map(mapApiTeamToTeamEntity)
});
