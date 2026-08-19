import type { Metadata } from 'next';
import { routing } from '../i18n/routing';

// Netlify serves the public site from the same domain as the CMS (see the
// _redirects work in the rollout plan), so the canonical host is the live
// domain, not a per-deploy URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://go-champs.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Go Champs';

/** Every locale-prefixed page the site publishes, home first. */
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

export const pageUrl = (locale: string, path: string) =>
  `${SITE_URL}/${locale}${path}`;

export const localeUrls = (path: string) =>
  Object.fromEntries(
    routing.locales.map(locale => [locale, pageUrl(locale, path)])
  );

interface PageMetadataInput {
  locale: string;
  path: string;
  title: string;
  description: string;
}

export const buildPageMetadata = ({
  locale,
  path,
  title,
  description
}: PageMetadataInput): Metadata => {
  const url = pageUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...localeUrls(path),
        // Portuguese is the default locale of the routing config, so it is what
        // an unmatched language should land on.
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
