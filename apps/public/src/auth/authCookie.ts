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

const ORGANIZATIONS_COOKIE_NAME = 'gc_organizations';

export const readOrganizationIdsCookie = (): string[] => {
  const match = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${ORGANIZATIONS_COOKIE_NAME}=`));

  if (!match) {
    return [];
  }

  try {
    return decodeURIComponent(match.split('=')[1]).split(',').filter(Boolean);
  } catch {
    return [];
  }
};

export const isOrganizationMember = (
  organizationIds: string[],
  organizationId: string
): boolean => organizationId !== '' && organizationIds.includes(organizationId);
