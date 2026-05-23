import * as React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle
} from "react-native";
import { useStyle } from "react-native-style-utilities";
import { palette } from "../theme";

export type RadioButtonProps = {
  size?: number;
  onPress?: () => void;
  checked: boolean;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function RadioButton({
  size = 20,
  onPress,
  checked,
  color = palette.primary.default,
  disabled,
  style,
}: RadioButtonProps) {
  const scale = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: checked ? 1 : 0,
      damping: 14,
      stiffness: 220,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  const containerStyle = useStyle(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: color,
    }),
    [size, color],
  );

  const innerViewStyle = useStyle(
    () => ({
      width: size * 0.6,
      height: size * 0.6,
      borderRadius: (size * 0.6) / 2,
      backgroundColor: disabled ? palette.gray400 : color,
    }),
    [size, color, disabled],
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress || disabled}
      style={[
        styles.container,
        containerStyle,
        disabled && styles.disabledBorderColor,
        style,
      ]}
    >
      <Animated.View style={[innerViewStyle, { transform: [{ scale }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledBorderColor: {
    borderColor: palette.gray400,
  },
});
