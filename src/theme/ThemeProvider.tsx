import { resolveButtonVariants } from "@/components/button";
import { themeCache, type ThemePreference } from "@/cache";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, vars } from "nativewind";
import * as React from "react";
import { View } from "react-native";

import {
  applyPaletteTheme,
  paletteToCssVars,
  palettes,
  resolveThemeName,
} from "./palette";

type ThemeContextValue = {
  colorScheme: "light" | "dark" | undefined;
  setColorScheme: (scheme: ThemePreference) => void;
  toggleColorScheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const themeName = resolveThemeName(colorScheme);
  const activePalette = palettes[themeName];

  React.useLayoutEffect(() => {
    const cachedTheme = themeCache.get();
    if (cachedTheme) {
      setColorScheme(cachedTheme);
    }
  }, [setColorScheme]);

  const setColorSchemeWithCache = React.useCallback(
    (scheme: ThemePreference) => {
      themeCache.set(scheme);
      setColorScheme(scheme);
    },
    [setColorScheme],
  );

  const toggleColorSchemeWithCache = React.useCallback(() => {
    const nextScheme: ThemePreference = colorScheme === "dark" ? "light" : "dark";
    themeCache.set(nextScheme);
    setColorScheme(nextScheme);
  }, [colorScheme, setColorScheme]);

  React.useLayoutEffect(() => {
    applyPaletteTheme(themeName);
    resolveButtonVariants(activePalette);
  }, [themeName]);

  const themeVars = React.useMemo(
    () => vars(paletteToCssVars(activePalette)),
    [activePalette],
  );

  const value = React.useMemo(
    () => ({
      colorScheme,
      setColorScheme: setColorSchemeWithCache,
      toggleColorScheme: toggleColorSchemeWithCache,
    }),
    [colorScheme, setColorSchemeWithCache, toggleColorSchemeWithCache],
  );

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1 bg-bg" style={themeVars}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
