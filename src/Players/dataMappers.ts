import {
  ApiPlayer,
  ApiPlayerPatchRequest,
  ApiPlayerPostRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerEntity, PlayersMap } from './state';
import { DEFAULT_TEAM } from '../Teams/state';
import { mapApiRegistrationResponseResourceResponseToRegistrationResponse } from '../Registrations/dataMappers';

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
    team_id: player.team.id && player.team.id
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
    team_id: player.team.id && player.team.id
  }
});

export const mapPlayerMapToPlayerDisplayName = (
  playersMap: PlayersMap,
  playerId: string
) =>
  playersMap[playerId]
    ? playersMap[playerId].shirtName || playersMap[playerId].name
    : '';
