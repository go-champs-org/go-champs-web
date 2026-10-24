import { FacebookSignInEntity } from './entity';
import { ApiFacebookSignInRequest } from '../Shared/httpClient/apiTypes';

export const mapFacebookSignInEntityToApiFacebookSignInPostRequest = (
  facebookSignInEntity: FacebookSignInEntity
): ApiFacebookSignInRequest => ({
  facebook_id: facebookSignInEntity.facebookId
});
