import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing translation files
import translationEN from './locales/en/en/translation-en.json';
import translationFR from './locales/en/fr/translation-fr.json';
import translationHI from './locales/en/hi/translation-hi.json';
import translationTE from './locales/en/te/translation-te.json';

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
  te: {
    translation: translationTE,
  },
};

//i18N Initialization

i18n.use(initReactI18next).init({
  resources,
  lng: `en`, //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
