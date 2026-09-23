// Set by apps/cms on sign in (see apps/cms/src/Accounts/cookies.ts). Read
// here, client-side only, so ISR-cached pages stay generic across visitors
// and the per-user navbar state applies after hydration.
const USERNAME_COOKIE_NAME = 'gc_username';

export const readUsernameCookie = (): string | null => {
  const match = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${USERNAME_COOKIE_NAME}=`));

  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match.split('=')[1]);
  } catch {
    return null;
  }
};
