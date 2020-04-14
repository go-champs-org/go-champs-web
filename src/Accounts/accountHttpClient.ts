import httpClient from '../Shared/httpClient/httpClient';
import {
  ApiSignInRequest,
  ApiUserResponse,
  ApiSignUpRequest
} from '../Shared/httpClient/apiTypes';
import { UserEntity } from './entity';

const ACCOUNT_API = `${process.env.REACT_APP_API_HOST}v1/users`;

const signIn = async (user: UserEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signin`;

  return await httpClient.post<ApiSignInRequest, ApiUserResponse>(url, user);
};

const signUp = async (user: UserEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signup`;

  return await httpClient.post<ApiSignUpRequest, ApiUserResponse>(url, {
    user
  });
};

export default {
  signIn,
  signUp
};
