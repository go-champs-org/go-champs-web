import {
  TournamentEntity,
  TournamentState,
  DEFAULT_TOURNAMENT,
  PlayerStatMap,
  PlayerStatEntity
} from './state';
import { SelectOptionType } from '../Shared/UI/Form/Select';

export const tournamentBySlug = (
  state: TournamentState,
  slug?: string
): TournamentEntity => {
  if (!slug || !state.tournaments[slug]) {
    return DEFAULT_TOURNAMENT;
  }
  return state.tournaments[slug];
};

export const tournamentPlayerStatsBySlug = (
  state: TournamentState,
  slug?: string
): PlayerStatEntity[] => {
  const tournament = tournamentBySlug(state, slug);

  return tournament.playerStats;
};

export const tournamentPlayerStatsMapBySlug = (
  state: TournamentState,
  slug?: string
): PlayerStatMap => {
  const tournament = tournamentBySlug(state, slug);

  return tournament.playerStats.reduce((playerStatsMap, playerStat) => {
    return {
      ...playerStatsMap,
      [playerStat.id]: playerStat
    };
  }, {});
};

export const tournamentPlayerStatsForSelectInput = (
  state: TournamentState,
  slug?: string
): SelectOptionType[] => {
  const allPlayerStatsLog = tournamentPlayerStatsBySlug(state, slug);
  return allPlayerStatsLog.map((playerStats: PlayerStatEntity) => ({
    value: playerStats.id,
    label: playerStats.title
  }));
};

export const tournaments = (state: TournamentState) =>
  Object.keys(state.tournaments).map((key: string) => state.tournaments[key]);

export const tournamentsLoading = (state: TournamentState) =>
  state.isLoadingRequestTournaments;
export const tournamentLoading = (state: TournamentState) =>
  state.isLoadingRequestTournament;
export const patchingTournament = (state: TournamentState): boolean =>
  state.isLoadingPatchTournament;
export const postingTournament = (state: TournamentState): boolean =>
  state.isLoadingPostTournament;
export const deletingTournament = (state: TournamentState): boolean =>
  state.isLoadingDeleteTournament;
