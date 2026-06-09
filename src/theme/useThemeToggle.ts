import { useTheme } from "./ThemeProvider";

export function useThemeToggle() {
  const { colorScheme, toggleColorScheme } = useTheme();

  const isDark = colorScheme === "dark";

  return {
    colorScheme,
    isDark,
    toggleTheme: toggleColorScheme,
  };
}
