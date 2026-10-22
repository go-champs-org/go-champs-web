// Lets apps/public read the logged-in username client-side to switch its
// navbar between "sign in" and the account link, without either app calling
// the other's API. Cookies (unlike localStorage) are shared across ports in
// dev and across the cms/public split in prod, since both are served from
// the same domain via the Cloudflare Worker's PUBLIC service binding.
import {
  LOCAL_STORAGE_ORGANIZATIONS_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY
} from './constants';

export const USERNAME_COOKIE_NAME = 'gc_username';

const USERNAME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const setUsernameCookie = (username: string) => {
  document.cookie = `${USERNAME_COOKIE_NAME}=${encodeURIComponent(
    username
  )}; path=/; max-age=${USERNAME_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

export const clearUsernameCookie = () => {
  document.cookie = `${USERNAME_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
};

export const ORGANIZATIONS_COOKIE_NAME = 'gc_organizations';

export const setOrganizationIdsCookie = (organizationIds: string[]) => {
  document.cookie = `${ORGANIZATIONS_COOKIE_NAME}=${encodeURIComponent(
    organizationIds.join(',')
  )}; path=/; max-age=${USERNAME_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

export const clearOrganizationIdsCookie = () => {
  document.cookie = `${ORGANIZATIONS_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
};

// Sessions that began before these cookies existed only live in localStorage,
// and the cookies expire while localStorage does not. Re-deriving them on every
// CMS load keeps apps/public's navbar in step with the real session.
export const syncAuthCookies = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

  if (!token || !username) {
    clearUsernameCookie();
    clearOrganizationIdsCookie();
    return;
  }

  setUsernameCookie(username);

  const organizationIds = localStorage.getItem(LOCAL_STORAGE_ORGANIZATIONS_KEY);
  if (organizationIds) {
    setOrganizationIdsCookie(organizationIds.split(','));
  } else {
    clearOrganizationIdsCookie();
  }
};
