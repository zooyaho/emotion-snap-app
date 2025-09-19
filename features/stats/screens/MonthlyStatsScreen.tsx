import PeriodPickerButton from "@components/PeriodPickerButton";
import YearMonthDayPickerSheet from "@components/YearMonthDayPickerSheet";
import { ScrollView } from "react-native";
import MoodRatioCard from "../components/MoodRatioCard";
import MoodTrendCard from "../components/MoodTrendCard";
import StatsCardLayout from "../components/StatsCardLayout";
import { usePeriodEntries } from "@hooks/usePeriodEntries";

export default function MonthlyStatsScreen() {
  const {
    selectedDate,
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,
    noteEntries,
  } = usePeriodEntries("month");

  return (
    <ScrollView className="flex-1 pt-6">
      <PeriodPickerButton
        mode="year-month"
        value={selectedDate}
        onPress={openPeriodPickerSheet}
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
        ref={periodPickerSheetRef}
        mode="year-month"
        initialDate={selectedDate}
        recentYears={10}
        onConfirm={onPeriodPickerSheetConfirm}
      />
    </ScrollView>
  );
}
