import {
  ApiOfficialProfile,
  ApiOfficialProfilePostRequest,
  ApiOfficialProfilePatchRequest
} from '../Shared/httpClient/apiTypes';
import { OfficialProfileEntity } from './state';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';

export const mapApiOfficialProfileToOfficialProfileEntity = (
  apiOfficialProfile: ApiOfficialProfile
): OfficialProfileEntity => ({
  username: apiOfficialProfile.username,
  name: apiOfficialProfile.name || '',
  photoUrl: apiOfficialProfile.photo_url || '',
  category: apiOfficialProfile.category || '',
  licenseNumber: apiOfficialProfile.license_number || '',
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
    category: officialProfile.category,
    license_number: officialProfile.licenseNumber,
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
    category: officialProfile.category,
    license_number: officialProfile.licenseNumber,
    signature: officialProfile.signature,
    signature_pin: officialProfile.signaturePin
  }
});

export const mapFileReferenceToApiOfficialProfilePhoto = (
  fileReference: FileReference
) => fileReference.publicUrl;

export const mapOfficialProfilePhotoToApiFileReference = (
  officialProfile: OfficialProfileEntity
): FileReference => ({
  publicUrl: officialProfile.photoUrl,
  filename: '',
  url: officialProfile.photoUrl
});
