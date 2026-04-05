import {
  ApiOfficialProfile,
  ApiOfficialProfilePostRequest,
  ApiOfficialProfilePatchRequest
} from '../Shared/httpClient/apiTypes';
import { OfficialProfileEntity } from './state';

export const mapApiOfficialProfileToOfficialProfileEntity = (
  apiOfficialProfile: ApiOfficialProfile
): OfficialProfileEntity => ({
  username: apiOfficialProfile.username,
  name: apiOfficialProfile.name || '',
  photoUrl: apiOfficialProfile.photo_url || '',
  signature: apiOfficialProfile.signature || '',
  signaturePin: apiOfficialProfile.signature_pin || ''
});

export const mapOfficialProfileEntityToApiOfficialProfilePostRequest = (
  officialProfile: OfficialProfileEntity
): ApiOfficialProfilePostRequest => ({
  official_profile: {
    username: officialProfile.username,
    name: officialProfile.name,
    photo_url: officialProfile.photoUrl,
    signature: officialProfile.signature,
    signature_pin: officialProfile.signaturePin
  }
});

export const mapOfficialProfileEntityToApiOfficialProfilePatchRequest = (
  officialProfile: OfficialProfileEntity
): ApiOfficialProfilePatchRequest => ({
  official_profile: {
    username: officialProfile.username,
    name: officialProfile.name,
    photo_url: officialProfile.photoUrl,
    signature: officialProfile.signature,
    signature_pin: officialProfile.signaturePin
  }
});
