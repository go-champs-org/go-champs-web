import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Card } from '@gochamps/ui';
import { EmailForm } from './EmailForm';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <main className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold">{t('contactUs')}</h1>
          <p className="mt-2 text-neutral-500">{t('contactSubtitle')}</p>
          <EmailForm />
        </Card>
      </div>
    </main>
  );
}
