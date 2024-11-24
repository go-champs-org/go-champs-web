export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  hasAggregatedPlayerStats?: boolean;
  facebook: string;
  instagram: string;
  siteUrl: string;
  twitter: string;
  playerStats: PlayerStatEntity[];
  teamStats: TeamStatEntity[];
  sportName: string;
  sportSlug: string;
}

export interface PlayerStatEntity {
  id: string;
  title: string;
  slug: string;
}

export interface PlayerStatMap {
  [id: string]: PlayerStatEntity;
}

export interface TeamStatEntity {
  id: string;
  title: string;
  source: string;
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
  playerStats: [],
  teamStats: []
};

export const DEFAULT_PLAYER_STAT: PlayerStatEntity = {
  id: '',
  title: ''
};

export const DEFAULT_TEAM_STAT: TeamStatEntity = {
  id: '',
  title: '',
  source: ''
};
