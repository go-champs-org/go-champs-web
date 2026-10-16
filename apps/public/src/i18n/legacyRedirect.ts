import { legacyLocaleRedirect } from './legacyLocaleRedirect';
import { legacyTournamentPath } from './legacyTournamentRedirect';

export interface LegacyRedirect {
  locale: string | null;
  location: string;
}

const redirectTo = (
  location: string | null,
  locale: string | null,
  search: string
): LegacyRedirect | null =>
  location ? { locale, location: `${location}${search}` } : null;

const withoutLocale = (pathname: string) => {
  const stripped = legacyLocaleRedirect(pathname, '');

  return stripped
    ? { path: stripped.location, locale: stripped.locale, isLegacy: true }
    : { path: pathname, locale: null, isLegacy: false };
};

// A legacy locale prefix and a legacy Portuguese segment can both be on the
// same URL, and that must still be one redirect, not a chain of two.
export const legacyRedirect = (
  pathname: string,
  search: string
): LegacyRedirect | null => {
  const { path, locale, isLegacy } = withoutLocale(pathname);

  return redirectTo(
    legacyTournamentPath(path) || (isLegacy ? path : null),
    locale,
    search
  );
};
