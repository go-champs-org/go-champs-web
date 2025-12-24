import {
  ApiAthleteProfile,
  ApiAthleteProfilePostRequest,
  ApiAthleteProfilePatchRequest
} from '../Shared/httpClient/apiTypes';
import { AthleteProfileEntity } from './state';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';

export const mapApiAthleteProfileToAthleteProfileEntity = (
  apiAthleteProfile: ApiAthleteProfile
): AthleteProfileEntity => ({
  username: apiAthleteProfile.username,
  name: apiAthleteProfile.name || '',
  photoUrl: apiAthleteProfile.photo_url || '',
  facebook: apiAthleteProfile.facebook || '',
  instagram: apiAthleteProfile.instagram || '',
  twitter: apiAthleteProfile.twitter || ''
});

export const mapAthleteProfileEntityToApiAthleteProfilePostRequest = (
  athleteProfile: AthleteProfileEntity
): ApiAthleteProfilePostRequest => ({
  athlete_profile: {
    username: athleteProfile.username,
    name: athleteProfile.name,
    photo_url: athleteProfile.photoUrl,
    facebook: athleteProfile.facebook,
    instagram: athleteProfile.instagram,
    twitter: athleteProfile.twitter
  }
});

export const mapAthleteProfileEntityToApiAthleteProfilePatchRequest = (
  athleteProfile: AthleteProfileEntity
): ApiAthleteProfilePatchRequest => ({
  athlete_profile: {
    username: athleteProfile.username,
    name: athleteProfile.name,
    photo_url: athleteProfile.photoUrl,
    facebook: athleteProfile.facebook,
    instagram: athleteProfile.instagram,
    twitter: athleteProfile.twitter
  }
});

export const mapFileReferenceToApiAthleteProfilePhoto = (
  fileReference: FileReference
) => fileReference.publicUrl;

export const mapAthleteProfilePhotoToApiFileReference = (
  athleteProfile: AthleteProfileEntity
): FileReference => ({
  publicUrl: athleteProfile.photoUrl,
  filename: '',
  url: athleteProfile.photoUrl
});
