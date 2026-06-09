import { palette } from "@/theme";

export let config = {
  primary: {
    backgroundColor: palette.primary.default,
    disabledBackgroundColor: palette.gray200,
    selectedBackgroundColor: palette.primary.pressed,
    color: palette.text.button.primary,
    selectedColor: palette.text.button.primary,
  },
  secondary: {
    backgroundColor: palette.primary.bg,
    disabledBackgroundColor: palette.gray200,
    selectedBackgroundColor: palette.primary.pressed,
    color: palette.primary.default,
    selectedColor: palette.text.button.primary,
  },
  tertiary: {
    backgroundColor: palette.transparent,
    disabledBackgroundColor: palette.transparent,
    selectedBackgroundColor: palette.transparent,
    color: palette.primary.default,
    selectedColor: palette.primary.pressed,
  },
};

export function getBtnConfig() {
  return config;
}

export function setBtnConfig(p: Partial<typeof config>) {
  config = {
    ...config,
    ...p,
  };
}

export function syncButtonConfigFromPalette() {
  config = {
    primary: {
      backgroundColor: palette.primary.default,
      disabledBackgroundColor: palette.gray200,
      selectedBackgroundColor: palette.primary.pressed,
      color: palette.text.button.primary,
      selectedColor: palette.text.button.primary,
    },
    secondary: {
      backgroundColor: palette.primary.bg,
      disabledBackgroundColor: palette.gray200,
      selectedBackgroundColor: palette.primary.pressed,
      color: palette.primary.default,
      selectedColor: palette.text.button.primary,
    },
    tertiary: {
      backgroundColor: palette.transparent,
      disabledBackgroundColor: palette.transparent,
      selectedBackgroundColor: palette.transparent,
      color: palette.primary.default,
      selectedColor: palette.primary.pressed,
    },
  };
}
