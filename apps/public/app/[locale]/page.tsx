import { setRequestLocale } from 'next-intl/server';
import { AdBanner } from './AdBanner';
import { OrganizationsSidebar } from './OrganizationsSidebar';
import { SearchIsland } from './SearchIsland';

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || '';

  // The CMS pairs a fixed NavBar with a 100px offset here; ours is sticky and
  // stays in the flow, so the page only needs the CMS own padding: 1.5rem on
  // phones, 2rem from tablets up.
  return (
    <main
      data-testid="root-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <AdBanner />
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8 md:max-w-[1320px] md:flex-row md:items-start">
        {/* The CMS keeps this sidebar off small screens, where the tournament
            grid already fills the viewport. */}
        <aside className="hidden w-full md:sticky md:top-[calc(var(--navbar-height)+1rem)] md:block md:w-[280px] md:flex-shrink-0">
          <OrganizationsSidebar cmsUrl={cmsUrl} />
        </aside>
        <div className="w-full min-w-0 flex-1">
          <SearchIsland cmsUrl={cmsUrl} />
        </div>
      </div>
    </main>
  );
}
