import type { MetadataRoute } from 'next';
import { routing } from '../src/i18n/routing';
import {
  localeUrls,
  pageUrl,
  type PublicRoute,
  PUBLIC_ROUTES
} from '../src/seo/metadata';

type CrawlHint = Pick<
  MetadataRoute.Sitemap[number],
  'changeFrequency' | 'priority'
>;

// The home page is the entry point and changes with every tournament; the
// institutional pages barely move.
const CRAWL_HINTS: Partial<Record<PublicRoute, CrawlHint>> = {
  '': { changeFrequency: 'daily', priority: 1 }
};

const INSTITUTIONAL_HINT: CrawlHint = {
  changeFrequency: 'monthly',
  priority: 0.6
};

const sitemapEntry = (
  locale: string,
  path: PublicRoute
): MetadataRoute.Sitemap[number] => ({
  url: pageUrl(locale, path),
  ...(CRAWL_HINTS[path] || INSTITUTIONAL_HINT),
  alternates: { languages: localeUrls(path) }
});

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap(path =>
    routing.locales.map(locale => sitemapEntry(locale, path))
  );
}
