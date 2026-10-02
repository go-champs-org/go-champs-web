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
      // NEXT_LOCALE is the language shared with apps/public, so it wins over
      // this app's own localStorage.
      order: ['cookie', 'localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'NEXT_LOCALE',
      cookieMinutes: 365 * 24 * 60, // 1y, matching next-intl's default
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
