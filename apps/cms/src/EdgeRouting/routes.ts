/**
 * Path allowlist for edge routing: CMS path -> apps/public path.
 *
 * Only paths that already exist as real pages in apps/public belong here
 * (verified 2026-08-28 against apps/public/app/[locale]/**). Anything absent
 * falls through to the CMS SPA, so a missing entry degrades to today's
 * behavior rather than a 404.
 *
 * Kept free of Workers types so the CMS test runner can exercise it directly;
 * the Worker entry point (apps/cms/worker/index.ts) is the only consumer.
 * See docs/superpowers/specs/2026-07-30-apps-public-institucional-design.md §3.3.
 */

type Rewrite = [RegExp, (match: RegExpMatchArray) => string];

const SLUG = '([^/]+)';

const ROUTES: Rewrite[] = [
  [/^\/$/, () => '/pt'],

  // lote 2 — institucional. Case sensitive, mirroring the CMS's
  // `<Route sensitive>` definitions in src/App.tsx.
  [/^\/About$/, () => '/pt/about'],
  [/^\/Faq$/, () => '/pt/faq'],
  [/^\/Contact$/, () => '/pt/contact'],
  [/^\/PrivacyPolicyBR$/, () => '/pt/privacy'],
  [/^\/TermsBR$/, () => '/pt/terms'],

  // lote 1 — rotas de leitura por torneio
  [
    new RegExp(`^/${SLUG}/${SLUG}/GameView/${SLUG}$`),
    m => `/pt/${m[1]}/${m[2]}/jogos/${m[3]}`
  ],
  [
    new RegExp(`^/${SLUG}/${SLUG}/Player/${SLUG}$`),
    m => `/pt/${m[1]}/${m[2]}/jogadores/${m[3]}`
  ],
  [
    new RegExp(`^/${SLUG}/${SLUG}/PlayerStatsSummary$`),
    m => `/pt/${m[1]}/${m[2]}/estatisticas/resumo`
  ],
  [
    new RegExp(`^/${SLUG}/${SLUG}/PlayerStats$`),
    m => `/pt/${m[1]}/${m[2]}/estatisticas`
  ],
  [
    new RegExp(`^/${SLUG}/${SLUG}/Teams/${SLUG}$`),
    m => `/pt/${m[1]}/${m[2]}/times/${m[3]}`
  ],
  [
    new RegExp(`^/${SLUG}/${SLUG}/Phase/${SLUG}$`),
    m => `/pt/${m[1]}/${m[2]}/fases/${m[3]}`
  ]
];

export const resolvePublicPath = (pathname: string): string | null => {
  for (const [pattern, toPath] of ROUTES) {
    const match = pathname.match(pattern);
    if (match) {
      return toPath(match);
    }
  }

  return null;
};
