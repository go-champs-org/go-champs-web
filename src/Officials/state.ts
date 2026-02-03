export interface OfficialEntity {
  id: string;
  name: string;
  licenseNumber: string;
  username: string;
}

export interface OfficialState {
  isLoadingDeleteOfficial: boolean;
  isLoadingPatchOfficial: boolean;
  isLoadingPostOfficial: boolean;
  isLoadingRequestTournament: boolean;
  officials: { [key: string]: OfficialEntity };
}

export const DEFAULT_OFFICIAL: OfficialEntity = {
  id: '',
  name: '',
  licenseNumber: '',
  username: ''
};

export const initialState: OfficialState = {
  isLoadingDeleteOfficial: false,
  isLoadingPatchOfficial: false,
  isLoadingPostOfficial: false,
  isLoadingRequestTournament: false,
  officials: {}
};
