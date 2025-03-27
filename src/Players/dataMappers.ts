import {
  ApiPlayer,
  ApiPlayerPatchRequest,
  ApiPlayerPostRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerEntity, PlayersMap } from './state';
import { DEFAULT_TEAM } from '../Teams/state';
import { mapApiRegistrationResponseResourceResponseToRegistrationResponse } from '../Registrations/dataMappers';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';

export const mapApiPlayerToPlayerEntity = (
  apiPlayer: ApiPlayer
): PlayerEntity => ({
  id: apiPlayer.id,
  name: apiPlayer.name,
  shirtName: apiPlayer.shirt_name || '',
  shirtNumber: apiPlayer.shirt_number || '',
  instagram: apiPlayer.instagram,
  facebook: apiPlayer.facebook,
  twitter: apiPlayer.twitter,
  username: apiPlayer.username,
  team: DEFAULT_TEAM,
  teamId: apiPlayer.team_id || '',
  state: apiPlayer.state,
  photoUrl: apiPlayer.photo_url || '',
  registrationResponse:
    apiPlayer.registration_response &&
    mapApiRegistrationResponseResourceResponseToRegistrationResponse(
      apiPlayer.registration_response
    )
});

export const mapPlayerEntityToApiPlayerPostRequest = (
  player: PlayerEntity,
  tournamentId: string
): ApiPlayerPostRequest => ({
  player: {
    id: player.id,
    name: player.name,
    shirt_name: player.shirtName ? player.shirtName : null,
    shirt_number: player.shirtNumber ? player.shirtNumber : null,
    instagram: player.instagram,
    facebook: player.facebook,
    twitter: player.twitter,
    username: player.username,
    tournament_id: tournamentId,
    team_id: player.team.id && player.team.id,
    photo_url: player.photoUrl ? player.photoUrl : '',
    state: player.state
  }
});

export const mapPlayerEntityToApiPlayerPatchRequest = (
  player: PlayerEntity
): ApiPlayerPatchRequest => ({
  player: {
    id: player.id,
    name: player.name,
    shirt_name: player.shirtName ? player.shirtName : null,
    shirt_number: player.shirtNumber ? player.shirtNumber : null,
    instagram: player.instagram,
    facebook: player.facebook,
    twitter: player.twitter,
    username: player.username,
    team_id: player.team.id && player.team.id,
    state: player.state,
    photo_url: player.photoUrl ? player.photoUrl : ''
  }
});

export const mapPlayerMapToPlayerDisplayName = (
  playersMap: PlayersMap,
  playerId: string
) =>
  playersMap[playerId]
    ? playersMap[playerId].shirtName || playersMap[playerId].name
    : '';

export const mapFileReferenceToApiPlayerPhoto = (
  fileReference: FileReference
) => fileReference.publicUrl;

export const mapPhayerPhotoToApiFileReference = (
  player: PlayerEntity
): FileReference => ({
  publicUrl: player.photoUrl,
  filename: '',
  url: player.photoUrl
});
