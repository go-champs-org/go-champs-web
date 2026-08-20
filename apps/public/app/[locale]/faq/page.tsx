import type { Metadata } from 'next';
import { buildPageMetadata } from '../../../src/seo/metadata';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FaqItem } from './FaqItem';

const FAQ_KEYS = ['faqQ1', 'faqQ2', 'faqQ3', 'faqQ4', 'faqQ5'] as const;

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
      path: '/faq',
      title: t('faqTitle'),
      description: t('faqDescription')
    })
  };
}

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  return (
    <main className="bg-background py-12 px-6">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Image
          src="/illustrations/girl-on-smartphone.svg"
          alt=""
          width={440}
          height={622}
          priority
          className="mx-auto hidden h-auto w-full max-w-[440px] lg:block"
        />
        <div className="mx-auto w-full max-w-[543px] rounded-xl border border-border px-4 py-6 shadow-[0_4px_20px_var(--shadow-elevated)] sm:rounded-2xl sm:px-6 sm:py-8 md:p-10 lg:p-12">
          <h1 className="mb-3 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:mb-4 md:text-left md:text-[1.75rem] lg:text-[2rem]">
            {t('faq')}
          </h1>
          <p className="mb-6 text-center text-[0.9375rem] leading-normal text-muted md:mb-7 md:text-left">
            {t('faqSubtitle')}
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {FAQ_KEYS.map(key => (
              <FaqItem
                key={key}
                question={t(`${key}Question`)}
                answer={t(`${key}Answer`)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
