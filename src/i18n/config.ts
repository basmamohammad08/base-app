import * as Localization from "expo-localization";
import i18n from "i18next";
import { I18nManager } from "react-native";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const supportedLocales = ["en", "ar"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

function resolveInitialLocale(): SupportedLocale {
  if (I18nManager.isRTL) {
    return "ar";
  }

  const deviceLocale = Localization.getLocales()[0]?.languageCode;
  return supportedLocales.includes(deviceLocale as SupportedLocale)
    ? (deviceLocale as SupportedLocale)
    : "en";
}

void i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLocale(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
