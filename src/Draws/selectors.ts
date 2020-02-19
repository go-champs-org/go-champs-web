import { DrawEntity, DrawState } from './state';

const byOrder = (drawA: DrawEntity, drawB: DrawEntity) =>
  drawA.order - drawB.order;

export const draws = (state: DrawState): DrawEntity[] =>
  Object.keys(state.draws)
    .map((key: string) => state.draws[key])
    .sort(byOrder);

export const drawsLoading = (state: DrawState): boolean =>
  state.isLoadingRequestTournament;
