export interface OfficialProfileEntity {
  username: string;
  name: string;
  photoUrl: string;
  category: string;
  signature: string;
  signaturePin: string;
}

export interface OfficialProfileState {
  isLoadingDeleteOfficialProfile: boolean;
  isLoadingPatchOfficialProfile: boolean;
  isLoadingPatchOfficialProfileSignature: boolean;
  isLoadingPostOfficialProfile: boolean;
  isLoadingRequestOfficialProfile: boolean;
  isLoadingRequestOfficialProfiles: boolean;
  officialProfiles: { [key: string]: OfficialProfileEntity };
}

export const initialState: OfficialProfileState = {
  isLoadingDeleteOfficialProfile: false,
  isLoadingPatchOfficialProfile: false,
  isLoadingPatchOfficialProfileSignature: false,
  isLoadingPostOfficialProfile: false,
  isLoadingRequestOfficialProfile: false,
  isLoadingRequestOfficialProfiles: false,
  officialProfiles: {}
};

export const DEFAULT_OFFICIAL_PROFILE: OfficialProfileEntity = {
  username: '',
  name: '',
  photoUrl: '',
  category: '',
  signature: '',
  signaturePin: ''
};
