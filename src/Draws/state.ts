export interface DrawMatchEntity {
  id: string;
  firstTeamId?: string;
  firstTeamParentMatchId?: string;
  firstTeamPlaceholder?: string;
  firstTeamScore?: string;
  secondTeamId?: string;
  secondTeamParentMatchId?: string;
  secondTeamPlaceholder?: string;
  secondTeamScore?: string;
}

export interface DrawEntity {
  id: string;
  order: number;
  title: string;
  matches: DrawMatchEntity[];
}

export interface DrawState {
  isLoadingDeleteDraw: boolean;
  isLoadingPatchDraw: boolean;
  isLoadingPostDraw: boolean;
  isLoadingRequestTournament: boolean;
  draws: { [key: string]: DrawEntity };
}

export const initialState: DrawState = {
  isLoadingDeleteDraw: false,
  isLoadingPatchDraw: false,
  isLoadingPostDraw: false,
  isLoadingRequestTournament: false,
  draws: {}
};
