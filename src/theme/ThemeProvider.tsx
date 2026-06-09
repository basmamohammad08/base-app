import { syncButtonConfigFromPalette } from "@/components/button/config";
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
  setColorScheme: (scheme: "light" | "dark" | "system") => void;
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
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const themeName = resolveThemeName(colorScheme);
  const activePalette = palettes[themeName];

  React.useLayoutEffect(() => {
    applyPaletteTheme(themeName);
    syncButtonConfigFromPalette();
  }, [themeName]);

  const themeVars = React.useMemo(
    () => vars(paletteToCssVars(activePalette)),
    [activePalette],
  );

  const value = React.useMemo(
    () => ({ colorScheme, setColorScheme, toggleColorScheme }),
    [colorScheme, setColorScheme, toggleColorScheme],
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
