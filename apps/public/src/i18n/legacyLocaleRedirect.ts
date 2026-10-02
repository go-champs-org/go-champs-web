import { routing } from './routing';

const LEGACY_PREFIX = new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`);

export const legacyLocaleRedirect = (
  pathname: string,
  search: string
): { locale: string; location: string } | null => {
  const match = pathname.match(LEGACY_PREFIX);

  return match ? { locale: match[1], location: `${match[2] || '/'}${search}` } : null;
};
