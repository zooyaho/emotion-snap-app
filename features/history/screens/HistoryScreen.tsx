import DateChipRow from "@components/common/DateChipRow";
import LoadingIndicator from "@components/common/LoadingIndicator";
import PeriodPickerButton from "@components/PeriodPickerButton";
import YearMonthDayPickerSheet from "@components/YearMonthDayPickerSheet";
import MoodImage from "@features/mood/components/MoodImage";
import MoodNoteCard from "@features/mood/components/MoodNoteCard";
import { removeMoodEntry } from "@features/mood/services/moodStorage";
import { usePeriodEntries } from "@hooks/usePeriodEntries";
import { getMonthDays, getYearMonth } from "@utils/date";
import { useMemo } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function HistoryScreen() {
  const {
    isInitialLoading,
    selectedDate,
    setSelectedDate,
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,
    noteEntries,
    reload,
  } = usePeriodEntries("day");

  const dateChipList = useMemo(() => {
    const selectedYM = getYearMonth(selectedDate);
    return getMonthDays(selectedYM.year, selectedYM.month);
  }, [selectedDate]);

  /** 기록 삭제 핸들러 */
  const handleDeleteNote = async (id: string) => {
    await removeMoodEntry(id);
    await reload();
  };

  return (
    <View className="flex-1 pt-6">
      <PeriodPickerButton
        mode="year-month"
        value={selectedDate}
        textClassName="text-xl"
        onPress={openPeriodPickerSheet}
      />
      <View className="mt-4">
        <DateChipRow
          days={dateChipList}
          selectedDate={selectedDate}
          onSelect={(d) => setSelectedDate(d.date)}
        />
      </View>

      {/* 기록 리스트 */}
      <View className="flex-1 mt-6 gap-4">
        {isInitialLoading ? (
          <View className="mt-40 items-center justify-center">
            <LoadingIndicator />
          </View>
        ) : noteEntries.length === 0 ? (
          <View className="flex-row mt-40 items-center justify-center">
            <Text className="text-md text-center text-neutral-600">
              감정 기록이 없습니다
            </Text>
            <MoodImage name="spectacular" height={32} width={32} />
          </View>
        ) : (
          <View className="flex-1">
            <FlatList
              data={noteEntries}
              keyExtractor={(note) => note.id}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingBottom: 40,
              }}
              renderItem={({ item: note }) => (
                <MoodNoteCard
                  id={note.id}
                  moodId={note.moodId}
                  createdDate={note.createdAt}
                  content={note.note}
                  onDeletePress={handleDeleteNote}
                />
              )}
            />
          </View>
        )}
      </View>

      {/* 연/월 선택 BottomSheet */}
      <YearMonthDayPickerSheet
        ref={periodPickerSheetRef}
        mode="year-month"
        initialDate={selectedDate}
        recentYears={10}
        onConfirm={onPeriodPickerSheetConfirm}
      />
    </View>
  );
}
