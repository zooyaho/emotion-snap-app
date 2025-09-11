import { View, Text, ScrollView } from "react-native";
import MoodTrendChart from "../components/MoodTrendChart";
import PeriodPickerButton from "@components/common/PeriodPickerButton";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import YearMonthDayPickerSheet from "@components/common/YearMonthDayPickerSheet";
import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import { useMemo, useRef, useState } from "react";
import { getYear } from "date-fns";

const YEAR = 2025;

export const mk = (month: number, day: number, hour = 12) =>
  new Date(YEAR, month - 1, day, hour, 0, 0, 0).getTime();

// 연간 더미 데이터 (2025년 기준)
export const DUMMY_YEAR_DATA: MoodEntryType[] = [
  {
    createdAt: mk(1, 3, 10),
    id: "y-202501-03-1",
    moodId: "happy",
    note: "새해 다짐! ✨",
  },
  {
    createdAt: mk(2, 14, 18),
    id: "y-202502-14-1",
    moodId: "spectacular",
    note: "발렌타인 🍫",
  },
  {
    createdAt: mk(3, 10, 9),
    id: "y-202503-10-1",
    moodId: "good",
    note: "봄바람 🌸",
  },
  {
    createdAt: mk(4, 22, 14),
    id: "y-202504-22-1",
    moodId: "sad",
    note: "비 오는 날 ☔",
  },
  {
    createdAt: mk(5, 5, 11),
    id: "y-202505-05-1",
    moodId: "happy",
    note: "어린이날 🎈",
  },
  {
    createdAt: mk(6, 20, 20),
    id: "y-202506-20-1",
    moodId: "angry",
    note: "더워서 짜증 🥵",
  },
  {
    createdAt: mk(7, 15, 17),
    id: "y-202507-15-1",
    moodId: "good",
    note: "휴가 시작 🏖️",
  },
  {
    createdAt: mk(8, 25, 9),
    id: "y-202508-25-1",
    moodId: "spectacular",
    note: "여름 끝자락 😌",
  },
  {
    createdAt: mk(9, 1, 9),
    id: "y-202509-01-1",
    moodId: "happy",
    note: "가을 시작 🍂",
  },
  {
    createdAt: mk(10, 9, 13),
    id: "y-202510-09-1",
    moodId: "sad",
    note: "한글날 📚",
  },
  {
    createdAt: mk(11, 11, 15),
    id: "y-202511-11-1",
    moodId: "happy",
    note: "빼빼로데이 🍪",
  },
  {
    createdAt: mk(12, 25, 19),
    id: "y-202512-25-1",
    moodId: "spectacular",
    note: "크리스마스 🎄",
  },
  // (원하면 12월 보강)
  {
    createdAt: mk(12, 10, 18),
    id: "y-202512-10-1",
    moodId: "angry",
    note: "야근…",
  },
];

export default function YearlyStatsScreen() {
  const today = new Date();
  const yearPickerSheetRef = useRef<AppBottomSheetRef>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(today); // 현재 선택 날짜 (기본: 오늘)
  const selectedY = useMemo(() => {
    const year = getYear(selectedDate);
    return { year: year };
  }, [selectedDate]); // 현재 선택 연도 (기본: 오늘에 해당되는 연도)

  /** yearMonthDayPickerSheet open 핸들러 */
  const openYearPickerSheet = () => yearPickerSheetRef.current?.present();

  /** yearMonthDayPickerSheet confirm 핸들러 */
  const handleConfirm = (pickedDate: Date) => {
    setSelectedDate(pickedDate);
  };

  return (
    <ScrollView className="flex-1 pt-6">
      <PeriodPickerButton
        value={selectedY}
        onPress={openYearPickerSheet}
        className="px-4"
      />

      <View className="mt-6 mx-4 gap-3">
        {/* TODO :: tooltip추가 */}
        <Text className="text-base text-neutral-600">감정 흐름</Text>
        <MoodTrendChart mode="year" noteEntries={DUMMY_YEAR_DATA} />
      </View>

      {/* 연도 선택 BottomSheet */}
      <YearMonthDayPickerSheet
        ref={yearPickerSheetRef}
        mode="year"
        initialDate={selectedDate}
        recentYears={10}
        onConfirm={handleConfirm}
      />
    </ScrollView>
  );
}
