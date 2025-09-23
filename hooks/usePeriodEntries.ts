import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import { queryKeys, RangeType } from "@constants/queryKeys";
import {
  getMoodEntries,
  MoodEntryType,
} from "@features/mood/services/moodStorage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

type UsePeriodEntriesOptions = {
  /** 화면 재진입 시 오늘로 리셋할지 (기본값: true) */
  resetOnFocus?: boolean;
};

/**
 * 기간별(일/월/년) 감정 기록을 공통으로 관리하는 훅
 * - 날짜 상태, BottomSheet 제어, 데이터 로드/리로드를 제공
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

  /** 쿼리 키(날짜는 문자열로 안정화) */
  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const queryKey = queryKeys.mood.entries(range, selectedKey);

  /** 데이터 쿼리 */
  const {
    data: noteEntries = [],
    isPending, // 최초 로딩
    isFetching, // 리패치 중
    refetch,
  } = useQuery<MoodEntryType[]>({
    queryKey,
    queryFn: () => getMoodEntries({ range, date: selectedDate }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const isInitialLoading = isPending && noteEntries.length === 0;
  const isRefetching = !isPending && isFetching;

  /** 현재 선택 날짜 기준 수동 리로드 */
  const reload = useCallback(() => refetch(), [refetch]);

  /** 기간 선택 BottomSheet 열기 */
  const openPeriodPickerSheet = () => periodPickerSheetRef.current?.present();
  /** BottomSheet에서 날짜 선택 확인 시 실행 */
  const onPeriodPickerSheetConfirm = (picked: Date) => setSelectedDate(picked);

  /**
   * 탭/화면에 재진입 시 today로 초기화하고 즉시 쿼리 트리거
   * (항상 오늘로 리셋하는 UX)
   */
  useFocusEffect(
    useCallback(() => {
      if (!resetOnFocus) return;

      const now = new Date(); // 포커스 순간의 today
      setSelectedDate((prev) => (isSameDay(prev, now) ? prev : now));
    }, [resetOnFocus])
  );

  return {
    // state
    selectedDate,
    setSelectedDate,
    noteEntries,
    queryKey,

    // 로딩 상태
    isLoading: isPending || isFetching,
    isInitialLoading: isInitialLoading, // 최초 로딩
    isRefetching: isRefetching, // 갱신 로딩

    // bottom sheet controls
    periodPickerSheetRef,
    openPeriodPickerSheet,
    onPeriodPickerSheetConfirm,

    // actions
    reload,
  };
}
