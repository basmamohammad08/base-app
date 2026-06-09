import { useLocale } from "./I18nProvider";

export function useLocaleToggle() {
  const { locale, isRTL, setLocale, toggleLocale } = useLocale();

  return {
    locale,
    isRTL,
    setLocale,
    toggleLocale,
    isArabic: locale === "ar",
  };
}
