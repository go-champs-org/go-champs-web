import { OfficialEntity, OfficialState, DEFAULT_OFFICIAL } from './state';

export const officialById = (
  state: OfficialState,
  officialId: string
): OfficialEntity => state.officials[officialId] || DEFAULT_OFFICIAL;

export const officials = (state: OfficialState): OfficialEntity[] =>
  Object.keys(state.officials).map((officialId: string) =>
    officialById(state, officialId)
  );

export const officialsMap = (
  state: OfficialState
): { [key: string]: OfficialEntity } => state.officials;

export const deletingOfficial = (state: OfficialState): boolean =>
  state.isLoadingDeleteOfficial;

export const patchingOfficial = (state: OfficialState): boolean =>
  state.isLoadingPatchOfficial;

export const postingOfficial = (state: OfficialState): boolean =>
  state.isLoadingPostOfficial;

export const tournamentLoading = (state: OfficialState): boolean =>
  state.isLoadingRequestTournament;
