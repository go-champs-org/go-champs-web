import {
  ApiPlayer,
  ApiPlayerPatchRequest,
  ApiPlayerPostRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerEntity } from './state';
import { DEFAULT_TEAM } from '../Teams/state';

export const mapApiPlayerToPlayerEntity = (
  apiPlayer: ApiPlayer
): PlayerEntity => ({
  id: apiPlayer.id,
  name: apiPlayer.name,
  instagram: apiPlayer.instagram,
  facebook: apiPlayer.facebook,
  twitter: apiPlayer.twitter,
  username: apiPlayer.username,
  team: DEFAULT_TEAM,
  teamId: apiPlayer.team_id || ''
});

export const mapPlayerEntityToApiPlayerPostRequest = (
  player: PlayerEntity,
  tournamentId: string
): ApiPlayerPostRequest => ({
  player: {
    id: player.id,
    name: player.name,
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
    instagram: player.instagram,
    facebook: player.facebook,
    twitter: player.twitter,
    username: player.username,
    team_id: player.team.id && player.team.id
  }
});
