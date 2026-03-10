export type PlayerStatVisibility = 'public' | 'private';

export type TournamentVisibility = 'public' | 'private';

export enum TournamentVisibilityEnum {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export interface TournamentSponsorEntity {
  name: string;
  link: string;
  logoUrl: string;
}

export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  hasAggregatedPlayerStats?: boolean;
  facebook: string;
  instagram: string;
  logoUrl: string;
  siteUrl: string;
  sponsors: TournamentSponsorEntity[];
  twitter: string;
  playerStats: PlayerStatEntity[];
  teamStats: TeamStatEntity[];
  sportName: string;
  sportSlug: string;
  visibility: TournamentVisibility;
}

export interface PlayerStatEntity {
  id: string;
  title: string;
  slug: string;
  visibility: PlayerStatVisibility;
}

export interface PlayerStatMap {
  [id: string]: PlayerStatEntity;
}

export interface TeamStatEntity {
  id: string;
  title: string;
  slug: string;
  source: string;
}

export interface PlanEntity {
  slug: string;
  amount: string;
  active: boolean;
  description: string;
  name: string;
  sportId: string;
}

export interface BillingAgreementEntity {
  active: boolean;
  agreedAmount: string | null;
  dueDay: number;
  plan: PlanEntity;
  planId: string;
  selectedCampaigns: string[];
  signedAt: string;
  tournamentId: string;
  username: string;
}

export interface TournamentState {
  isLoadingDeleteTournament: boolean;
  isLoadingPatchTournament: boolean;
  isLoadingPostTournament: boolean;
  isLoadingRequestTournament: boolean;
  isLoadingRequestTournaments: boolean;
  isLoadingBillingAgreement: boolean;
  tournaments: { [key: string]: TournamentEntity };
  billingAgreements: { [tournamentId: string]: BillingAgreementEntity | null };
}

export const initialState: TournamentState = {
  isLoadingDeleteTournament: false,
  isLoadingPatchTournament: false,
  isLoadingPostTournament: false,
  isLoadingRequestTournament: false,
  isLoadingRequestTournaments: false,
  isLoadingBillingAgreement: false,
  tournaments: {},
  billingAgreements: {}
};

export const DEFAULT_TOURNAMENT: TournamentEntity = {
  id: '',
  name: '',
  slug: '',
  facebook: '',
  instagram: '',
  logoUrl: '',
  siteUrl: '',
  sponsors: [],
  twitter: '',
  playerStats: [],
  teamStats: [],
  sportName: '',
  sportSlug: '',
  visibility: 'public'
};

export const DEFAULT_SPONSOR: TournamentSponsorEntity = {
  name: '',
  link: '',
  logoUrl: ''
};

export const DEFAULT_PLAYER_STAT: PlayerStatEntity = {
  id: '',
  title: '',
  slug: '',
  visibility: 'public'
};

export const DEFAULT_TEAM_STAT: TeamStatEntity = {
  id: '',
  title: '',
  slug: '',
  source: ''
};
