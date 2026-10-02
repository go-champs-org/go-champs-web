import { buildPageMetadata, SITE_URL } from './metadata';

describe('buildPageMetadata', () => {
  it('points the canonical URL at the one locale-free URL', () => {
    const metadata = buildPageMetadata({
      locale: 'en',
      path: '/about',
      title: 'About us',
      description: 'Who we are'
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/about`);
  });

  it('declares no per-language alternates', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      path: '/faq',
      title: 'FAQ',
      description: 'Questions'
    });

    expect(metadata.alternates).toEqual({ canonical: `${SITE_URL}/faq` });
  });

  it('keeps the home page free of a locale prefix and trailing slash', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      path: '',
      title: 'Go Champs',
      description: 'Tournaments'
    });

    expect(metadata.alternates?.canonical).toBe(SITE_URL);
  });

  it('carries the title and description into Open Graph and Twitter', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      path: '',
      title: 'Go Champs',
      description: 'Tournaments'
    });

    expect(metadata.openGraph).toMatchObject({
      title: 'Go Champs',
      description: 'Tournaments',
      url: SITE_URL,
      siteName: 'Go Champs',
      locale: 'pt_BR',
      type: 'website'
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Go Champs',
      description: 'Tournaments'
    });
  });

  it('leaves a normal page indexable', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      path: '/faq',
      title: 'FAQ',
      description: 'Questions'
    });

    expect(metadata.robots).toBeUndefined();
  });

  it('asks robots not to index a page flagged as noIndex', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      path: '/faq',
      title: 'FAQ',
      description: 'Questions',
      noIndex: true
    });

    expect(metadata.robots).toEqual({ index: false });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/faq`);
  });
});
