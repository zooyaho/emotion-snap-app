import { BaseField } from "./BaseField";

type AppTextareaProps = {
  rows?: number; // 초기 높이
  maxLength?: number;
  isError?: boolean;
  disabled?: boolean;
  assistiveText?: string;
} & Omit<React.ComponentProps<typeof BaseField>, "multiline" | "numberOfLines">;

export function AppTextarea({
  rows = 4,
  maxLength,
  isError,
  disabled,
  assistiveText,
  value,
  onChangeText,
  ...rest
}: AppTextareaProps) {
  const current = typeof value === "string" ? value.length : 0;

  return (
    <BaseField
      assistiveText={assistiveText}
      isError={isError}
      disabled={disabled}
      multiline
      numberOfLines={rows}
      textAlignVertical="top" // 안드로이드에서 세로 가운데 문제 방지
      style={{ minHeight: rows * 24 }} // 자동 높이 증가
      maxLength={maxLength}
      counter={maxLength ? { current, max: maxLength } : { current }}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}
