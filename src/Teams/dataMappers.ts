import {
  ApiCoach,
  ApiTeam,
  ApiTeamPatchRequest,
  ApiTeamPostRequest
} from '../Shared/httpClient/apiTypes';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import { CoachEntity, TeamEntity } from './state';

export const mapApiCoachToCoachEntity = (apiCoach: ApiCoach): CoachEntity => ({
  id: apiCoach.id,
  name: apiCoach.name,
  type: apiCoach.type
});

export const mapCoachEntityToApiCoach = (coach: CoachEntity): ApiCoach => ({
  id: coach.id,
  name: coach.name,
  type: coach.type
});

export const mapApiTeamToTeamEntity = (apiTeam: ApiTeam): TeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
  logoUrl: apiTeam.logo_url || '',
  triCode: apiTeam.tri_code || '',
  coaches: apiTeam.coaches ? apiTeam.coaches.map(mapApiCoachToCoachEntity) : []
});

export const mapTeamEntityToApiTeamPostRequest = (
  team: TeamEntity,
  tournamentId: string
): ApiTeamPostRequest => ({
  team: {
    id: team.id,
    name: team.name,
    tri_code: team.triCode ? team.triCode : '',
    logo_url: team.logoUrl ? team.logoUrl : '',
    tournament_id: tournamentId,
    coaches: team.coaches.map(mapCoachEntityToApiCoach)
  }
});

export const mapTeamEntityToApiTeamPatchRequest = (
  team: TeamEntity
): ApiTeamPatchRequest => ({
  team: {
    id: team.id,
    name: team.name,
    tri_code: team.triCode ? team.triCode : '',
    logo_url: team.logoUrl ? team.logoUrl : '',
    coaches: team.coaches.map(mapCoachEntityToApiCoach)
  }
});

export const mapFileReferenceToApiTeamLogo = (fileReference: FileReference) =>
  fileReference.publicUrl;

export const mapTeamLogoToApiFileReference = (
  team: TeamEntity
): FileReference => ({
  publicUrl: team.logoUrl,
  filename: '',
  url: team.logoUrl
});
