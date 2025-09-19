import { Pressable, Text } from "react-native";
import { cn } from "@utils/cn";
import { ThemedIonicon } from "./common/ThemedIonicon";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type ModeType = "day" | "year-month" | "year";

type PeriodPickerButtonPropsType = {
  /** 현재 선택된 값  */
  value: Date;
  /** 표시 모드 */
  mode: ModeType;
  /** 버튼 눌렀을 때 실행 (보통 BottomSheet present) */
  onPress: () => void;
  className?: string;
  ariaLabel?: string;
  textClassName?: string;
};

export default function PeriodPickerButton({
  value,
  mode,
  onPress,
  className,
  ariaLabel,
  textClassName,
}: PeriodPickerButtonPropsType) {
  let label: string;

  switch (mode) {
    case "day":
      label = format(value, "yyyy년 M월 d일", { locale: ko });
      break;
    case "year-month":
      label = format(value, "yyyy년 M월", { locale: ko });
      break;
    case "year":
      label = format(value, "yyyy년", { locale: ko });
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={ariaLabel ?? `${label} 선택`}
      className={cn("self-start flex-row items-center px-4", className)}
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
