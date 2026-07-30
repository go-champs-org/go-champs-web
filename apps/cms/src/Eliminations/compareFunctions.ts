import { EliminationEntity } from './state';

export const byOrder = (
  eliminationA: EliminationEntity,
  eliminationB: EliminationEntity
) => eliminationA.order - eliminationB.order;
