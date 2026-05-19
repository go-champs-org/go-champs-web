const V2_PATHS = new Set([
  '/',
  '/About',
  '/Faq',
  '/SignIn',
  '/SignUp',
  '/AccountRecovery',
  '/AccountReset',
  '/Contact',
  '/PrivacyPolicyBR',
  '/TermsBR'
]);

// First path segments reserved for non-organization routes
const RESERVED_SEGMENTS = new Set([
  'Organization',
  'Account',
  'FacebookSignUp',
  'Invite',
  'PrivacyPolicyBR',
  'PrivacyPolicy',
  'TermsBR',
  'UseAsApp',
  'SignIn',
  'SignUp',
  'AccountRecovery',
  'AccountReset',
  'Contact',
  'About',
  'Faq',
  'Search'
]);

export function isLocationV2(pathname: string): boolean {
  if (V2_PATHS.has(pathname)) return true;

  // Single-segment paths not reserved for other routes are organization views (/:organizationSlug)
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1 && !RESERVED_SEGMENTS.has(segments[0])) {
    return true;
  }

  return false;
}
