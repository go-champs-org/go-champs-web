import { PlayerEntity, PlayerState, DEFAULT_PLAYER } from './state';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { TeamState, DEFAULT_TEAM, TeamEntity } from '../Teams/state';

const mergeTeam = (player: PlayerEntity, team?: TeamEntity) => ({
  ...player,
  team: team || DEFAULT_TEAM
});

export const playerById = (
  state: PlayerState,
  teamState: TeamState,
  playerId?: string
): PlayerEntity => {
  if (!playerId || !state.players[playerId]) {
    return DEFAULT_PLAYER;
  }

  const currentPlayer = state.players[playerId];

  return mergeTeam(currentPlayer, teamState.teams[currentPlayer.teamId]);
};

export const players = (
  state: PlayerState,
  teamState: TeamState
): PlayerEntity[] => {
  return Object.keys(state.players).map((key: string) => {
    const currentPlayer = state.players[key];

    return mergeTeam(currentPlayer, teamState.teams[currentPlayer.teamId]);
  });
};

export const playersForSelectInput = (
  state: PlayerState,
  teamState: TeamState
): SelectOptionType[] => {
  const allPlayers = players(state, teamState);
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
