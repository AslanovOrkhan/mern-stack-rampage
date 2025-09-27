import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/English/translation.json";
import ru from "./locales/Russian/translation.json";
import az from "./locales/Azerbaijan/translation.json";
import tu from "./locales/Turkish/translation.json";
const resources = {
  en: { translation: en },
  ru: { translation: ru },
  az: { translation: az },
  tu: { translation: tu },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;