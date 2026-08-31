'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '../i18n/navigation';
import { routing } from '../i18n/routing';

const LOCALE_FLAGS: Record<string, string> = {
  pt: '🇧🇷',
  en: '🇺🇸'
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="language"
        className="flex size-8 items-center justify-center rounded-full text-lg text-white hover:opacity-80"
      >
        {LOCALE_FLAGS[locale] ?? locale}
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 flex flex-col gap-1 rounded-lg bg-surface p-2 shadow-[0_4px_20px_var(--shadow-elevated)]">
          {routing.locales.map(candidate => (
            <li key={candidate}>
              <Link
                href={pathname}
                locale={candidate}
                aria-current={candidate === locale}
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-lg hover:opacity-80 aria-[current=true]:opacity-50"
              >
                {LOCALE_FLAGS[candidate] ?? candidate}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
