import { legacyRedirect } from './legacyRedirect';

describe('legacyRedirect', () => {
  it.each([
    ['/acme/liga/jogos/g1', '', '/acme/liga/game/g1'],
    ['/acme/liga/jogadores/p1', '?x=1', '/acme/liga/athlete/p1?x=1'],
    ['/acme/liga/times/t1', '', '/acme/liga/team/t1'],
    ['/acme/liga/fases/f1', '', '/acme/liga/stage/f1'],
    ['/acme/liga/estatisticas', '', '/acme/liga/stats'],
    ['/acme/liga/estatisticas/resumo', '', '/acme/liga/stats/summary']
  ])('renames the segment of %s%s', (pathname, search, location) => {
    expect(legacyRedirect(pathname, search)).toEqual({ locale: null, location });
  });

  it('drops the locale prefix and renames the segment in one redirect', () => {
    expect(legacyRedirect('/en/acme/liga/jogos/g1', '')).toEqual({
      locale: 'en',
      location: '/acme/liga/game/g1'
    });
  });

  it('still sends a plain legacy locale url to the clean path', () => {
    expect(legacyRedirect('/pt/acme', '?a=1')).toEqual({
      locale: 'pt',
      location: '/acme?a=1'
    });
  });

  it.each([
    ['/acme/liga/game/g1'],
    ['/acme/liga'],
    ['/acme/jogos/g1'],
    ['/acme/liga/estatisticasx'],
    ['/']
  ])('leaves %s alone', pathname => {
    expect(legacyRedirect(pathname, '')).toBeNull();
  });
});
