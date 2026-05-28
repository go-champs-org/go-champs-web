import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';

export interface CareerStat {
  slug: string;
  total: number;
  average: number;
}

export interface CareerStatsBySport {
  sport_slug: string;
  sport_name: string;
  tournaments_count: number;
  stats: CareerStat[];
}

export interface AthleteProfileEntity {
  username: string;
  name: string;
  photoUrl: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tournaments?: ApiTournamentWithDependecies[]; // This should be use only for reading data, AthleteProfile are not strictly linked to Tournaments
  career_stats?: CareerStatsBySport[];
}

export interface AthleteProfileState {
  isLoadingDeleteAthleteProfile: boolean;
  isLoadingPatchAthleteProfile: boolean;
  isLoadingPostAthleteProfile: boolean;
  isLoadingRequestAthleteProfile: boolean;
  isLoadingRequestAthleteProfiles: boolean;
  athleteProfiles: { [key: string]: AthleteProfileEntity };
}

export const initialState: AthleteProfileState = {
  isLoadingDeleteAthleteProfile: false,
  isLoadingPatchAthleteProfile: false,
  isLoadingPostAthleteProfile: false,
  isLoadingRequestAthleteProfile: false,
  isLoadingRequestAthleteProfiles: false,
  athleteProfiles: {}
};

export const DEFAULT_ATHLETE_PROFILE: AthleteProfileEntity = {
  username: '',
  name: '',
  photoUrl: '',
  facebook: '',
  instagram: '',
  twitter: '',
  tournaments: []
};
