import { FacebookSignUpEntity } from './entity';
import { ApiFacebookSignUpRequest } from '../Shared/httpClient/apiTypes';

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
