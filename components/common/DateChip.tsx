import { Pressable, Text, View } from "react-native";
import { cn } from "@utils/cn";
import { useTheme } from "@providers/ThemeProvider";

export type DateChipType = "default" | "selected" | "disabled";

export type DateChipPropsType = {
  /** 요일 (예: '수', '목') */
  weekday: string;
  /** 일(1~31) */
  day: number;
  /** 스타일 타입 */
  type?: DateChipType;
  /** 클릭 */
  onPress?: () => void;
  /** 접근성 라벨 */
  ariaLabel?: string;
  className?: string;
};

export default function DateChip({
  weekday,
  day,
  type = "default",
  onPress,
  ariaLabel,
  className,
}: DateChipPropsType) {
  const { theme } = useTheme();

  const typeClass =
    type === "selected"
      ? "bg-primary-50 border-primary-500"
      : type === "disabled"
        ? "bg-background/90 border-0 opacity-50"
        : "bg-background border-neutral-200";

  return (
    <Pressable
      disabled={type === "disabled"}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={ariaLabel ?? `${weekday} ${day}일`}
      className={cn("overflow-hidden", className)}
    >
      <View
        className={cn(
          "items-center justify-center border transition-all duration-150 px-4 py-2.5 m-1 gap-1 rounded-full elev-down-low",
          theme === "dark" && "elev-down-low-dark",
          typeClass
        )}
      >
        <Text
          className={cn(
            "text-sm",
            type === "selected"
              ? "text-primary-500 font-semibold"
              : "text-neutral-600"
          )}
        >
          {weekday}
        </Text>
        <Text
          className={cn(
            "text-xs",
            type === "selected"
              ? "text-primary-500 font-semibold"
              : "text-neutral-600"
          )}
        >
          {day}
        </Text>
      </View>
    </Pressable>
  );
}
