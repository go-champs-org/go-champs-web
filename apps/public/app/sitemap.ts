import type { MetadataRoute } from 'next';
import { routing } from '../src/i18n/routing';
import { localeUrls, pageUrl, PUBLIC_ROUTES } from '../src/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap(path =>
    routing.locales.map(locale => ({
      url: pageUrl(locale, path),
      // The home page is the entry point and changes with every tournament;
      // the institutional pages barely move.
      changeFrequency: path === '' ? ('daily' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.6,
      alternates: { languages: localeUrls(path) }
    }))
  );
}
