import { SITE_URL } from '../../src/seo/metadata';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async () => (key: string) => `translated:${key}`
}));

const PAGES: Array<{ path: string; load: () => Promise<unknown> }> = [
  { path: '', load: () => import('./(home)/page') },
  { path: '/about', load: () => import('./about/page') },
  { path: '/faq', load: () => import('./faq/page') },
  { path: '/contact', load: () => import('./contact/page') },
  { path: '/privacy', load: () => import('./privacy/page') },
  { path: '/terms', load: () => import('./terms/page') }
];

describe('page metadata', () => {
  it.each(PAGES)(
    'gives $path a canonical URL, hreflang pair and a description',
    async ({ path, load }) => {
      const pageModule = (await load()) as {
        generateMetadata: (args: {
          params: Promise<{ locale: string }>;
        }) => Promise<Record<string, never>>;
      };

      const metadata = (await pageModule.generateMetadata({
        params: Promise.resolve({ locale: 'pt' })
      })) as {
        description?: string;
        alternates?: {
          canonical?: string;
          languages?: Record<string, string>;
        };
      };

      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/pt${path}`);
      expect(metadata.alternates?.languages?.en).toBe(`${SITE_URL}/en${path}`);
      expect(metadata.description).toBeTruthy();
    }
  );
});
