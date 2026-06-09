import type * as React from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export const BUILT_IN_BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "destructive",
] as const;

export type BuiltInButtonVariant = (typeof BUILT_IN_BUTTON_VARIANTS)[number];
export type ButtonVariant = BuiltInButtonVariant | (string & {});

export type ButtonState = {
  pressed: boolean;
  disabled: boolean;
};

export type ButtonVariantStyle = {
  backgroundColor: string;
  disabledBackgroundColor: string;
  selectedBackgroundColor: string;
  color: string;
  selectedColor: string;
  disabledColor?: string;
};

export type ButtonStyleResolver = (
  style: ButtonVariantStyle,
  state: ButtonState,
) => {
  backgroundColor: string;
  color: string;
};

export type ButtonVariantFactory = (
  palette: import("@/theme/palette").Palette,
) => ButtonVariantStyle;

export type ButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  leftIcon?: (color: string) => React.ReactNode;
  rightIcon?: (color: string) => React.ReactNode;
  isLoading?: boolean;
  type?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  containerPadding?: number;
  textStyle?: StyleProp<TextStyle>;
};

export type BaseButtonProps = {
  children:
    | React.ReactNode
    | ((props: { pressed: boolean; color: string }) => React.ReactNode);
  type: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  containerPadding?: number;
  testID?: string;
} & Pick<ButtonProps, "disabled" | "isLoading" | "onPress">;
