import { buildFaroConfig } from './faroConfig';

describe('buildFaroConfig', () => {
  it('returns config in prod with collector url', () => {
    expect(
      buildFaroConfig({
        env: 'prod',
        url: 'https://faro.example.com/collect',
        version: '42'
      })
    ).toEqual({
      url: 'https://faro.example.com/collect',
      app: { name: 'go-champs-cms', version: '42', environment: 'prod' }
    });
  });

  it('returns undefined outside prod', () => {
    expect(
      buildFaroConfig({ env: 'pre-prod', url: 'https://faro.example.com' })
    ).toBeUndefined();
  });

  it('returns undefined without collector url', () => {
    expect(buildFaroConfig({ env: 'prod' })).toBeUndefined();
  });
});
