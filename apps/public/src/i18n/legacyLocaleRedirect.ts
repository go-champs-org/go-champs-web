import { routing } from './routing';

const LEGACY_PREFIX = new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`);

const LEADING_SLASHES = /^[/\\]+/;

export const legacyLocaleRedirect = (
  pathname: string,
  search: string
): { locale: string; location: string } | null => {
  const match = pathname.match(LEGACY_PREFIX);

  return match
    ? { locale: match[1], location: `/${(match[2] ?? '').replace(LEADING_SLASHES, '')}${search}` }
    : null;
};
