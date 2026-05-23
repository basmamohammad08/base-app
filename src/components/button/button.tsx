import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useStyle } from "react-native-style-utilities";

import { fonts } from "../../theme";
import { BaseButton } from "./BaseButton";

export type ButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  leftIcon?: (color: string) => React.ReactNode;
  rightIcon?: (color: string) => React.ReactNode;
  isLoading?: boolean;
  type?: "primary" | "secondary" | "tertiary";
  style?: StyleProp<ViewStyle>;
  containerPadding?: number;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  onPress,
  containerPadding,
  style,
  textStyle,
  type = "primary",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      disabled={props.disabled}
      containerPadding={containerPadding}
      style={style}
      isLoading={props.isLoading}
      onPress={onPress}
      type={type}
    >
      {({ color }) => (
        <ButtonContent
          {...props}
          type={type}
          color={color}
          textStyle={textStyle}
        />
      )}
    </BaseButton>
  );
}

export function ButtonContent({
  title,
  leftIcon,
  rightIcon,
  isLoading,
  color,
  textStyle,
}: Omit<ButtonProps, "onPress" | "disabled" | "type"> & {
  color: string;
  type: NonNullable<ButtonProps["type"]>;
}) {
  const titleStyle = useStyle(() => ({ color }), [color]);

  return (
    <View style={[styles.rowStyle, isLoading && styles.hidden]}>
      {leftIcon?.(color)}
      <Text style={[styles.title, titleStyle, textStyle]}>{title}</Text>
      {rightIcon?.(color)}
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  hidden: {
    opacity: 0,
  },
  title: {
    ...fonts.baseSemiBold,
    textAlign: "center",
  },
});
