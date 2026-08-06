import { ApiPlayer } from './apiTypes';

export interface PlayerEntity {
  id: string;
  name: string;
  shirtName: string;
  shirtNumber: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  username?: string;
  teamId: string;
  state?: string;
  photoUrl: string;
  licenseNumber: string;
}

export const mapApiPlayerToPlayerEntity = (apiPlayer: ApiPlayer): PlayerEntity => ({
  id: apiPlayer.id,
  name: apiPlayer.name,
  shirtName: apiPlayer.shirt_name || '',
  shirtNumber: apiPlayer.shirt_number || '',
  instagram: apiPlayer.instagram,
  facebook: apiPlayer.facebook,
  twitter: apiPlayer.twitter,
  username: apiPlayer.username,
  teamId: apiPlayer.team_id || '',
  state: apiPlayer.state,
  photoUrl: apiPlayer.photo_url || '',
  licenseNumber: apiPlayer.license_number || ''
});
