import { defineRouting } from 'next-intl/routing';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from './localeCookie';

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'never',
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax'
  }
});
