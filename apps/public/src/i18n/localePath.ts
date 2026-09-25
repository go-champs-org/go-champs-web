import { routing } from './routing';

// localePrefix: 'as-needed' — a /pt/... link would only bounce off the
// middleware's redirect, doubling every click and prefetch.
export const localePath = (locale: string, path: string): string =>
  locale === routing.defaultLocale ? path || '/' : `/${locale}${path}`;
