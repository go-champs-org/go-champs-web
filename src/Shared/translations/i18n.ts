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
    lng: 'pt',
    supportedLngs: ['en', 'pt'],
    keySeparator: false, // we do not use keys in form messages.welcome
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
