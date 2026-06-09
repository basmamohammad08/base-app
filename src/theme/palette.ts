export let palette = {
  transparent: "transparent",
  overlay: "rgba(0,0,0,0.4)",
  white: "#ffffff",
  black: "#000000",
  bg: "#F2F3F7",
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

  primary: {
    default: "#CD006A",
    hover: "#F761A1",
    pressed: "#92005D",
    disabled: "#FABCD7",
    bg: "#FDE4EF",
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

  secondary: {
    default: "#CD006A",
    hover: "#F761A1",
    pressed: "#92005D",
    disabled: "#CBCBCB",
    bg: "#FDE4EF",
  },
};

export function getPalette() {
  return palette;
}

export function setPalette(p: Partial<typeof palette>) {
  palette = {
    ...palette,
    ...p,
  };
}
