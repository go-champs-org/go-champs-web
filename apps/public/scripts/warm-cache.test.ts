// Plain CommonJS so the Actions runner needs no build step; require() skips a .d.ts.
const { warmCacheUrls, warmTargets, WARM_LIMIT } = require('./warm-cache.cjs');

const view = (org: string, tournament: string) => ({
  tournament: { slug: tournament, organization: { slug: org } }
});

describe('warmCacheUrls', () => {
  it('warms the home page first, then each org and tournament root once', () => {
    expect(
      warmCacheUrls('https://pre-prod.go-champs.com', [
        view('fberj', 'adulto'),
        view('fberj', 'sub17'),
        view('cbb', 'sub17final')
      ], 10)
    ).toEqual([
      'https://pre-prod.go-champs.com/',
      'https://pre-prod.go-champs.com/fberj',
      'https://pre-prod.go-champs.com/fberj/adulto',
      'https://pre-prod.go-champs.com/fberj/sub17',
      'https://pre-prod.go-champs.com/cbb',
      'https://pre-prod.go-champs.com/cbb/sub17final'
    ]);
  });

  it('still warms the home page when the API returned nothing', () => {
    expect(warmCacheUrls('https://x.test', [], 10)).toEqual(['https://x.test/']);
  });

  it('caps the list', () => {
    const views = Array.from({ length: 100 }, (_, index) => view(`org${index}`, 't'));
    expect(warmCacheUrls('https://x.test', views, WARM_LIMIT)).toHaveLength(WARM_LIMIT);
  });

  it('skips entries missing a tournament or organization slug', () => {
    expect(
      warmCacheUrls('https://x.test', [
        null,
        { tournament: null },
        { tournament: { slug: 'x', organization: null } },
        { tournament: { slug: '', organization: { slug: 'o' } } },
        view('fberj', 'adulto')
      ], 10)
    ).toEqual([
      'https://x.test/',
      'https://x.test/fberj',
      'https://x.test/fberj/adulto'
    ]);
  });
});

describe('warmTargets', () => {
  it('yields a pt target without a cookie and an en target with the locale cookie per url', () => {
    expect(warmTargets(['https://x.test/', 'https://x.test/fberj'])).toEqual([
      { url: 'https://x.test/', locale: 'pt', headers: {} },
      { url: 'https://x.test/', locale: 'en', headers: { Cookie: 'NEXT_LOCALE=en' } },
      { url: 'https://x.test/fberj', locale: 'pt', headers: {} },
      { url: 'https://x.test/fberj', locale: 'en', headers: { Cookie: 'NEXT_LOCALE=en' } }
    ]);
  });

  it('no longer targets the legacy /en redirect', () => {
    const urls = warmCacheUrls('https://x.test', [], WARM_LIMIT);
    expect(warmTargets(urls).map((target: { url: string }) => target.url)).not.toContain('https://x.test/en');
  });
});
