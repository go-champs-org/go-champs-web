import {
  ApiPlayer,
  ApiPlayerPatchRequest,
  ApiPlayerPostRequest
} from '../Shared/httpClient/apiTypes';
import { PlayerEntity } from './state';

export const mapApiPlayerToPlayerEntity = (
  apiPlayer: ApiPlayer
): PlayerEntity => ({
  id: apiPlayer.id,
  name: apiPlayer.name,
  instagram: apiPlayer.instagram,
  facebook: apiPlayer.facebook,
  twitter: apiPlayer.twitter,
  username: apiPlayer.username
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
    tournament_id: tournamentId
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
    username: player.username
  }
});
