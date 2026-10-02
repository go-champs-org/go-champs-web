import sitemap from './sitemap';
import { SITE_URL } from '../src/seo/metadata';

describe('sitemap', () => {
  it('lists every public route once, without a locale prefix', () => {
    const urls = sitemap().map(entry => entry.url);

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/about`);
    expect(urls).toContain(`${SITE_URL}/terms`);
    expect(urls.some(url => url.includes('/en'))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('never exposes API routes', () => {
    expect(sitemap().some(entry => entry.url.includes('/api'))).toBe(false);
  });

  it('declares no per-language alternates', () => {
    expect(sitemap().some(entry => entry.alternates)).toBe(false);
  });
});
