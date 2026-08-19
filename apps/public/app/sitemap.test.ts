import sitemap from './sitemap';
import { SITE_URL } from '../src/seo/metadata';

describe('sitemap', () => {
  it('lists both locales of every public route', () => {
    const urls = sitemap().map(entry => entry.url);

    expect(urls).toContain(`${SITE_URL}/pt`);
    expect(urls).toContain(`${SITE_URL}/en`);
    expect(urls).toContain(`${SITE_URL}/pt/about`);
    expect(urls).toContain(`${SITE_URL}/en/terms`);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('never exposes API routes', () => {
    expect(sitemap().some(entry => entry.url.includes('/api'))).toBe(false);
  });

  it('cross-links the locales of each entry', () => {
    const home = sitemap().find(entry => entry.url === `${SITE_URL}/pt`);

    expect(home?.alternates?.languages).toEqual({
      pt: `${SITE_URL}/pt`,
      en: `${SITE_URL}/en`
    });
  });
});
