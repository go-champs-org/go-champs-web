import { resolvePublicPath } from './routes';

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
      ['/acme/liga-2026/Player/player-1', '/pt/acme/liga-2026/jogadores/player-1'],
      ['/acme/liga-2026/PlayerStats', '/pt/acme/liga-2026/estatisticas'],
      [
        '/acme/liga-2026/PlayerStatsSummary',
        '/pt/acme/liga-2026/estatisticas/resumo'
      ],
      ['/acme/liga-2026/Teams/team-1', '/pt/acme/liga-2026/times/team-1'],
      ['/acme/liga-2026/Phase/phase-1', '/pt/acme/liga-2026/fases/phase-1']
    ])('rewrites %s to %s', (cmsPath, publicPath) => {
      expect(resolvePublicPath(cmsPath)).toBe(publicPath);
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
      ['/acme'],
      ['/acme/liga-2026'],
      // authenticated / account routes
      ['/SignIn'],
      ['/Account'],
      ['/Organization/acme'],
      ['/Search'],
      // PrivacyPolicy (no BR) is a different, still-active CMS page
      ['/PrivacyPolicy'],
      ['/PrivacyPolicyEN']
    ])('leaves %s on the CMS', cmsPath => {
      expect(resolvePublicPath(cmsPath)).toBeNull();
    });

    it('is case sensitive, matching the CMS route definitions', () => {
      expect(resolvePublicPath('/about')).toBeNull();
      expect(resolvePublicPath('/faq')).toBeNull();
    });

    it('does not let a slug segment swallow a path separator', () => {
      expect(resolvePublicPath('/a/b/c/GameView/game-1')).toBeNull();
      expect(resolvePublicPath('/acme/liga-2026/Teams/team-1/extra')).toBeNull();
    });
  });
});
