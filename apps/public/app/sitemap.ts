import type { MetadataRoute } from 'next';
import {
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

const sitemapEntry = (path: PublicRoute): MetadataRoute.Sitemap[number] => ({
  url: pageUrl(path),
  ...(CRAWL_HINTS[path] || INSTITUTIONAL_HINT)
});

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(path => sitemapEntry(path));
}
