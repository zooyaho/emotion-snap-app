import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import {
  getMoodEntries,
  MoodEntryType,
} from "@features/mood/services/moodStorage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

type RangeType = "day" | "month" | "year";

/**
 * 공통 통계 조회 훅
 * - Daily / Monthly / Yearly 화면에서 공유
 * - 선택된 날짜와 해당 범위(range)에 맞는 감정 기록을 관리
 */
export function useStats(range: RangeType) {
  const today = new Date();
  /** 기간 선택 BottomSheet ref */
  const periodPickerSheetRef = useRef<AppBottomSheetRef>(null);

  /** 현재 선택된 기준 날짜 (기본: 오늘) */
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  /** 선택된 날짜 범위의 감정 기록 리스트 */
  const [noteEntries, setNoteEntries] = useState<MoodEntryType[]>([]);
  /** 로딩 상태 */
  const [isLoading, setIsLoading] = useState(true);

  /** 기간 선택 BottomSheet 열기 */
  const openPeriodPickerSheet = () => periodPickerSheetRef.current?.present();
  /** BottomSheet에서 날짜 선택 확인 시 실행 */
  const onPeriodPickerSheetConfirm = (picked: Date) => setSelectedDate(picked);

  /** 선택된 날짜 범위의 기록 로드 */
  const load = useCallback(
    async (date: Date) => {
      setIsLoading(true);
      const list = await getMoodEntries({ range, date });
      setNoteEntries(list);
      setIsLoading(false);
    },
    [range]
  );

  /**
   * 탭/화면에 다시 포커스될 때마다
   * 선택 날짜를 '오늘'로 초기화 후 즉시 로드
   */
  useFocusEffect(
    useCallback(() => {
      setSelectedDate(today);
      load(today);
    }, [load])
  );

  /** 선택 날짜가 변경될 때마다 기록 재로드 */
  useEffect(() => {
    load(selectedDate);
  }, [selectedDate, load]);

  return {
    selectedDate,
    setSelectedDate,
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,
    noteEntries,
    isLoading,
  };
}
