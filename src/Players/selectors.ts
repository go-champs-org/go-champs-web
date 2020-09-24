import { PlayerEntity, PlayerState, DEFAULT_PLAYER } from './state';
import { SelectOptionType } from '../Shared/UI/Form/Select';

export const playerById = (
  state: PlayerState,
  playerId?: string
): PlayerEntity => {
  if (!playerId || !state.players[playerId]) {
    return DEFAULT_PLAYER;
  }
  return state.players[playerId];
};

export const players = (state: PlayerState): PlayerEntity[] =>
  Object.keys(state.players).map((key: string) => state.players[key]);

export const playersForSelectInput = (
  state: PlayerState
): SelectOptionType[] => {
  const allPlayers = players(state);
  return allPlayers.map((player: PlayerEntity) => ({
    value: player.id,
    label: player.name
  }));
};

export const playersLoading = (state: PlayerState) =>
  state.isLoadingRequestTournament;
export const patchingPlayer = (state: PlayerState): boolean =>
  state.isLoadingPatchPlayer;
export const postingPlayer = (state: PlayerState): boolean =>
  state.isLoadingPostPlayer;
export const deletingPlayer = (state: PlayerState): boolean =>
  state.isLoadingDeletePlayer;
