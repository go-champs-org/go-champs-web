// Lets apps/public read the logged-in username client-side to switch its
// navbar between "sign in" and the account link, without either app calling
// the other's API. Cookies (unlike localStorage) are shared across ports in
// dev and across the cms/public split in prod, since both are served from
// the same domain via the Cloudflare Worker's PUBLIC service binding.
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
