import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getRecentlyViewedOrganizations,
  getRecentlyViews,
  type OrganizationEntity,
  type RecentlyViewEntity
} from '@gochamps/api-client';
import { CMS_URL } from '../../src/config/cms';
import { buildPageMetadata } from '../../src/seo/metadata';
import { AdBanner } from './AdBanner';
import { OrganizationsSidebar } from './OrganizationsSidebar';
import { SearchIsland } from './SearchIsland';
import { StructuredData } from './StructuredData';

// The recently viewed lists move slowly and are the same for every visitor, so
// the page is rendered once and reused for five minutes. Serving them from the
// HTML — instead of fetching after hydration — is also what makes the
// tournaments crawlable.
export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    ...buildPageMetadata({
      locale,
      path: '',
      title: t('homeTitle'),
      description: t('homeDescription')
    }),
    // The layout appends "| Go Champs" to every page title; the home title
    // already carries the brand.
    title: { absolute: t('homeTitle') }
  };
}

// The home page is worth serving without them if the API is down, so a failure
// degrades to an empty list instead of an error page.
const loadHomeData = async (): Promise<{
  recentlyViews: RecentlyViewEntity[];
  organizations: OrganizationEntity[];
}> => {
  const [recentlyViews, organizations] = await Promise.all([
    getRecentlyViews().catch(() => []),
    getRecentlyViewedOrganizations().catch(() => [])
  ]);

  return { recentlyViews, organizations };
};

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { recentlyViews, organizations } = await loadHomeData();

  // The CMS pairs a fixed NavBar with a 100px offset here; ours is sticky and
  // stays in the flow, so the page only needs the CMS own padding: 1.5rem on
  // phones, 2rem from tablets up.
  return (
    <main
      data-testid="root-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <StructuredData
        locale={locale}
        cmsUrl={CMS_URL}
        recentlyViews={recentlyViews}
      />
      <AdBanner />
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8 md:max-w-[1320px] md:flex-row md:items-start">
        {/* The CMS keeps this sidebar off small screens, where the tournament
            grid already fills the viewport. */}
        <aside className="hidden w-full md:sticky md:top-[calc(var(--navbar-height)+1rem)] md:block md:w-[280px] md:flex-shrink-0">
          <OrganizationsSidebar cmsUrl={CMS_URL} organizations={organizations} />
        </aside>
        <div className="w-full min-w-0 flex-1">
          <SearchIsland cmsUrl={CMS_URL} recentlyViews={recentlyViews} />
        </div>
      </div>
    </main>
  );
}
