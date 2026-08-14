import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
    <main className="bg-background py-12 px-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12">
        <Image
          src="/illustrations/smartphone.svg"
          alt=""
          width={518}
          height={732}
          priority
          className="hidden w-full max-w-[440px] lg:block"
        />
        <div className="w-full max-w-[543px] rounded-xl border border-border px-4 py-6 shadow-[0_4px_20px_var(--shadow-elevated)] sm:px-6 sm:py-8 md:p-10 lg:p-12">
          <h1 className="mb-3 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:mb-4 md:text-left md:text-[1.75rem] lg:text-[2rem]">
            {t('contactUs')}
          </h1>
          <p className="mb-6 text-center text-[0.9375rem] leading-normal text-muted md:mb-7 md:text-left">
            {t('contactSubtitle')}
          </p>
          <EmailForm />
        </div>
      </div>
    </main>
  );
}
