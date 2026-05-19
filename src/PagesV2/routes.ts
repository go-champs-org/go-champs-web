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

export function isLocationV2(pathname: string): boolean {
  return V2_PATHS.has(pathname);
}
