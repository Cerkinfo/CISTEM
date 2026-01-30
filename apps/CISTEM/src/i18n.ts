import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "@pkg/languages/fr";

const resources = {
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  ns: ["translation"],
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
