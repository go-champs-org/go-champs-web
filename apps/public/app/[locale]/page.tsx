import { setRequestLocale } from 'next-intl/server';
import { AdBanner } from './AdBanner';
import { SearchIsland } from './SearchIsland';

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main data-testid="root-page" className="bg-background px-6 py-8 md:py-12">
      <AdBanner />
      <div className="mx-auto w-full max-w-[560px] md:max-w-[1320px]">
        <SearchIsland cmsUrl={process.env.NEXT_PUBLIC_CMS_URL || ''} />
      </div>
    </main>
  );
}
