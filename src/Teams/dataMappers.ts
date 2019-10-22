import { ApiTeam, ApiTeamRequest } from '../Shared/httpClient/apiTypes';
import { TeamEntity } from './state';

export const mapApiTeamToTeamEntity = (apiTeam: ApiTeam): TeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name
});

export const mapTeamEntityToApiTeamRequest = (
  team: TeamEntity
): ApiTeamRequest => ({
  tournament_team: {
    id: team.id,
    name: team.name
  }
});
