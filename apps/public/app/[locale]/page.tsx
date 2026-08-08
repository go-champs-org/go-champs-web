import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  return <main data-testid="root-page">{t('siteName')}</main>;
}
