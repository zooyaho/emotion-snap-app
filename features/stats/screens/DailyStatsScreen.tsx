import DateChipRow from "@components/common/DateChipRow";
import PeriodPickerButton from "@components/PeriodPickerButton";
import YearMonthDayPickerSheet from "@components/YearMonthDayPickerSheet";
import { getMonthDays, getYearMonth } from "@utils/date";
import { ScrollView, View } from "react-native";
import MoodRatioCard from "../components/MoodRatioCard";
import MoodTrendCard from "../components/MoodTrendCard";
import StatsCardLayout from "../components/StatsCardLayout";
import { useMemo } from "react";
import { usePeriodEntries } from "@hooks/usePeriodEntries";

export default function DailyStatsScreen() {
  const {
    selectedDate,
    setSelectedDate,
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,
    noteEntries,
  } = usePeriodEntries("day");

  const dateChipList = useMemo(() => {
    const selectedYM = getYearMonth(selectedDate);
    return getMonthDays(selectedYM.year, selectedYM.month);
  }, [selectedDate]);

  return (
    <ScrollView className="flex-1 pt-6">
      <PeriodPickerButton
        mode="year-month"
        value={selectedDate}
        onPress={openPeriodPickerSheet}
      />
      <View className="mt-4">
        <DateChipRow
          days={dateChipList}
          selectedDate={selectedDate}
          onSelect={(d) => setSelectedDate(d.date)}
        />
      </View>

      {/* 감정 비율 카드 영역 */}
      <StatsCardLayout title="감정 비율">
        <MoodRatioCard mode="day" noteEntries={noteEntries} />
      </StatsCardLayout>

      {/* 감정 흐름 카드 영역 */}
      <StatsCardLayout title="감정 흐름">
        <MoodTrendCard mode="day" noteEntries={noteEntries} />
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
