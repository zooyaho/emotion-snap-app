import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { BaseField } from "./BaseField";
import { ThemedIonicon } from "./ThemedIonicon";

interface AppInputPropsType extends React.ComponentProps<typeof BaseField> {
  variant?: "default" | "search" | "password";
  isError?: boolean;
  disabled?: boolean;
  assistiveText?: string;
}

export function AppInput({
  variant = "default",
  isError,
  disabled,
  assistiveText,
  value,
  ...rest
}: AppInputPropsType) {
  const [secure, setSecure] = useState(variant === "password");

  const left =
    variant === "search" ? (
      <ThemedIonicon name="search" size={24} colorToken="technical" />
    ) : null;

  const right =
    variant === "password" ? (
      <TouchableOpacity
        onPress={() => setSecure((v) => !v)}
        disabled={disabled}
      >
        <ThemedIonicon
          name={secure ? "eye-off" : "eye"}
          size={24}
          colorToken="technical"
        />
      </TouchableOpacity>
    ) : (
      rest.right
    );

  return (
    <BaseField
      assistiveText={assistiveText}
      isError={isError}
      disabled={disabled}
      left={left}
      right={right}
      secureTextEntry={secure}
      value={value}
      {...rest}
    />
  );
}
