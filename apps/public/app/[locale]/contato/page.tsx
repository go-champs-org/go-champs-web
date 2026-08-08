import { useTranslations } from 'next-intl';
import { Card } from '@gochamps/ui';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold">{t('contactUs')}</h1>
          <p className="mt-2 text-neutral-500">{t('contactSubtitle')}</p>
        </Card>
      </div>
    </main>
  );
}
