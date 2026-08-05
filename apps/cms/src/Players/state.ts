import { PlayerIdentityEntity } from '../PlayerIdentities/state';
import { RegistrationResponseEntity } from '../Registrations/state';
import { ApiPlayerState } from '../Shared/httpClient/apiTypes';
import { TeamEntity, DEFAULT_TEAM } from '../Teams/state';

export interface PlayerEntity {
  facebook: string;
  id: string;
  instagram: string;
  name: string;
  shirtName: string;
  shirtNumber: string;
  licenseNumber: string;
  username: string;
  twitter: string;
  team: TeamEntity;
  teamId: string;
  registrationResponse?: RegistrationResponseEntity;
  photoUrl: string;
  state: ApiPlayerState;
}

export interface PlayerState {
  isLoadingDeletePlayer: boolean;
  isLoadingPatchPlayer: boolean;
  isLoadingPostPlayer: boolean;
  isLoadingRequestTournament: boolean;
  players: { [key: string]: PlayerEntity };
  isLoadingDeletePlayerIdentity: boolean;
  isLoadingPostPlayerIdentity: boolean;
  isLoadingPutPlayerIdentity: boolean;
  isLoadingRequestPlayerIdentity: boolean;
  playerIdentities: { [playerId: string]: PlayerIdentityEntity };
}

export interface PlayersMap {
  [id: string]: PlayerEntity;
}

export const initialState: PlayerState = {
  isLoadingDeletePlayer: false,
  isLoadingPatchPlayer: false,
  isLoadingPostPlayer: false,
  isLoadingRequestTournament: false,
  players: {},
  isLoadingDeletePlayerIdentity: false,
  isLoadingPostPlayerIdentity: false,
  isLoadingPutPlayerIdentity: false,
  isLoadingRequestPlayerIdentity: false,
  playerIdentities: {}
};

export const DEFAULT_PLAYER: PlayerEntity = {
  facebook: '',
  id: '',
  instagram: '',
  name: '',
  shirtName: '',
  shirtNumber: '',
  licenseNumber: '',
  username: '',
  twitter: '',
  team: DEFAULT_TEAM,
  teamId: '',
  state: 'available',
  photoUrl: ''
};
