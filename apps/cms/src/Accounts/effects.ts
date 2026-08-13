import { Dispatch } from 'redux';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from 'react-facebook-login';
import {
  SignInEntity,
  SignUpEntity,
  AccountRecoveryEntity,
  AccountResetEntity,
  FacebookSignUpEntity
} from './entity';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  accountResetStart,
  accountResetSuccess,
  accountResetFailure,
  accountRecoveryStart,
  accountRecoverySuccess,
  accountRecoveryFailure,
  getAccountStart,
  getAccountSuccess,
  getAccountFailure
} from './actions';
import accountHttpClient from './accountHttpClient';
import { History, Location } from 'history';
import ApiError from '../Shared/httpClient/ApiError';
import { displayToast } from '../Shared/bulma/toast';
import { ApiOrganization } from '../Shared/httpClient/apiTypes';
import {
  LOCAL_STORAGE_ORGANIZATIONS_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY
} from './constants';

export const signIn = (
  user: SignInEntity,
  { history, location }: { history: History; location: Location }
) => async (dispatch: Dispatch) => {
  dispatch(signInStart());

  try {
    const response = await accountHttpClient.signIn(user);

    dispatch(signInSuccess(response));
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.token);
    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, response.data.username);
    const search = new URLSearchParams(location.search);
    if (search.get('redirectTo')) {
      history.push(search.get('redirectTo')!);
    } else {
      history.push('/Account');
    }
  } catch (err) {
    dispatch(signInFailure(err));

    if (err instanceof ApiError) {
      if (err.payload.status === 404) {
        return {
          email: ['user not found']
        };
      }

      if (err.payload.status === 401) {
        return {
          email: ['invalid credentials'],
          password: ['invalid credentials']
        };
      }
    }
  }
};

const SIGN_UP_FIELDS = ['email', 'password', 'username'];

/**
 * Turns a sign up rejection into field level errors react-final-form can
 * display, so that a taken username lands on the username field instead of a
 * generic toast. Anything that is not a field error keeps the toast.
 */
const signUpSubmitErrors = (err: unknown) => {
  if (err instanceof ApiError && err.payload.data && err.payload.data.errors) {
    const { errors } = err.payload.data;
    const fieldErrors = Object.keys(errors)
      .filter(field => SIGN_UP_FIELDS.includes(field))
      .reduce(
        (acc, field) => ({
          ...acc,
          [field]: ([] as string[]).concat(errors[field])
        }),
        {}
      );

    if (Object.keys(fieldErrors).length) {
      return fieldErrors;
    }
  }

  displayToast(`Sign up failed :(`, 'is-primary');
  return undefined;
};

export const signUp = (user: SignUpEntity, history: History) => async (
  dispatch: Dispatch
) => {
  dispatch(signUpStart());

  try {
    const response = await accountHttpClient.signUp(user);

    dispatch(signUpSuccess(response));
    history.push('/SignIn');
  } catch (err) {
    dispatch(signUpFailure(err));
    return signUpSubmitErrors(err);
  }
};

export const signUpWithRegistration = (
  user: SignUpEntity,
  registrationResponseId: string,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(signUpStart());

  try {
    const response = await accountHttpClient.signUpWithRegistration(
      user,
      registrationResponseId
    );

    dispatch(signUpSuccess(response));
    history.push('/SignIn');
  } catch (err) {
    dispatch(signUpFailure(err));
    return signUpSubmitErrors(err);
  }
};

export const facebookSignUp = (
  user: FacebookSignUpEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(signUpStart());

  try {
    const response = await accountHttpClient.facebookSignUp(user);

    dispatch(signUpSuccess(response));
    history.push('/SignIn');
  } catch (err) {
    dispatch(signUpFailure(err));
    displayToast(`Sign up failed :(`, 'is-primary');
  }
};

export const redirectToFacebookSignUp = (history: History) => async (
  facebookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse
) => {
  if (!('id' in facebookResponse)) {
    displayToast(`Sign up failed :(`, 'is-primary');
    return;
  }

  const { email, id: facebookId } = facebookResponse;

  try {
    const response = await accountHttpClient.facebookSignIn({
      facebookId
    });

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.token);
    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, response.data.username);
    history.push('/Account');
  } catch {
    history.push(`/FacebookSignUp?email=${email}&facebookId=${facebookId}`);
  }
};

export const signOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_ORGANIZATIONS_KEY);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
};

export const accountReset = (
  user: AccountResetEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(accountResetStart());

  try {
    await accountHttpClient.reset(user);

    dispatch(accountResetSuccess());
    displayToast(`Account reset successful`, 'is-success');
    history.push('/SignIn');
  } catch (err) {
    dispatch(accountResetFailure(err));
    displayToast(`Account reset failed :(`, 'is-primary');
  }
};

export const accountRecovery = (
  accountRecovery: AccountRecoveryEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(accountRecoveryStart());

  try {
    await accountHttpClient.recovery(accountRecovery);

    dispatch(accountRecoverySuccess());
    displayToast(`Check your e-mail`, 'is-success');
    history.push('/SignIn');
  } catch (err) {
    dispatch(accountRecoveryFailure(err));
    displayToast(`Account recovery failed :(`, 'is-primary');
  }
};

export const getAccount = (username: string) => async (dispatch: Dispatch) => {
  dispatch(getAccountStart());

  try {
    const response = await accountHttpClient.getAccount(username);

    const organizationIds = response.data.organizations.map(
      (organization: ApiOrganization) => organization.id
    );
    localStorage.setItem(
      LOCAL_STORAGE_ORGANIZATIONS_KEY,
      organizationIds.toString()
    );
    dispatch(getAccountSuccess(response));
  } catch (err) {
    dispatch(getAccountFailure(err));
    localStorage.removeItem(LOCAL_STORAGE_ORGANIZATIONS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
  }
};
