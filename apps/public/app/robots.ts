import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The route handlers only proxy the API for the client islands; there is
      // nothing there for a crawler to index.
      disallow: '/api/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
