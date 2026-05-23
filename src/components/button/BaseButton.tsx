import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useStyle } from "react-native-style-utilities";

import { palette } from "@/theme";
import { ButtonProps } from "./button";
import { config } from "./config";

export type BaseButtonProps = {
  children:
    | React.ReactNode
    | ((props: { pressed: boolean; color: string }) => React.ReactNode);
  type: NonNullable<ButtonProps["type"]>;
  style?: StyleProp<ViewStyle>;
  containerPadding?: number;
  testID?: string;
} & Pick<ButtonProps, "disabled" | "isLoading" | "onPress">;

function getForegroundColor({
  disabled,
  pressed,
  type,
}: { pressed: boolean; outlined?: boolean } & Pick<
  BaseButtonProps,
  "disabled" | "type"
>) {
  if (disabled) return palette.gray500;
  return pressed ? config[type].selectedColor : config[type].color;
}

export function BaseButton({
  children,
  containerPadding,
  disabled,
  isLoading,
  onPress,
  type,
  style,
  testID,
}: BaseButtonProps) {
  const containerStyle = useStyle(
    () => ({
      backgroundColor: disabled
        ? config[type].disabledBackgroundColor
        : config[type].backgroundColor,
      padding: containerPadding ?? 12,
    }),
    [type, disabled, containerPadding],
  );

  const loadingIconStyle = useStyle(
    () => ({
      margin: containerPadding ?? 12,
    }),
    [containerPadding],
  );

  return (
    <Pressable
      disabled={disabled || isLoading}
      onPress={onPress}
      testID={testID}
      style={[styles.container, containerStyle, style]}
    >
      {({ pressed }) => {
        const color = getForegroundColor({ pressed, disabled, type });
        return (
          <>
            {isLoading && (
              <ActivityIndicator
                style={[styles.loadingIcon, loadingIconStyle]}
                color={color}
                size="small"
              />
            )}
            {typeof children === "function"
              ? children({ pressed, color })
              : children}
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: "center",
  },
  loadingIcon: {
    alignSelf: "center",
    position: "absolute",
  },
});
