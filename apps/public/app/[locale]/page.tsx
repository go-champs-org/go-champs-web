import { useTranslations } from 'next-intl';

export default function RootPage() {
  const t = useTranslations('common');
  return <main data-testid="root-page">{t('siteName')}</main>;
}
