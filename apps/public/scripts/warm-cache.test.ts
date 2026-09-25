// The script is plain CommonJS so the Actions runner needs no build step;
// require() is how a TS test reaches it without a declaration file.
const { warmCacheUrls, WARM_LIMIT } = require('./warm-cache.cjs');

const view = (org: string, tournament: string) => ({
  tournament: { slug: tournament, organization: { slug: org } }
});

describe('warmCacheUrls', () => {
  it('warms the home pages first, then each org and tournament root once', () => {
    expect(
      warmCacheUrls('https://pre-prod.go-champs.com', [
        view('fberj', 'adulto'),
        view('fberj', 'sub17'),
        view('cbb', 'sub17final')
      ], 10)
    ).toEqual([
      'https://pre-prod.go-champs.com/',
      'https://pre-prod.go-champs.com/en',
      'https://pre-prod.go-champs.com/fberj',
      'https://pre-prod.go-champs.com/fberj/adulto',
      'https://pre-prod.go-champs.com/fberj/sub17',
      'https://pre-prod.go-champs.com/cbb',
      'https://pre-prod.go-champs.com/cbb/sub17final'
    ]);
  });

  it('still warms the home pages when the API returned nothing', () => {
    expect(warmCacheUrls('https://x.test', [], 10)).toEqual([
      'https://x.test/',
      'https://x.test/en'
    ]);
  });

  it('caps the list', () => {
    const views = Array.from({ length: 100 }, (_, index) => view(`org${index}`, 't'));
    expect(warmCacheUrls('https://x.test', views, WARM_LIMIT)).toHaveLength(WARM_LIMIT);
  });
});
