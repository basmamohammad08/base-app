import { languageCache } from "@/cache";
import * as React from "react";
import { DevSettings } from "react-native";
import { I18nextProvider } from "react-i18next";

import i18n, { type SupportedLocale } from "./config";
import { applyDirection } from "./rtl";

type LocaleContextValue = {
  locale: SupportedLocale;
  isRTL: boolean;
  setLocale: (locale: SupportedLocale) => void;
  toggleLocale: () => void;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function reloadApp() {
  if (__DEV__ && typeof DevSettings.reload === "function") {
    DevSettings.reload();
  }
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: Props) {
  const [locale, setLocaleState] = React.useState<SupportedLocale>(
    i18n.language as SupportedLocale,
  );

  const setLocale = React.useCallback(async (nextLocale: SupportedLocale) => {
    await i18n.changeLanguage(nextLocale);
    languageCache.set(nextLocale);
    const directionChanged = applyDirection(nextLocale);
    setLocaleState(nextLocale);

    if (directionChanged) {
      reloadApp();
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    void setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  const value = React.useMemo(
    () => ({
      locale,
      isRTL: locale === "ar",
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </I18nextProvider>
  );
}
