import {
  isPublicPassthroughPath,
  resolveLocaleFromCookieHeader,
  resolvePublicPath
} from './routes';

describe('isPublicPassthroughPath', () => {
  it.each([
    ['/_next/static/chunks/main.js'],
    ['/_next/image?url=%2Flogo.png'],
    // apps/public/public/*, referenced by absolute root path
    ['/logo/logo-green.png'],
    ['/photos/ruan.png'],
    ['/illustrations/hands-on-trophy.svg'],
    ['/fonts/proximanova_regular.woff'],
    ['/api/search?term=liga'],
    ['/robots.txt'],
    ['/sitemap.xml'],
    // apps/public's own URL space, which its NavBar links to
    ['/pt'],
    ['/en'],
    ['/pt/about'],
    ['/en/faq'],
    ['/pt/canoas/copa-cidadao/jogos/game-1']
  ])('forwards %s to apps/public', pathname => {
    expect(isPublicPassthroughPath(pathname.split('?')[0])).toBe(true);
  });

  it.each([
    // the CMS's own files
    ['/favicon.ico'],
    ['/manifest.json'],
    ['/ios-icon.png'],
    ['/logo-with-name-black.png'],
    ['/static/js/main.8ecab777.chunk.js'],
    // rewritten by resolvePublicPath, not passed through
    ['/About'],
    ['/']
  ])('leaves %s to the CMS', pathname => {
    expect(isPublicPassthroughPath(pathname)).toBe(false);
  });

  it('does not let a prefix match a longer sibling segment', () => {
    expect(isPublicPassthroughPath('/logotipo/x.png')).toBe(false);
    expect(isPublicPassthroughPath('/apixyz')).toBe(false);
  });

  it('matches a locale only as a whole segment', () => {
    // /:organizationSlug shares this position in the CMS's routes
    expect(isPublicPassthroughPath('/ptbr')).toBe(false);
    expect(isPublicPassthroughPath('/entretenimento')).toBe(false);
    expect(isPublicPassthroughPath('/ptbr/liga')).toBe(false);
  });
});

describe('resolveLocaleFromCookieHeader', () => {
  it('reads NEXT_LOCALE from the Cookie header', () => {
    expect(resolveLocaleFromCookieHeader('NEXT_LOCALE=en')).toBe('en');
  });

  it('reads NEXT_LOCALE alongside other cookies, in either position', () => {
    expect(
      resolveLocaleFromCookieHeader('foo=bar; NEXT_LOCALE=en; baz=qux')
    ).toBe('en');
  });

  it('defaults to pt when there is no Cookie header', () => {
    expect(resolveLocaleFromCookieHeader(null)).toBe('pt');
  });

  it('defaults to pt when NEXT_LOCALE is absent', () => {
    expect(resolveLocaleFromCookieHeader('foo=bar')).toBe('pt');
  });

  it('defaults to pt for a value that is not a supported locale', () => {
    // A stale/tampered cookie must not route to a locale apps/public 404s on.
    expect(resolveLocaleFromCookieHeader('NEXT_LOCALE=fr')).toBe('pt');
  });
});

describe('resolvePublicPath', () => {
  describe('routes migrated to apps/public', () => {
    it.each([
      ['/', '/pt'],
      ['/About', '/pt/about'],
      ['/Faq', '/pt/faq'],
      ['/Contact', '/pt/contact'],
      ['/PrivacyPolicyBR', '/pt/privacy'],
      ['/TermsBR', '/pt/terms'],
      ['/acme/liga-2026/GameView/game-1', '/pt/acme/liga-2026/jogos/game-1'],
      [
        '/acme/liga-2026/Player/player-1',
        '/pt/acme/liga-2026/jogadores/player-1'
      ],
      ['/acme/liga-2026/PlayerStats', '/pt/acme/liga-2026/estatisticas'],
      [
        '/acme/liga-2026/PlayerStatsSummary',
        '/pt/acme/liga-2026/estatisticas/resumo'
      ],
      ['/acme/liga-2026/Teams/team-1', '/pt/acme/liga-2026/times/team-1'],
      ['/acme/liga-2026/Phase/phase-1', '/pt/acme/liga-2026/fases/phase-1'],
      ['/acme/liga-2026', '/pt/acme/liga-2026'],
      ['/lair/torneio-basquete', '/pt/lair/torneio-basquete'],
      ['/Organization/acme', '/pt/acme'],
      ['/Organization/acme/', '/pt/acme'],
      // App.tsx's bare /:organizationSlug (OrganizationView), lowest priority
      // of all routes: matches only what nothing else — including the
      // tournament root — already claimed.
      ['/acme', '/pt/acme'],
      ['/acme/', '/pt/acme']
    ])('rewrites %s to %s', (cmsPath, publicPath) => {
      expect(resolvePublicPath(cmsPath)).toBe(publicPath);
    });
  });

  // The tournament root and the bare organization page both have no literal
  // segment of their own, so each matches any path of its length. App.tsx
  // lists these CMS routes ahead of /:org/:tournament and /:organizationSlug;
  // the table has to reproduce that precedence or they silently stop working.
  describe('CMS routes the reserved-segment rules must not swallow', () => {
    it.each([
      ['/Invite/invite-1'],
      ['/Account/settings'],
      ['/PrivacyPolicy/anything'],
      ['/FacebookSignUp/callback']
    ])('leaves two-segment %s on the CMS', cmsPath => {
      expect(resolvePublicPath(cmsPath)).toBeNull();
    });

    it.each([
      ['/UseAsApp'],
      ['/SignIn'],
      ['/SignUp'],
      ['/Account'],
      ['/Search'],
      ['/PrivacyPolicy'],
      ['/FacebookSignUp']
    ])('leaves bare %s on the CMS', cmsPath => {
      expect(resolvePublicPath(cmsPath)).toBeNull();
    });

    it('still routes a tournament whose org slug merely resembles one', () => {
      expect(resolvePublicPath('/organizational/liga')).toBe(
        '/pt/organizational/liga'
      );
      expect(resolvePublicPath('/invites/liga')).toBe('/pt/invites/liga');
    });

    it('still routes a bare org slug that merely resembles a reserved segment', () => {
      expect(resolvePublicPath('/organizational')).toBe('/pt/organizational');
      expect(resolvePublicPath('/invites')).toBe('/pt/invites');
    });
  });

  describe('locale', () => {
    it('defaults to pt when no locale is given', () => {
      expect(resolvePublicPath('/About')).toBe('/pt/about');
    });

    it('rewrites into the given locale instead of the default', () => {
      expect(resolvePublicPath('/About', 'en')).toBe('/en/about');
      expect(resolvePublicPath('/', 'en')).toBe('/en');
      expect(resolvePublicPath('/Organization/acme', 'en')).toBe('/en/acme');
      expect(resolvePublicPath('/acme/liga-2026', 'en')).toBe(
        '/en/acme/liga-2026'
      );
      expect(resolvePublicPath('/acme/liga-2026/GameView/game-1', 'en')).toBe(
        '/en/acme/liga-2026/jogos/game-1'
      );
    });
  });

  describe('routes that stay on the CMS', () => {
    it.each([
      // admin routes sharing the tournament prefix
      ['/acme/liga-2026/Teams'],
      ['/acme/liga-2026/Players'],
      ['/acme/liga-2026/Phases'],
      ['/acme/liga-2026/EditTeamRoster/team-1'],
      ['/acme/liga-2026/NewTeam'],
      // pages not yet built in apps/public
      ['/UseAsApp'],
      // authenticated / account routes
      ['/SignIn'],
      ['/Account'],
      ['/Search'],
      // PrivacyPolicy (no BR) is a different, still-active CMS page
      ['/PrivacyPolicy'],
      ['/PrivacyPolicyEN']
    ])('leaves %s on the CMS', cmsPath => {
      expect(resolvePublicPath(cmsPath)).toBeNull();
    });

    it('is case sensitive, matching the CMS route definitions', () => {
      // Case-mismatched literal routes fall through past the reserved-segment
      // check, same as in App.tsx (its <Route sensitive> only matches the
      // exact case) — landing on the bare org rule instead, same as the CMS's
      // own bare /:organizationSlug would.
      expect(resolvePublicPath('/about')).toBe('/pt/about');
      expect(resolvePublicPath('/faq')).toBe('/pt/faq');
      // A path too long for any rule, case mismatch included, stays on the CMS.
      expect(resolvePublicPath('/acme/liga-2026/gameview/game-1')).toBeNull();
    });

    it('does not let a slug segment swallow a path separator', () => {
      expect(resolvePublicPath('/a/b/c/GameView/game-1')).toBeNull();
      expect(
        resolvePublicPath('/acme/liga-2026/Teams/team-1/extra')
      ).toBeNull();
    });
  });
});
