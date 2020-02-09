import {
  ApiTeam,
  ApiTeamPatchRequest,
  ApiTeamPostRequest
} from '../Shared/httpClient/apiTypes';
import { TeamEntity } from './state';

export const mapApiTeamToTeamEntity = (apiTeam: ApiTeam): TeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name
});

export const mapTeamEntityToApiTeamPostRequest = (
  team: TeamEntity,
  tournamentId: string
): ApiTeamPostRequest => ({
  team: {
    id: team.id,
    name: team.name,
    tournament_id: tournamentId
  }
});

export const mapTeamEntityToApiTeamPatchRequest = (
  team: TeamEntity
): ApiTeamPatchRequest => ({
  team: {
    id: team.id,
    name: team.name
  }
});
