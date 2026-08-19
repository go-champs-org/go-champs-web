import robots from './robots';
import { SITE_URL } from '../src/seo/metadata';

describe('robots', () => {
  it('lets crawlers in but keeps them out of the API routes', () => {
    const rules = robots().rules;

    expect(rules).toMatchObject({ userAgent: '*', allow: '/', disallow: '/api/' });
  });

  it('points at the sitemap', () => {
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
