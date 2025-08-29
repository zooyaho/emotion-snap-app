import AppScrollableBottomSheet from "@components/common/AppScrollableBottomSheet";
import DateChipRow from "@components/common/DateChipRow";
import LoadingIndicator from "@components/common/LoadingIndicator";
import PeriodPickerButton from "@components/common/PeriodPickerButton";
import MoodImage from "@features/mood/components/MoodImage";
import MoodNoteCard from "@features/mood/components/MoodNoteCard";
import {
  getMoodEntries,
  MoodEntryType,
  removeMoodEntry,
} from "@features/mood/services/moodStorage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  getMonthDays,
  getMonthsOfYear,
  getTodayYearMonth,
  getYearMonth,
  YearMonthType,
  ymLabel,
} from "@utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function HistoryScreen() {
  const today = new Date();
  const monthSelectBottomSheetRef = useRef<BottomSheetModal>(null);
  const [noteEntries, setNoteEntries] = useState<MoodEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date>(today); // 현재 선택 날짜 (기본: 오늘)
  const selectedYM = useMemo(() => getYearMonth(selectedDate), [selectedDate]); // 현재 선택 연도/월 (기본: 오늘에 해당되는 연도/월)
  const todayYM = getTodayYearMonth();

  const dateChipList = useMemo(
    () => getMonthDays(selectedYM.year, selectedYM.month),
    [selectedYM.year, selectedYM.month]
  );
  /** 월 선택 BottomSheet > 월 리스트(최신순) */
  const monthSelectBottomSheetList = useMemo(
    () => getMonthsOfYear(selectedYM.year, true).reverse(),
    [selectedYM.year]
  );

  /** 월 선택 BottomSheet 열기 */
  const openMonthSheet = () => monthSelectBottomSheetRef.current?.present();

  /** 월 선택 핸들러: 선택 날짜를 해당 월로 옮기기 (같은 해/월이면 오늘 유지, 아니면 1일로) */
  const handleMonthPick = (ym: YearMonthType) => {
    const isTodayMonth = ym.year === todayYM.year && ym.month === todayYM.month;
    const nextDate = isTodayMonth ? today : new Date(ym.year, ym.month - 1, 1);
    setSelectedDate(nextDate);
    monthSelectBottomSheetRef.current?.dismiss(); // 바텀시트 닫기
  };

  /** 기록 삭제 핸들러 */
  const handleDeleteNote = async (id: string) => {
    await removeMoodEntry(id);
    await loadNoteListForSelectedDate(selectedDate);
  };

  /** 선택된 날짜의 기록 로드 */
  const loadNoteListForSelectedDate = useCallback(async (date: Date) => {
    setIsLoading(true);
    const list = await getMoodEntries({ range: "day", date });
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

  // 사용자가 칩을 눌러 날짜를 바꾸면 그때마다 로드
  useEffect(() => {
    loadNoteListForSelectedDate(selectedDate);
  }, [selectedDate, loadNoteListForSelectedDate]);

  return (
    <View className="flex-1 pt-6">
      <PeriodPickerButton
        value={selectedYM}
        onPress={openMonthSheet}
        textClassName="text-xl"
        className="px-4"
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
        {isLoading ? (
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

      {/* 월 선택 BottomSheet */}
      <AppScrollableBottomSheet
        ref={monthSelectBottomSheetRef}
        title="월 선택"
        listData={monthSelectBottomSheetList}
        getKey={(m) => `${m.year}-${m.month}`}
        getLabel={(m) => ymLabel(m)}
        isSelected={(m) =>
          m.year === selectedYM.year && m.month === selectedYM.month
        }
        onPickItem={handleMonthPick}
      />
    </View>
  );
}
