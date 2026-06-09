const shared = {
  transparent: "transparent",
  overlay: "rgba(0,0,0,0.4)",
  white: "#ffffff",
  black: "#000000",
  star: "#FFD638",
  hyperlink: "#0645AD",
  hyperlinkBg: "#E5ECF7",

  gray900: "#18181B",
  gray800: "#27272A",
  gray700: "#3F3F46",
  gray600: "#52525B",
  gray500: "#71717A",
  gray400: "#A1A1AA",
  gray300: "#D4D4D8",
  gray200: "#E4E4E7",
  gray100: "#F4F4F5",
  gray50: "#FAFAFA",

  success900: "#14532D",
  success800: "#166534",
  success700: "#15803D",
  success600: "#16A34A",
  success500: "#22C55E",
  success400: "#4ADE80",
  success300: "#86EFAC",
  success200: "#BBF7D0",
  success100: "#DCFCE7",
  success50: "#F0FDF4",

  warning900: "#7C2D12",
  warning800: "#9A3412",
  warning700: "#C2410C",
  warning600: "#EA580C",
  warning500: "#F97316",
  warning400: "#FB923C",
  warning300: "#FDBA74",
  warning200: "#FED7AA",
  warning100: "#FFEDD5",
  warning50: "#FFF7ED",

  red900: "#7F1D1D",
  red800: "#991B1B",
  red700: "#B91C1C",
  red600: "#DC2626",
  red500: "#EF4444",
  red400: "#F87171",
  red300: "#FCA5A5",
  red200: "#FECACA",
  red100: "#FEE2E2",
  red50: "#FEF2F2",
} as const;

const primaryScaleLight = {
  primary900: "#92005D",
  primary800: "#B70066",
  primary700: "#CD006A",
  primary600: "#E40070",
  primary500: "#F60073",
  primary400: "#F53B8A",
  primary300: "#F761A1",
  primary200: "#F890BC",
  primary100: "#FABCD7",
  primary50: "#FDE4EF",
} as const;

/** Lighter scale tuned for dark backgrounds (better contrast). */
const primaryScaleDark = {
  primary900: "#FDE4EF",
  primary800: "#FABCD7",
  primary700: "#F890BC",
  primary600: "#F761A1",
  primary500: "#F53B8A",
  primary400: "#F60073",
  primary300: "#E40070",
  primary200: "#CD006A",
  primary100: "#4A1433",
  primary50: "#2A0A1C",
} as const;

export const palettes = {
  light: {
    ...shared,
    ...primaryScaleLight,
    bg: "#F2F3F7",
    primary: {
      default: "#CD006A",
      hover: "#F761A1",
      pressed: "#92005D",
      disabled: "#FABCD7",
      bg: "#FDE4EF",
    },
    secondary: {
      default: "#CD006A",
      hover: "#F761A1",
      pressed: "#92005D",
      disabled: "#CBCBCB",
      bg: "#FDE4EF",
    },
    background: {
      surface: "#FFFFFF",
      main: "#F2F3F7",
      primary: "#E3E4ED",
      secondary: "#E1FAF0",
      static: "#D4D4D8",
      action: {
        default: "#FFFFFF",
      },
    },
    text: {
      primary: "#18181B",
      secondary: "#71717A",
      disabled: "#A1A1AA",
      button: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
      },
    },
    icon: {
      primary: "#CD006A",
      secondary: "#CD006A",
      default: "#71717A",
      disabled: "#A1A1AA",
      default_active: "#18181B",
    },
    input: {
      border: "#A1A1AA",
      borderFocused: "#000000",
      placeholder: "rgba(0,0,0,0.4)",
    },
  },
  dark: {
    ...shared,
    ...primaryScaleDark,
    bg: "#09090B",
    primary: {
      default: "#F53B8A",
      hover: "#F761A1",
      pressed: "#F60073",
      disabled: "#3F3F46",
      bg: "#2A0A1C",
    },
    secondary: {
      default: "#F53B8A",
      hover: "#F761A1",
      pressed: "#F60073",
      disabled: "#3F3F46",
      bg: "#27272A",
    },
    background: {
      surface: "#18181B",
      main: "#09090B",
      primary: "#27272A",
      secondary: "#14532D",
      static: "#3F3F46",
      action: {
        default: "#27272A",
      },
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1AA",
      disabled: "#71717A",
      button: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
      },
    },
    icon: {
      primary: "#F53B8A",
      secondary: "#F53B8A",
      default: "#A1A1AA",
      disabled: "#71717A",
      default_active: "#FAFAFA",
    },
    input: {
      border: "#52525B",
      borderFocused: "#E4E4E7",
      placeholder: "rgba(255,255,255,0.5)",
    },
  },
} as const;

export type Palette = (typeof palettes)[keyof typeof palettes];
export type ThemeName = keyof typeof palettes;

export let palette: Palette = palettes.light;

export function getPalette() {
  return palette;
}

export function setPalette(p: Partial<typeof palettes.light>) {
  palette = {
    ...palette,
    ...p,
  } as Palette;
}

export function applyPaletteTheme(theme: ThemeName) {
  palette = palettes[theme] as Palette;
}

export function resolveThemeName(
  colorScheme: "light" | "dark" | undefined,
): ThemeName {
  return colorScheme === "dark" ? "dark" : "light";
}

const PRIMARY_SCALE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

function addBrandColorVars(
  p: Palette,
  prefix: "primary" | "secondary",
  vars: Record<string, string>,
) {
  const brand = p[prefix];
  vars[`--color-${prefix}-default`] = brand.default;
  vars[`--color-${prefix}-hover`] = brand.hover;
  vars[`--color-${prefix}-pressed`] = brand.pressed;
  vars[`--color-${prefix}-disabled`] = brand.disabled;
  vars[`--color-${prefix}-bg`] = brand.bg;
}

export function paletteToCssVars(p: Palette) {
  const vars: Record<string, string> = {
    "--color-bg": p.bg,
    "--color-background-surface": p.background.surface,
    "--color-background-main": p.background.main,
    "--color-background-primary": p.background.primary,
    "--color-background-secondary": p.background.secondary,
    "--color-background-static": p.background.static,
    "--color-background-action-default": p.background.action.default,
    "--color-text-primary": p.text.primary,
    "--color-text-secondary": p.text.secondary,
    "--color-text-disabled": p.text.disabled,
    "--color-text-button-primary": p.text.button.primary,
    "--color-text-button-secondary": p.text.button.secondary,
    "--color-icon-primary": p.icon.primary,
    "--color-icon-secondary": p.icon.secondary,
    "--color-icon-default": p.icon.default,
    "--color-icon-disabled": p.icon.disabled,
    "--color-icon-default-active": p.icon.default_active,
    "--color-input-border": p.input.border,
    "--color-input-border-focused": p.input.borderFocused,
    "--color-input-placeholder": p.input.placeholder,
  };

  for (const step of PRIMARY_SCALE_STEPS) {
    const key = `primary${step}` as keyof Palette;
    vars[`--color-primary-${step}`] = p[key] as string;
  }

  addBrandColorVars(p, "primary", vars);
  addBrandColorVars(p, "secondary", vars);

  return vars;
}
