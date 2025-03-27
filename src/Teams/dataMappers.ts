import {
  ApiTeam,
  ApiTeamPatchRequest,
  ApiTeamPostRequest
} from '../Shared/httpClient/apiTypes';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';
import { TeamEntity } from './state';

export const mapApiTeamToTeamEntity = (apiTeam: ApiTeam): TeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
  logoUrl: apiTeam.logo_url || '',
  triCode: apiTeam.tri_code || ''
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
    tournament_id: tournamentId
  }
});

export const mapTeamEntityToApiTeamPatchRequest = (
  team: TeamEntity
): ApiTeamPatchRequest => ({
  team: {
    id: team.id,
    name: team.name,
    tri_code: team.triCode ? team.triCode : '',
    logo_url: team.logoUrl ? team.logoUrl : ''
  }
});

export const mapFileReferenceToApiTeamLogo = (fileReference: FileReference) =>
  fileReference.publicUrl;

export const mapTeamLogoToApiFileReference = (
  team: TeamEntity
): FileReference => ({
  publicUrl: team.logoUrl,
  filename: '',
  url: ''
});
