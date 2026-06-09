import { palette, type Palette } from "@/theme/palette";

import type {
  ButtonState,
  ButtonStyleResolver,
  ButtonVariantFactory,
  ButtonVariantStyle,
} from "./types";
import { builtInButtonVariants } from "./variants";

const variantFactories = new Map<string, ButtonVariantFactory>(
  Object.entries(builtInButtonVariants),
);

const variantOverrides = new Map<string, Partial<ButtonVariantStyle>>();

let resolvedVariants: Record<string, ButtonVariantStyle> = {};

export const defaultButtonStyleResolver: ButtonStyleResolver = (
  style,
  { pressed, disabled },
) => {
  if (disabled) {
    return {
      backgroundColor: style.disabledBackgroundColor,
      color: style.disabledColor ?? palette.gray500,
    };
  }

  return {
    backgroundColor: style.backgroundColor,
    color: pressed ? style.selectedColor : style.color,
  };
};

function applyOverrides(
  name: string,
  style: ButtonVariantStyle,
): ButtonVariantStyle {
  const override = variantOverrides.get(name);
  return override ? { ...style, ...override } : style;
}

function resolveVariants(activePalette: Palette) {
  resolvedVariants = Object.fromEntries(
    [...variantFactories.entries()].map(([name, factory]) => [
      name,
      applyOverrides(name, factory(activePalette)),
    ]),
  );
}

resolveVariants(palette);

export function registerButtonVariant(
  name: string,
  factory: ButtonVariantFactory,
) {
  variantFactories.set(name, factory);
  resolveVariants(palette);
}

export function overrideButtonVariant(
  name: string,
  override: Partial<ButtonVariantStyle>,
) {
  variantOverrides.set(name, {
    ...variantOverrides.get(name),
    ...override,
  });
  resolveVariants(palette);
}

export function resolveButtonVariants(activePalette: Palette = palette) {
  resolveVariants(activePalette);
}

export function getButtonVariant(name: string): ButtonVariantStyle {
  const variant = resolvedVariants[name];
  if (!variant) {
    throw new Error(`Unknown button variant "${name}".`);
  }
  return variant;
}

export function getButtonVariants() {
  return resolvedVariants;
}

export function resolveButtonStyle(
  name: string,
  state: ButtonState,
  resolver: ButtonStyleResolver = defaultButtonStyleResolver,
) {
  return resolver(getButtonVariant(name), state);
}
