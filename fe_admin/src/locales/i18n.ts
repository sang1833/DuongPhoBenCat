import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import vi from "./vi.json";

export const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
} as const;

i18n.use(initReactI18next).init({
  lng: "vi",
  fallbackLng: "vi",
  resources,
  interpolation: {
    escapeValue: false // React already safes from XSS
  }
});

export default i18n;
