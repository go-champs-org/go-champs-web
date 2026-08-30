import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';
import pt from './pt';

const formatDate = (value: string, lng: string) => {
  switch (lng) {
    case 'pt':
      return `${value.substr(8, 2)}/${value.substr(5, 2)}/${value.substr(
        0,
        4
      )}`;
    case 'en':
    default:
      return `${value.substr(5, 2)}/${value.substr(8, 2)}/${value.substr(
        0,
        4
      )}`;
  }
};

const formatDateTime = (value: string, lng: string) => {
  switch (lng) {
    case 'pt':
      return `${value.substr(8, 2)}/${value.substr(5, 2)}/${value.substr(
        0,
        4
      )} ${value.substr(11, 8)}`;
    case 'en':
    default:
      return `${value.substr(5, 2)}/${value.substr(8, 2)}/${value.substr(
        0,
        4
      )} ${value.substr(11, 8)}`;
  }
};

const resources = {
  en,
  pt
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // passes down language detector
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['en', 'pt'],
    detection: {
      // 'cookie' reads/writes NEXT_LOCALE, the same cookie next-intl's
      // middleware sets on apps/public — the shared signal that syncs the
      // language across both apps (apps/cms/src/EdgeRouting/routes.ts,
      // resolveLocaleFromCookieHeader). It sits after localStorage so a
      // deliberate past choice here isn't clobbered by an incidental cookie
      // from a plain visit to apps/public that never changed the language.
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'NEXT_LOCALE',
      // 1 year, matching next-intl's own default cookie lifetime.
      cookieMinutes: 365 * 24 * 60,
      caches: ['localStorage', 'cookie']
    },
    keySeparator: '.', // supports nested keys e.g. aiChat.title
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: (value, format, lng) => {
        switch (format) {
          case 'uppercase':
            return value.toUpperCase();
          case 'date':
            return formatDate(value, lng!);
          case 'datetime':
            return formatDateTime(value, lng!);
          default:
            return value;
        }
      }
    }
  });

export default i18n;
