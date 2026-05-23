import * as React from "react";
import { Text, View } from "react-native";

import { TextInput } from "./textInput";

type Props = Pick<
  React.ComponentProps<typeof TextInput>,
  "label" | "required" | "error" | "children" | "className"
>;

export function InputWrapper({ label, error, required, children }: Props) {
  return (
    <View>
      {label && (
        <Text className="label">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
      )}
      {children}
      {(error?.length ?? 0) > 0 && (
        <Text className="mt-2 bg-red-500 py-2 px-4 text-text-primary overflow-hidden rounded-md">
          {error}
        </Text>
      )}
    </View>
  );
}
