// Tournament, organization and account routes still live in the CMS app until
// the _redirects rollout moves them here. The URL must stay absolute: a
// relative href would be rewritten by the next-intl middleware into a
// locale-prefixed path (/pt/lair/...), which no CMS route matches.
export const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL || 'https://go-champs.com'
).replace(/\/$/, '');

export const cmsPath = (path: string) => `${CMS_URL}${path}`;
