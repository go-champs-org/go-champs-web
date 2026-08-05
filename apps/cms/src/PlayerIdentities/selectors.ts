import { PlayerState } from '../Players/state';
import { DEFAULT_PLAYER_IDENTITY, PlayerIdentityEntity } from './state';

export const playerIdentityByPlayerId = (
  state: PlayerState,
  playerId: string
): PlayerIdentityEntity => {
  if (!playerId || !state.playerIdentities[playerId]) {
    return DEFAULT_PLAYER_IDENTITY;
  }

  return state.playerIdentities[playerId];
};

export const playerIdentityLoading = (state: PlayerState): boolean =>
  state.isLoadingRequestPlayerIdentity;
export const savingPlayerIdentity = (state: PlayerState): boolean =>
  state.isLoadingPostPlayerIdentity || state.isLoadingPutPlayerIdentity;
export const deletingPlayerIdentity = (state: PlayerState): boolean =>
  state.isLoadingDeletePlayerIdentity;
