import * as React from "react";
import {
  Animated,
  Easing,
  I18nManager,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { palette } from "../theme";

export type ToggleProps = {
  onToggle: () => void;
  isOn: boolean;
  style?: StyleProp<ViewStyle>;
};

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_PADDING = 3;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING * 2;

export function Toggle({ isOn, onToggle, style }: ToggleProps) {
  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const thumbOffPosition = THUMB_PADDING;
  const thumbOnPosition = THUMB_PADDING + THUMB_TRAVEL;

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: I18nManager.isRTL
      ? [-thumbOffPosition, -thumbOnPosition]
      : [thumbOffPosition, thumbOnPosition],
  });

  const trackColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.gray400, palette.success500],
  });

  const thumbScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.85, 1],
  });

  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={style}
    >
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.track,
            { backgroundColor: trackColor },
            pressed && styles.trackPressed,
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [
                  { translateX: thumbTranslateX },
                  { scale: thumbScale },
                ],
              },
            ]}
          />
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: "center",
  },
  trackPressed: {
    opacity: 0.85,
  },
  thumb: {
    alignSelf: "flex-start",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: palette.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
