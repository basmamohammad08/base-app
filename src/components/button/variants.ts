import type { Palette } from "@/theme/palette";

import type { ButtonVariantFactory, ButtonVariantStyle } from "./types";

function createPrimaryVariant(palette: Palette): ButtonVariantStyle {
  return {
    backgroundColor: palette.primary.default,
    disabledBackgroundColor: palette.gray200,
    selectedBackgroundColor: palette.primary.pressed,
    color: palette.text.button.primary,
    selectedColor: palette.text.button.primary,
  };
}

function createSecondaryVariant(palette: Palette): ButtonVariantStyle {
  return {
    backgroundColor: palette.primary.bg,
    disabledBackgroundColor: palette.gray200,
    selectedBackgroundColor: palette.primary.pressed,
    color: palette.primary.default,
    selectedColor: palette.text.button.primary,
  };
}

function createTertiaryVariant(palette: Palette): ButtonVariantStyle {
  return {
    backgroundColor: palette.transparent,
    disabledBackgroundColor: palette.transparent,
    selectedBackgroundColor: palette.transparent,
    color: palette.primary.default,
    selectedColor: palette.primary.pressed,
  };
}

function createDestructiveVariant(palette: Palette): ButtonVariantStyle {
  return {
    backgroundColor: palette.red500,
    disabledBackgroundColor: palette.gray200,
    selectedBackgroundColor: palette.red600,
    color: palette.text.button.primary,
    selectedColor: palette.text.button.primary,
  };
}

export const builtInButtonVariants = {
  primary: createPrimaryVariant,
  secondary: createSecondaryVariant,
  tertiary: createTertiaryVariant,
  destructive: createDestructiveVariant,
} satisfies Record<string, ButtonVariantFactory>;
