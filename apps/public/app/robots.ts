import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Proxy routes for the client islands: nothing to index.
      disallow: '/api/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
