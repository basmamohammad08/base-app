import { I18nManager } from "react-native";

import type { SupportedLocale } from "./config";

export function isRTLLocale(locale: string): boolean {
  return locale === "ar";
}

export function applyDirection(locale: SupportedLocale): boolean {
  const shouldUseRTL = isRTLLocale(locale);

  if (I18nManager.isRTL === shouldUseRTL) {
    return false;
  }

  I18nManager.allowRTL(shouldUseRTL);
  I18nManager.forceRTL(shouldUseRTL);
  return true;
}
