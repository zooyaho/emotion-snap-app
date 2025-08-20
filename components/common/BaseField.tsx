import { useState, ReactNode } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { cn } from "@utils/cn";
import { getBaseFieldColors } from "@utils/colorByTwTokenUtils";
import { useTheme } from "@providers/ThemeProvider";

interface BaseFieldPropsType extends TextInputProps {
  assistiveText?: string; // 힌트/에러 문구
  left?: ReactNode;
  right?: ReactNode;
  isError?: boolean;
  isDisabled?: boolean;
  className?: string;
  containerClassName?: string;
  counter?: { current: number; max?: number };
}

export function BaseField({
  assistiveText,
  left,
  right,
  isError,
  isDisabled,
  className,
  containerClassName,
  counter,
  onFocus,
  onBlur,
  ...inputProps
}: BaseFieldPropsType) {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();
  const { placeholderColor, cursorColor } = getBaseFieldColors(theme);

  return (
    <View className={containerClassName}>
      <View
        className={cn(
          "flex-row items-center justify-between rounded-lg px-3 py-3",
          "border border-primary-100 bg-background",
          // 상태별
          isFocused && "border-primary-500",
          isError && "border-danger-500 bg-danger-50",
          isDisabled && "border-neutral-100 bg-neutral-50",
          className
        )}
      >
        {left ? (
          <View className="mr-2 mt-0.5 justify-start">{left}</View>
        ) : null}

        <TextInput
          editable={!isDisabled}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={placeholderColor}
          cursorColor={cursorColor}
          selectionColor={cursorColor}
          className={cn(
            // multiline도 커버 (textarea에서 높이 커짐)
            "flex-1 text-sm text-neutral-600",
            "min-h-[22px]", // 한줄 높이 보장
            isDisabled && "text-neutral-200"
          )}
          {...inputProps}
        />

        {right ? <View className="ml-2 mt-0.5 items-end">{right}</View> : null}
      </View>

      {(assistiveText || counter) && (
        <View className="mt-1 flex-row items-center justify-between">
          {assistiveText ? (
            <Text
              className={cn(
                "text-xs",
                isError ? "text-danger-500" : "text-primary-500"
              )}
              numberOfLines={2}
            >
              {assistiveText}
            </Text>
          ) : (
            <View />
          )}

          {counter ? (
            <Text className="text-xs text-neutral-400">
              {counter.current}
              {counter.max ? `/${counter.max}` : null}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
