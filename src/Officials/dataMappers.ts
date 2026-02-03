import {
  ApiOfficial,
  ApiOfficialPatchRequest,
  ApiOfficialPostRequest
} from '../Shared/httpClient/apiTypes';
import { OfficialEntity } from './state';

export const mapApiOfficialToOfficialEntity = (
  apiOfficial: ApiOfficial
): OfficialEntity => ({
  id: apiOfficial.id,
  name: apiOfficial.name,
  licenseNumber: apiOfficial.license_number || '',
  username: apiOfficial.username
});

export const mapOfficialEntityToApiOfficialPatchRequest = (
  official: OfficialEntity
): ApiOfficialPatchRequest => ({
  official: {
    id: official.id,
    name: official.name,
    license_number: official.licenseNumber || undefined,
    username: official.username
  }
});

export const mapOfficialEntityToApiOfficialPostRequest = (
  official: OfficialEntity,
  tournamentId: string
): ApiOfficialPostRequest => ({
  official: {
    id: official.id,
    name: official.name,
    license_number: official.licenseNumber || undefined,
    username: official.username,
    tournament_id: tournamentId
  }
});

export const apiOfficialToEntities = (
  entities: { [key: string]: OfficialEntity },
  apiOfficial: ApiOfficial
): { [key: string]: OfficialEntity } => ({
  ...entities,
  [apiOfficial.id]: mapApiOfficialToOfficialEntity(apiOfficial)
});
