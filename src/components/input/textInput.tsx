import * as React from "react";
import {
  BlurEvent,
  FocusEvent,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";

import { InputWrapper } from "./inputWrapper";

type Props = TextInputProps & {
  label?: string;
  required?: boolean;
  error?: string;
  inputStyle?: TextInputProps["style"];
  isError?: boolean;
};

export function TextInput({
  label,
  required,
  inputStyle,
  error,
  onFocus,
  onBlur,
  className,
  isError,
  ...props
}: Props) {
  const [focused, setFocused] = React.useState(false);

  function handleOnFocus(e: FocusEvent) {
    setFocused(true);
    onFocus?.(e);
  }

  function handleOnBlur(e: BlurEvent) {
    setFocused(false);
    onBlur?.(e);
  }

  return (
    <InputWrapper
      error={error}
      required={required}
      label={label}
      className={className}
    >
      <RNTextInput
        className={`input  ${
          (error?.length ?? 0) > 0 || isError
            ? "border-red-500"
            : focused
              ? "border-black"
              : "border-gray-400"
        }`}
        style={inputStyle}
        placeholderTextColor="rgba(255,255,255, .5)"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        textAlignVertical={props.multiline ? "top" : props.textAlignVertical}
        {...props}
      />
    </InputWrapper>
  );
}
