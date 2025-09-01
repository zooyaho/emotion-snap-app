import AppScrollableBottomSheet from "@components/common/AppScrollableBottomSheet";
import DateChipRow from "@components/common/DateChipRow";
import PeriodPickerButton from "@components/common/PeriodPickerButton";
import {
  getMoodEntries,
  MoodEntryType,
} from "@features/mood/services/moodStorage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@providers/ThemeProvider";
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
import { ScrollView, Text, View } from "react-native";
import MoodTrendChart from "../components/MoodTrendChart";

export const DUMMY_DAY_DATA = [
  {
    createdAt: 1756690500000, // 09:15
    id: "a1",
    moodId: "happy",
    note: "아침 기분 상쾌 ☀️",
  },
  {
    createdAt: 1756694100000, // 10:15
    id: "a2",
    moodId: "spectacular",
    note: "커피 한잔으로 리프레시 ☕",
  },
  {
    createdAt: 1756694100000, // 10:15
    id: "a2",
    moodId: "spectacular",
    note: "커피 한잔으로 리프레시 ☕",
  },
  {
    createdAt: 1756694100000, // 10:15
    id: "a2",
    moodId: "spectacular",
    note: "커피 한잔으로 리프레시 ☕",
  },
  {
    createdAt: 1756694100000, // 10:15
    id: "a2",
    moodId: "spectacular",
    note: "커피 한잔으로 리프레시 ☕",
  },
  {
    createdAt: 1756699500000, // 11:45
    id: "a3",
    moodId: "sad",
    note: "회의가 길어서 조금 지침 😓",
  },
  {
    createdAt: 1756706700000, // 13:45
    id: "a4",
    moodId: "angry",
    note: "버스 놓쳐서 화남 😡",
  },
  {
    createdAt: 1756713900000, // 15:45
    id: "a5",
    moodId: "happy",
    note: "좋은 소식 들어서 기분 👍",
  },
  {
    createdAt: 1756721100000, // 17:45
    id: "a6",
    moodId: "spectacular",
    note: "운동 후 개운함 🏃‍♂️",
  },
  {
    createdAt: 1756731900000, // 20:45
    id: "a7",
    moodId: "good",
    note: "저녁 산책 중 🌙",
  },
] as MoodEntryType[];

export default function DailyStatsScreen() {
  const today = new Date();
  const monthSelectBottomSheetRef = useRef<BottomSheetModal>(null);
  const [noteEntries, setNoteEntries] = useState<MoodEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

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
    <ScrollView className="flex-1 pt-6">
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

      <View className="mt-6 mx-4 gap-3">
        {/* TODO :: tooltip추가 */}
        <Text className="text-base text-neutral-600">감정 흐름</Text>
        <MoodTrendChart mode="day" noteEntries={noteEntries} />
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
    </ScrollView>
  );
}
