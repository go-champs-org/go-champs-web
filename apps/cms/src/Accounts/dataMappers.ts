import { FacebookSignUpEntity, FacebookSignInEntity } from './entity';
import {
  ApiFacebookSignUpRequest,
  ApiFacebookSignInRequest
} from '../Shared/httpClient/apiTypes';

export const mapFacebookSignUpEntityToApiFacebookSignUpPostRequest = (
  facebookSignUpEntity: FacebookSignUpEntity
): ApiFacebookSignUpRequest => ({
  user: {
    email: facebookSignUpEntity.email,
    facebook_id: facebookSignUpEntity.facebookId,
    username: facebookSignUpEntity.username,
    recaptcha: facebookSignUpEntity.recaptcha
  }
});

export const mapFacebookSignInEntityToApiFacebookSignInPostRequest = (
  facebookSignInEntity: FacebookSignInEntity
): ApiFacebookSignInRequest => ({
  facebook_id: facebookSignInEntity.facebookId
});
