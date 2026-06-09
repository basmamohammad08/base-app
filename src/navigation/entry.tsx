import { Button } from "@/components/button/button";
import { Checkbox } from "@/components/checkBox";
import { TextInput } from "@/components/input/textInput";
import { RadioButton } from "@/components/radioButton";
import { Timer, TimerRef } from "@/components/timer";
import { toast } from "@/components/toast";
import { Toggle } from "@/components/toggle";
import { ThemeProvider, useThemeToggle } from "@/theme";
import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function AppContent() {
  const insets = useSafeAreaInsets();
  const timerRef = React.useRef<TimerRef>(null);
  const [checked, setIsChecked] = useState(false);
  const { toggleTheme, isDark } = useThemeToggle();

  return (
    <View className="px-4" style={{ marginTop: insets.top }}>
      <Button
        title="press here"
        onPress={() => {
          toast.show({ title: "this is a toast", type: "error" });
        }}
      />
      <TextInput placeholder="write here" label="this is label" required />
      <Timer ref={timerRef} timerInitalValue={45}>
        {(timer) => (
          <Text
            className={`${timer > 0 ? "text-text-secondary" : "text-primary-default"} textLgSemiBold`}
          >
            Resend code{timer > 0 ? ` (${timer})` : ""}
          </Text>
        )}
      </Timer>
      <Checkbox checked={checked} onPress={() => setIsChecked(!checked)} />
      <RadioButton checked={checked} onPress={() => setIsChecked(!checked)} />
      <Toggle isOn={isDark} onToggle={toggleTheme} />
    </View>
  );
}

export function Entry() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <AppContent />
        <toast.MountPoint />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
