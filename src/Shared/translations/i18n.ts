import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      signIn: 'Sign in'
    }
  },
  pt: {
    translation: {
      signIn: 'Entrar'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // passes down language detector
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
