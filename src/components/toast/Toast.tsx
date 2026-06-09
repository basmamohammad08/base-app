import * as React from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";

import { palette } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStyle } from "react-native-style-utilities";
import { hide } from "./toast-methods";
import { Toast as ToastType } from "./types";

const DEFAULT_DURATION = 1500;
const ANIMATION_DURATION_IN = 380;
const ANIMATION_DURATION_OUT = 260;
const SLIDE_OFFSET = -80;

type Props = {
  title: string;
  type: ToastType["type"];
  id: ToastType["id"];
  duration: NonNullable<ToastType["options"]>["duration"];
  canHide: NonNullable<ToastType["options"]>["canHide"];
  leftIcon: NonNullable<ToastType["options"]>["leftIcon"];
};

const config = {
  error: { backgroundColor: palette.red500 },
  success: { backgroundColor: palette.success500 },
  warning: { backgroundColor: palette.warning400 },
  info: { backgroundColor: palette.warning400 },
  disabled: { backgroundColor: palette.gray400 },
};

export function Toast({
  title,
  type,
  duration = DEFAULT_DURATION,
  id,
  canHide,
  leftIcon,
}: Props) {
  const timerRef = React.useRef<NodeJS.Timeout>(null);
  const insets = useSafeAreaInsets();

  const translateY = React.useRef(new Animated.Value(SLIDE_OFFSET)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.94)).current;

  const container = useStyle(
    () => ({
      backgroundColor: config[type].backgroundColor,
      top: insets.top,
    }),
    [type],
  );

  // Animates out, then calls hide() — safe to call from both the timer and the X button
  const dismiss = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SLIDE_OFFSET,
        duration: ANIMATION_DURATION_OUT,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION_OUT,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => hide(id));
  }, [id]);

  React.useEffect(() => {
    // Enter animation: slide down + fade + scale with a springy overshoot
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION_IN,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION_IN * 0.7,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: ANIMATION_DURATION_IN,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss via animated exit, not instant unmount
    timerRef.current = setTimeout(dismiss, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Animated.View
      className="py-[10] absolute left-[25] right-[25] flex-row items-center pl-5 rounded-lg z-[1]"
      style={[container, { opacity, transform: [{ translateY }, { scale }] }]}
    >
      {leftIcon}
      <Text className="flex-1 textSmallRegular text-white text-start">
        {type === "error" && !title
          ? "Something Went Wrong, please try again"
          : title}
      </Text>
      {canHide && (
        <TouchableOpacity onPress={dismiss} className="px-4">
          <Ionicons
            name="close-circle-outline"
            size={20}
            color={palette.white}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
