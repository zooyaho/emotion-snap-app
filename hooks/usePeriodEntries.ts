import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import {
  getMoodEntries,
  MoodEntryType,
} from "@features/mood/services/moodStorage";

export type RangeType = "day" | "month" | "year";

type UsePeriodEntriesOptions = {
  /** 화면 재진입 시 오늘(today)로 리셋할지 (기본값: true) */
  resetOnFocus?: boolean;
};

/**
 * 기간별(일/월/년) 감정 기록을 공통으로 관리하는 훅
 * - 날짜 상태, BottomSheet 제어, 데이터 로드/리로드를 제공
 * - 통계/히스토리 화면 모두에서 재사용
 */
export function usePeriodEntries(
  range: RangeType,
  opts?: UsePeriodEntriesOptions
) {
  const { resetOnFocus = true } = opts ?? {};
  const today = new Date();
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

  /** 현재 선택 날짜 기준으로 재로딩 */
  const reload = useCallback(() => {
    return load(selectedDate);
  }, [load, selectedDate]);

  /**
   * 탭/화면에 다시 포커스될 때 동작
   * - 기본: 오늘로 초기화 후 즉시 로드
   * - resetOnFocus=false 면 리셋하지 않음
   */
  useFocusEffect(
    useCallback(() => {
      if (resetOnFocus) {
        setSelectedDate(today);
        load(today);
      }
    }, [resetOnFocus, load])
  );

  /** 선택 날짜가 변경될 때마다 기록 재로드 */
  useEffect(() => {
    load(selectedDate);
  }, [selectedDate, load]);

  return {
    // state
    selectedDate,
    setSelectedDate,
    noteEntries,
    isLoading,

    // bottom sheet controls
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,

    // actions
    reload,
  };
}
