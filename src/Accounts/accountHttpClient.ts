import httpClient from '../Shared/httpClient/httpClient';
import {
  ApiSignInRequest,
  ApiUserResponse,
  ApiSignUpRequest,
  ApiPasswordResetRequest,
  ApiAccountRecoveryRequest
} from '../Shared/httpClient/apiTypes';
import {
  SignInEntity,
  SignUpEntity,
  PasswordResetEntity,
  AccountRecoveryEntity
} from './entity';

const ACCOUNT_API = `${process.env.REACT_APP_API_HOST}v1/users`;

const passwordReset = async (
  user: PasswordResetEntity
): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}`;

  return await httpClient.patch<ApiPasswordResetRequest, ApiUserResponse>(url, {
    user
  });
};

const recovery = async (user: AccountRecoveryEntity): Promise<void> => {
  const url = `${ACCOUNT_API}/recovery`;

  return await httpClient.post<ApiAccountRecoveryRequest, void>(url, user);
};

const signIn = async (user: SignInEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signin`;

  return await httpClient.post<ApiSignInRequest, ApiUserResponse>(url, user);
};

const signUp = async (user: SignUpEntity): Promise<ApiUserResponse> => {
  const url = `${ACCOUNT_API}/signup`;

  return await httpClient.post<ApiSignUpRequest, ApiUserResponse>(url, {
    user
  });
};

export default {
  recovery,
  passwordReset,
  signIn,
  signUp
};
