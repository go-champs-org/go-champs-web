import { TeamEntity, DEFAULT_TEAM } from '../Teams/state';

export interface PlayerEntity {
  facebook: string;
  id: string;
  instagram: string;
  name: string;
  username: string;
  twitter: string;
  team: TeamEntity;
  teamId: string;
}

export interface PlayerState {
  isLoadingDeletePlayer: boolean;
  isLoadingPatchPlayer: boolean;
  isLoadingPostPlayer: boolean;
  isLoadingRequestTournament: boolean;
  players: { [key: string]: PlayerEntity };
}

export const initialState: PlayerState = {
  isLoadingDeletePlayer: false,
  isLoadingPatchPlayer: false,
  isLoadingPostPlayer: false,
  isLoadingRequestTournament: false,
  players: {}
};

export const DEFAULT_PLAYER: PlayerEntity = {
  facebook: '',
  id: '',
  instagram: '',
  name: '',
  username: '',
  twitter: '',
  team: DEFAULT_TEAM,
  teamId: ''
};
