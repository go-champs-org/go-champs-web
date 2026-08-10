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
          className="hidden w-full max-w-[420px] lg:block"
        />
        <div className="w-full max-w-[543px] rounded-xl border border-neutral-400 p-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] dark:shadow-[0px_4px_4px_0px_rgba(255,255,255,0.25)] sm:p-14">
          <h1 className="text-[28px] font-extrabold text-foreground">
            {t('contactUs')}
          </h1>
          <p className="mt-2 text-base font-medium text-muted dark:text-foreground">
            {t('contactSubtitle')}
          </p>
          <EmailForm />
        </div>
      </div>
    </main>
  );
}
