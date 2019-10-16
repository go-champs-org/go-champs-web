import { ApiTeam, ApiTeamRequest } from '../Shared/httpClient/apiTypes';
import { TournamentTeamEntity } from './state';

export const mapApiTeamToTeamEntity = (
  apiTeam: ApiTeam
): TournamentTeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
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
