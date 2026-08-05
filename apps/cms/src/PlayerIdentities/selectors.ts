import { DEFAULT_PLAYER_IDENTITY, PlayerIdentityEntity, PlayerIdentityState } from './state';

export const playerIdentityByPlayerId = (
  state: PlayerIdentityState,
  playerId: string
): PlayerIdentityEntity => {
  if (!playerId || !state.playerIdentities[playerId]) {
    return DEFAULT_PLAYER_IDENTITY;
  }

  return state.playerIdentities[playerId];
};

export const playerIdentityLoading = (state: PlayerIdentityState): boolean =>
  state.isLoadingRequestPlayerIdentity;
export const savingPlayerIdentity = (state: PlayerIdentityState): boolean =>
  state.isLoadingPostPlayerIdentity || state.isLoadingPutPlayerIdentity;
export const deletingPlayerIdentity = (state: PlayerIdentityState): boolean =>
  state.isLoadingDeletePlayerIdentity;
