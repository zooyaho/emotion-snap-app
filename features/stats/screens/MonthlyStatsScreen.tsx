import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import PeriodPickerButton from "@components/common/PeriodPickerButton";
import YearMonthDayPickerSheet from "@components/common/YearMonthDayPickerSheet";
import {
  getMoodEntries,
  MoodEntryType,
} from "@features/mood/services/moodStorage";
import { getYearMonth } from "@utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import MoodRatioCard from "../components/MoodRatioCard";
import MoodTrendCard from "../components/MoodTrendCard";
import StatsCardLayout from "../components/StatsCardLayout";

export default function MonthlyStatsScreen() {
  const today = new Date();
  const yearMonthPickerSheetRef = useRef<AppBottomSheetRef>(null);
  const [noteEntries, setNoteEntries] = useState<MoodEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today); // 현재 선택 날짜 (기본: 오늘)
  const selectedYM = useMemo(() => getYearMonth(selectedDate), [selectedDate]); // 현재 선택 연도/월 (기본: 오늘에 해당되는 연도/월)

  /** yearMonthDayPickerSheet open 핸들러 */
  const openMonthPickerSheet = () => yearMonthPickerSheetRef.current?.present();

  /** yearMonthDayPickerSheet confirm 핸들러 */
  const handleConfirm = (pickedDate: Date) => {
    setSelectedDate(pickedDate);
  };

  /** 선택된 날짜의 기록 로드 */
  const loadNoteListForSelectedDate = useCallback(async (date: Date) => {
    setIsLoading(true);
    const list = await getMoodEntries({ range: "month", date });
    setNoteEntries(list);
    setIsLoading(false);
  }, []);

  /**
   * TODO :: 뒤로 돌아올때마다 리스트 깜박임 현상 수정 >> tanstack-query로 수정 예정
   */
  // 탭으로 돌아올 때마다 '오늘'로 초기화 + 오늘 데이터 즉시 로드
  useFocusEffect(
    useCallback(() => {
      setSelectedDate(today);
      loadNoteListForSelectedDate(today);
    }, [loadNoteListForSelectedDate])
  );

  // selectedDate 변경 시 데이터 로드
  useEffect(() => {
    loadNoteListForSelectedDate(selectedDate);
  }, [selectedDate, loadNoteListForSelectedDate]);

  return (
    <ScrollView className="flex-1 pt-6">
      <PeriodPickerButton
        value={selectedYM}
        onPress={openMonthPickerSheet}
        className="px-4"
      />

      {/* 감정 비율 카드 영역 */}
      <StatsCardLayout title="감정 비율">
        <MoodRatioCard mode="month" noteEntries={noteEntries} />
      </StatsCardLayout>

      {/* 감정 흐름 카드 영역 */}
      <StatsCardLayout title="감정 흐름">
        <MoodTrendCard mode="month" noteEntries={noteEntries} />
      </StatsCardLayout>

      {/* 연/월 선택 BottomSheet */}
      <YearMonthDayPickerSheet
        ref={yearMonthPickerSheetRef}
        mode="year-month"
        initialDate={selectedDate}
        recentYears={10}
        onConfirm={handleConfirm}
      />
    </ScrollView>
  );
}
