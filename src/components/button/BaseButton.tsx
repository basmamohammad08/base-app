import * as React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useStyle } from "react-native-style-utilities";

import { resolveButtonStyle } from "./registry";
import type { BaseButtonProps } from "./types";

export type { BaseButtonProps } from "./types";

export function BaseButton({
  children,
  containerPadding,
  disabled = false,
  isLoading,
  onPress,
  type,
  style,
  testID,
}: BaseButtonProps) {
  const containerStyle = useStyle(
    () => {
      const { backgroundColor } = resolveButtonStyle(type, {
        pressed: false,
        disabled,
      });

      return {
        backgroundColor,
        padding: containerPadding ?? 12,
      };
    },
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
        const { color } = resolveButtonStyle(type, { pressed, disabled });

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
