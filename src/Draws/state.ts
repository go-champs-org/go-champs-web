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

export interface PostDrawEntity {
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

export const DEFAULT_DRAW_MATCH: DrawMatchEntity = {
  id: '',
  firstTeamId: '',
  firstTeamParentMatchId: '',
  firstTeamPlaceholder: '',
  firstTeamScore: '',
  secondTeamId: '',
  secondTeamParentMatchId: '',
  secondTeamPlaceholder: '',
  secondTeamScore: ''
};

export const DEFAULT_DRAW: DrawEntity = {
  id: '',
  order: 0,
  title: '',
  matches: []
};
