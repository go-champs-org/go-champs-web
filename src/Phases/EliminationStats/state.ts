export interface PhaseEliminationStatEntity {
  id: string;
  title: string;
}

export interface PhaseEliminationStatState {
  eliminationStats: { [key: string]: PhaseEliminationStatEntity };
}

export const initialState: PhaseEliminationStatState = {
  eliminationStats: {}
};
