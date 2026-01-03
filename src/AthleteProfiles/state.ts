import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';

export interface AthleteProfileEntity {
  username: string;
  name: string;
  photoUrl: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tournaments?: ApiTournamentWithDependecies[]; // This should be use only for reading data, AthleteProfile are not strictly linked to Tournaments
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
