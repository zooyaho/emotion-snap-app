import { Pressable, Text } from "react-native";
import { cn } from "@utils/cn";
import { YearMonthType, ymLabel, yLabel } from "@utils/date";
import { ThemedIonicon } from "./ThemedIonicon";

type PeriodPickerButtonPropsType = {
  /** 현재 선택된 값 */
  value: YearMonthType | { year: number };
  /** 월까지 표시 여부 (기본: true) */
  showMonth?: boolean;
  /** 버튼 눌렀을 때 실행 (보통 BottomSheet present) */
  onPress: () => void;
  className?: string;
  /** 접근성 라벨 */
  ariaLabel?: string;
  textClassName?: string;
};

export default function PeriodPickerButton({
  value,
  showMonth = true,
  onPress,
  className,
  ariaLabel,
  textClassName,
}: PeriodPickerButtonPropsType) {
  const label =
    "month" in value && showMonth
      ? ymLabel(value as YearMonthType)
      : yLabel(value.year);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={ariaLabel ?? `${label} 선택`}
      className={cn("self-start flex-row items-center", className)}
    >
      <Text
        className={cn("text-xl font-semibold text-neutral-600", textClassName)}
      >
        {label}
      </Text>
      <ThemedIonicon name="chevron-forward-outline" />
    </Pressable>
  );
}
