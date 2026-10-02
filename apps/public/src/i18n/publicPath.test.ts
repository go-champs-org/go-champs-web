import { publicPath } from './publicPath';

describe('publicPath', () => {
  it('returns the path as is', () => {
    expect(publicPath('/about')).toBe('/about');
    expect(publicPath('/acme/liga/jogadores/')).toBe('/acme/liga/jogadores/');
  });

  it('turns the empty path into the site root', () => {
    expect(publicPath('')).toBe('/');
  });
});
