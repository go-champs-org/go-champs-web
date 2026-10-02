import { legacyLocaleRedirect } from './legacyLocaleRedirect';

describe('legacyLocaleRedirect', () => {
  it.each([
    ['/en/about', '', 'en', '/about'],
    ['/pt/acme/liga-2026', '', 'pt', '/acme/liga-2026'],
    ['/en', '', 'en', '/'],
    ['/pt', '', 'pt', '/'],
    ['/en/', '', 'en', '/'],
    ['/en/cbb', '?tab=jogos', 'en', '/cbb?tab=jogos']
  ])('sends %s%s to the clean URL', (pathname, search, locale, location) => {
    expect(legacyLocaleRedirect(pathname, search)).toEqual({
      locale,
      location
    });
  });

  it.each([['/'], ['/about'], ['/acme/liga-2026'], ['/ptbr'], ['/entretenimento'], ['/ptbr/liga']])(
    'leaves %s alone',
    pathname => {
      expect(legacyLocaleRedirect(pathname, '')).toBeNull();
    }
  );
});
