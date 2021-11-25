export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  facebook: string;
  instagram: string;
  siteUrl: string;
  twitter: string;
  playerStats: PlayerStatEntity[];
}

export interface PlayerStatEntity {
  id: string;
  title: string;
}

export interface PlayerStatMap {
  [id: string]: PlayerStatEntity;
}

export interface TournamentState {
  isLoadingDeleteTournament: boolean;
  isLoadingPatchTournament: boolean;
  isLoadingPostTournament: boolean;
  isLoadingRequestTournament: boolean;
  isLoadingRequestTournaments: boolean;
  tournaments: { [key: string]: TournamentEntity };
}

export const initialState: TournamentState = {
  isLoadingDeleteTournament: false,
  isLoadingPatchTournament: false,
  isLoadingPostTournament: false,
  isLoadingRequestTournament: false,
  isLoadingRequestTournaments: false,
  tournaments: {}
};

export const DEFAULT_TOURNAMENT: TournamentEntity = {
  id: '',
  name: '',
  slug: '',
  facebook: '',
  instagram: '',
  siteUrl: '',
  twitter: '',
  playerStats: []
};

export const DEFAULT_PLAYER_STAT: PlayerStatEntity = {
  id: '',
  title: ''
};
