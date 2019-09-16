import { ApiTeam, ApiTeamRequest } from '../../Shared/httpClient/apiTypes';
import { mapApiGroupToGroupEntity } from '../Groups/dataMappers';
import { DEFAULT_GROUP_ENTITY } from '../Groups/state';
import { TournamentTeamEntity } from './state';

export const mapApiTeamToTeamEntity = (
  apiTeam: ApiTeam
): TournamentTeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
  group: apiTeam.group
    ? mapApiGroupToGroupEntity(apiTeam.group)
    : DEFAULT_GROUP_ENTITY,
  stats: {}
});

export const mapTeamEntityToApiTeamRequest = (
  team: TournamentTeamEntity
): ApiTeamRequest => ({
  tournament_team: {
    id: team.id,
    name: team.name
  }
});
