import { mapApiOrganizationToOrganizationEntity } from '../Organizations/dataMappers';
import { DEFAULT_ORGANIZATION } from '../Organizations/state';
import { mapApiPhaseToPhaseEntity } from '../Phases/dataMappers';
import {
  ApiTournamentRequest,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import { TournamentEntity } from './state';
import { mapApiTeamToTeamEntity } from './Teams/dataMappers';

export const mapApiTournamentToTournamentEntity = (
  apiTournament: ApiTournamentWithDependecies
): TournamentEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  teamStatsStructure: {},
  organization: apiTournament.organization
    ? mapApiOrganizationToOrganizationEntity(apiTournament.organization)
    : DEFAULT_ORGANIZATION,
  phases: apiTournament.phases
    ? apiTournament.phases.map(mapApiPhaseToPhaseEntity)
    : [],
  teams: apiTournament.teams
    ? apiTournament.teams.map(mapApiTeamToTeamEntity)
    : []
});

export const mapTournamentEntityToApiTournamentRequest = (
  tournament: TournamentEntity,
  organizationId: string
): ApiTournamentRequest => ({
  tournament: {
    id: tournament.id,
    name: tournament.name,
    slug: tournament.slug,
    organization_id: organizationId
  }
});

export const currentPhaseId = (tournament: TournamentEntity) =>
  tournament.phases[0].id;
