import { FlatList, View } from "react-native";
import DateChip, { DateChipType } from "./DateChip";
import { cn } from "@utils/cn";
import { format } from "date-fns";
import { useEffect, useMemo, useRef } from "react";

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

  /** 레이아웃 고정값(필요 시 조정) */
  itemWidth?: number; // 칩 가로폭 (px)
  gap?: number; // 칩 간격 (px)
  containerHPadding?: number; // 좌우 패딩 (px)
  /** selected 대신 오늘로 자동 스크롤하고 싶으면 true */
  preferTodayWhenNoSelected?: boolean;
};

const toYMD = (d: Date) => format(d, "yyyy-MM-dd");

export default function DateChipRow({
  days,
  selectedDate,
  onSelect,
  className,
  itemWidth = 53,
  gap = 1,
  containerHPadding = 12,
  preferTodayWhenNoSelected = true,
}: DateChipRowPropsType) {
  const listRef = useRef<FlatList<DayCell>>(null);

  // 선택 기준키 (없으면 오늘)
  const selectedKey = useMemo(() => {
    if (selectedDate) return toYMD(selectedDate);
    if (!preferTodayWhenNoSelected) return null;
    return toYMD(new Date());
  }, [selectedDate, preferTodayWhenNoSelected]);

  const selectedIndex = useMemo(() => {
    if (!selectedKey) return -1;
    return days.findIndex((d) => toYMD(d.date) === selectedKey);
  }, [days, selectedKey]);

  // FlatList 레이아웃 계산(고정 폭 기준)
  const ITEM_SIZE = itemWidth + gap;

  const getItemLayout = (
    _data: ArrayLike<DayCell> | null | undefined,
    index: number
  ) => ({
    length: ITEM_SIZE,
    offset: containerHPadding + index * ITEM_SIZE,
    index,
  });

  // 첫 렌더에서 자동 스크롤 (iOS/Android 모두 안정적)
  // initialScrollIndex로 충분하지만, 일부 케이스 보정용으로 useEffect에서 한번 더 보냄
  useEffect(() => {
    if (selectedIndex > -1) {
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: true,
          viewPosition: 0.5, // 가운데쯤 위치
        });
      }, 0);
    }
  }, [selectedIndex]);

  return (
    <FlatList
      ref={listRef}
      horizontal
      data={days}
      keyExtractor={(d) => d.date.toISOString()}
      className={cn(className)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: containerHPadding }}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      renderItem={({ item }) => {
        const isSelected = selectedKey === toYMD(item.date);
        const type: DateChipType = item.disabled
          ? "disabled"
          : isSelected
            ? "selected"
            : "default";

        return (
          <View style={{ width: itemWidth }}>
            <DateChip
              weekday={item.weekday}
              day={item.day}
              type={type}
              onPress={() => onSelect?.(item)}
            />
          </View>
        );
      }}
      initialScrollIndex={selectedIndex > -1 ? selectedIndex : 0}
      getItemLayout={getItemLayout}
    />
  );
}
