import { localePath } from './localePath';

describe('localePath', () => {
  it('leaves the default locale out of the path', () => {
    expect(localePath('pt', '/about')).toBe('/about');
    expect(localePath('pt', '/acme/liga/jogadores/')).toBe('/acme/liga/jogadores/');
  });

  it('turns the default-locale home into the site root', () => {
    expect(localePath('pt', '')).toBe('/');
  });

  it('prefixes any other locale', () => {
    expect(localePath('en', '/about')).toBe('/en/about');
    expect(localePath('en', '')).toBe('/en');
  });
});
