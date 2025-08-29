import { ScrollView, View } from "react-native";
import DateChip, { DateChipType } from "./DateChip";
import { cn } from "@utils/cn";
import { format } from "date-fns";

export type DayCell = {
  date: Date;
  day: number;
  weekday: string; // 예: "수"
  disabled?: boolean;
};

type DateChipRowPropsType = {
  days: DayCell[];
  /** 선택된 날짜 (Date 비교는 yyyy-mm-dd로) */
  selectedDate?: Date | null;
  /** 선택 콜백 */
  onSelect?: (d: DayCell) => void;
  /** 외부 클래스 */
  className?: string;
};

const toYMD = (d: Date) => format(d, "yyyy-MM-dd");

export default function DateChipRow({
  days,
  selectedDate,
  onSelect,
  className,
}: DateChipRowPropsType) {
  const selectedKey = selectedDate ? toYMD(selectedDate) : null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      className={cn(className)}
    >
      <View className="flex-row items-center gap-1 py-2">
        {days.map((d) => {
          const isSelected = selectedKey === toYMD(d.date);
          const type: DateChipType = d.disabled
            ? "disabled"
            : isSelected
              ? "selected"
              : "default";
          return (
            <DateChip
              key={d.date.toISOString()}
              weekday={d.weekday}
              day={d.day}
              type={type}
              onPress={() => onSelect?.(d)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
