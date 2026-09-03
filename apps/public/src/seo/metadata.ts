import type { Metadata } from 'next';
import { routing } from '../i18n/routing';

// Netlify serves the public site from the same domain as the CMS (see the
// _redirects work in the rollout plan), so the canonical host is the live
// domain, not a per-deploy URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://go-champs.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Go Champs';

export const PUBLIC_ROUTES = [
  '',
  '/about',
  '/faq',
  '/contact',
  '/privacy',
  '/terms'
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  pt: 'pt_BR',
  en: 'en_US'
};

// Mirrors routing.ts's localePrefix: 'as-needed' — the default locale (pt)
// is never in the URL, so its canonical/alternate must match too.
export const pageUrl = (locale: string, path: string) =>
  locale === routing.defaultLocale
    ? `${SITE_URL}${path}`
    : `${SITE_URL}/${locale}${path}`;

export const localeUrls = (path: string) =>
  Object.fromEntries(
    routing.locales.map(locale => [locale, pageUrl(locale, path)])
  );

interface PageMetadataInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}

// A page that answers with a 404 still renders metadata, and without this the
// crawler would keep the dead URL in the index.
const robotsField = (noIndex: boolean) =>
  noIndex ? { robots: { index: false } } : {};

export const buildPageMetadata = ({
  locale,
  path,
  title,
  description,
  noIndex = false
}: PageMetadataInput): Metadata => {
  const url = pageUrl(locale, path);

  return {
    ...robotsField(noIndex),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...localeUrls(path),
        'x-default': pageUrl(routing.defaultLocale, path)
      }
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale] || locale
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
};
