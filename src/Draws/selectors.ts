import { DrawEntity, DrawState, DEFAULT_DRAW } from './state';

const byOrder = (drawA: DrawEntity, drawB: DrawEntity) =>
  drawA.order - drawB.order;

export const draws = (state: DrawState): DrawEntity[] =>
  Object.keys(state.draws)
    .map((key: string) => state.draws[key])
    .sort(byOrder);

export const drawById = (state: DrawState, drawId: string) => {
  if (!drawId || !state.draws[drawId]) {
    return DEFAULT_DRAW;
  }
  return state.draws[drawId];
};

export const drawsLoading = (state: DrawState): boolean =>
  state.isLoadingRequestTournament;
export const patchingDraw = (state: DrawState): boolean =>
  state.isLoadingPatchDraw;
export const postingDraw = (state: DrawState): boolean =>
  state.isLoadingPostDraw;
export const deletingDraw = (state: DrawState): boolean =>
  state.isLoadingDeleteDraw;
