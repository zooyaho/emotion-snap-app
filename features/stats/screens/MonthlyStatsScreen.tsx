import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import PeriodPickerButton from "@components/common/PeriodPickerButton";
import YearMonthDayPickerSheet from "@components/common/YearMonthDayPickerSheet";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { getYearMonth } from "@utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MoodTrendChart from "../components/MoodTrendChart";

// 간단한 타임스탬프 헬퍼: 2025년 9월(월=8) day/h/m → ms
const mk = (day: number, hour = 9, min = 0) =>
  new Date(2025, 8, day, hour, min).getTime();

export const DUMMY_MONTH_DATA: MoodEntryType[] = [
  {
    createdAt: mk(1, 9, 15),
    id: "m-20250901-1",
    moodId: "happy",
    note: "9월 시작! 🌤️",
  },
  {
    createdAt: mk(2, 10, 10),
    id: "m-20250902-1",
    moodId: "spectacular",
    note: "커피 최고 ☕",
  },
  {
    createdAt: mk(2, 21, 5),
    id: "m-20250902-2",
    moodId: "sad",
    note: "늦은 야근…",
  },
  // 3일: 일부러 비움(0 처리 확인)
  {
    createdAt: mk(4, 8, 30),
    id: "m-20250904-1",
    moodId: "good",
    note: "아침 산책",
  },
  {
    createdAt: mk(5, 12, 0),
    id: "m-20250905-1",
    moodId: "happy",
    note: "점심이 맛있다",
  },
  {
    createdAt: mk(5, 19, 45),
    id: "m-20250905-2",
    moodId: "good",
    note: "조용한 저녁",
  },
  {
    createdAt: mk(6, 15, 20),
    id: "m-20250906-1",
    moodId: "sad",
    note: "비 와서 축축",
  },
  // 7일: 비움
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(8, 9, 0),
    id: "m-20250908-1",
    moodId: "angry",
    note: "버스 놓침 😡",
  },
  {
    createdAt: mk(9, 14, 30),
    id: "m-20250909-1",
    moodId: "happy",
    note: "좋은 소식!",
  },
  {
    createdAt: mk(10, 20, 0),
    id: "m-20250910-1",
    moodId: "angry",
    note: "영화관",
  },
  {
    createdAt: mk(11, 11, 45),
    id: "m-20250911-1",
    moodId: "angry",
    note: "팀 런치",
  },
  {
    createdAt: mk(12, 7, 30),
    id: "m-20250912-1",
    moodId: "angry",
    note: "아침 러닝",
  },
  {
    createdAt: mk(13, 18, 40),
    id: "m-20250913-1",
    moodId: "angry",
    note: "친구 만남",
  },
  // 14일: 비움
  {
    createdAt: mk(15, 9, 15),
    id: "m-20250915-1",
    moodId: "angry",
    note: "교통 체증",
  },
  {
    createdAt: mk(16, 10, 0),
    id: "m-20250916-1",
    moodId: "happy",
    note: "프로젝트 진척",
  },
  {
    createdAt: mk(17, 13, 0),
    id: "m-20250917-1",
    moodId: "sad",
    note: "감기 기운",
  },
  {
    createdAt: mk(18, 22, 30),
    id: "m-20250918-1",
    moodId: "good",
    note: "드라마 정주행",
  },
  {
    createdAt: mk(19, 16, 0),
    id: "m-20250919-1",
    moodId: "spectacular",
    note: "릴리즈 완료!",
  },
  {
    createdAt: mk(20, 9, 0),
    id: "m-20250920-1",
    moodId: "happy",
    note: "브런치",
  },
  {
    createdAt: mk(21, 12, 0),
    id: "m-20250921-1",
    moodId: "good",
    note: "정리정돈",
  },
  // 22일: 비움
  {
    createdAt: mk(23, 8, 20),
    id: "m-20250923-1",
    moodId: "sad",
    note: "비 소식",
  },
  {
    createdAt: mk(24, 19, 10),
    id: "m-20250924-1",
    moodId: "good",
    note: "저녁 산책",
  },
  {
    createdAt: mk(25, 20, 0),
    id: "m-20250925-1",
    moodId: "angry",
    note: "서비스 오류",
  },
  {
    createdAt: mk(26, 11, 0),
    id: "m-20250926-1",
    moodId: "happy",
    note: "베이글 😋",
  },
  {
    createdAt: mk(27, 15, 0),
    id: "m-20250927-1",
    moodId: "good",
    note: "책 읽기",
  },
  {
    createdAt: mk(28, 10, 30),
    id: "m-20250928-1",
    moodId: "spectacular",
    note: "하이킹",
  },
  {
    createdAt: mk(29, 9, 45),
    id: "m-20250929-1",
    moodId: "happy",
    note: "햇살 가득",
  },
  {
    createdAt: mk(30, 21, 0),
    id: "m-20250930-1",
    moodId: "good",
    note: "영화 밤",
  },
];

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
    // const list = await getMoodEntries({ range: "day", date });
    setNoteEntries(DUMMY_MONTH_DATA);
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

      <View className="mt-6 mx-4 gap-3">
        {/* TODO :: tooltip추가 */}
        <Text className="text-base text-neutral-600">감정 흐름</Text>
        <MoodTrendChart mode="month" noteEntries={noteEntries} />
      </View>

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
