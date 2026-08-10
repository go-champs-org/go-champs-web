import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FaqItem } from './FaqItem';

const FAQ_KEYS = ['faqQ1', 'faqQ2', 'faqQ3', 'faqQ4', 'faqQ5'] as const;

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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12">
        <Image
          src="/illustrations/girl-on-smartphone.svg"
          alt=""
          width={440}
          height={440}
          className="hidden w-full max-w-[440px] lg:block"
        />
        <div className="w-full max-w-[543px] rounded-xl border border-neutral-400 p-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] dark:shadow-[0px_4px_4px_0px_rgba(255,255,255,0.25)] sm:p-14">
          <h1 className="text-[28px] font-extrabold text-foreground">
            {t('faq')}
          </h1>
          <p className="mt-2 text-base font-medium text-muted dark:text-foreground">
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
