import { ApiOfficialInviteWithDetails } from '../Shared/httpClient/apiTypes';

export interface OfficialProfileEntity {
  username: string;
  name: string;
  photoUrl: string;
  category: string;
  licenseNumber: string;
  signature: string;
  signaturePin: string;
  pendingInvites: ApiOfficialInviteWithDetails[];
}

export interface OfficialProfileState {
  isLoadingDeleteOfficialProfile: boolean;
  isLoadingPatchOfficialProfile: boolean;
  isLoadingPatchOfficialProfileSignature: boolean;
  isLoadingPostOfficialProfile: boolean;
  isLoadingRequestOfficialProfile: boolean;
  isLoadingRequestOfficialProfiles: boolean;
  isApprovingOfficialProfileInvite: boolean;
  officialProfiles: { [key: string]: OfficialProfileEntity };
}

export const initialState: OfficialProfileState = {
  isLoadingDeleteOfficialProfile: false,
  isLoadingPatchOfficialProfile: false,
  isLoadingPatchOfficialProfileSignature: false,
  isLoadingPostOfficialProfile: false,
  isLoadingRequestOfficialProfile: false,
  isLoadingRequestOfficialProfiles: false,
  isApprovingOfficialProfileInvite: false,
  officialProfiles: {}
};

export const DEFAULT_OFFICIAL_PROFILE: OfficialProfileEntity = {
  username: '',
  name: '',
  photoUrl: '',
  category: '',
  licenseNumber: '',
  signature: '',
  signaturePin: '',
  pendingInvites: []
};
