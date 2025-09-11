import {
  AppBottomSheet,
  AppBottomSheetRef,
} from "@components/common/AppBottomSheet";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import {
  format,
  getDate,
  getMonth,
  getYear,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ko } from "date-fns/locale";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View } from "react-native";
import { Picker } from "react-native-wheel-pick";
import { AppButton } from "./AppButton";
import {
  getAvailableDays,
  getAvailableMonths,
  getAvailableYears,
  getRecentDateRange,
} from "@utils/date";

/**
 *  Props Type
 *  mode:
 *   - 'year'             : 연도만 선택
 *   - 'year-month'       : 연/월 선택
 *   - 'year-month-day'   : 연/월/일 선택
 *  최근 N년만 허용 (기본 10). 미래(오늘 이후)는 선택 불가.
 *
 */
type ModeType = "year" | "year-month" | "year-month-day";

type YearMonthDayPickerSheetPropsType = {
  initialDate?: Date; // 기본: 오늘
  onConfirm?: (v: Date) => void;
  onCancel?: () => void;
  recentYears?: number; // 최근 N년 (기본 10)
  snapPoints?: Array<string | number>;
  className?: string;
  mode?: ModeType; // 기본 'year-month'
};

const YearMonthDayPickerSheet = forwardRef(function YearMonthDayPickerSheet(
  {
    initialDate = new Date(),
    onConfirm,
    onCancel,
    recentYears = 10,
    snapPoints,
    className,
    mode = "year-month",
  }: YearMonthDayPickerSheetPropsType,
  ref: ForwardedRef<AppBottomSheetRef>
) {
  const { theme } = useTheme();
  const textColor = getColorByTwToken(theme, "neutral-600");

  // 범위 (최근 N년 ~ 오늘)
  const { minDate, maxDate } = useMemo(
    () => getRecentDateRange(recentYears),
    [recentYears]
  );
  const initYear = getYear(initialDate);
  const [year, setYear] = useState(initYear);

  // 연/월/일 리스트
  const years = useMemo(
    () => getAvailableYears(minDate, maxDate),
    [minDate, maxDate]
  );

  const months = useMemo(() => {
    if (mode === "year") return [];
    return getAvailableMonths(year, minDate, maxDate);
  }, [mode, year, minDate, maxDate]);
  const initMonthRaw = getMonth(initialDate) + 1;
  const initMonth = months.includes(initMonthRaw) ? initMonthRaw : months[0];
  const [month, setMonth] = useState(initMonth);

  const days = useMemo(() => {
    if (mode !== "year-month-day") return [];
    return getAvailableDays(year, month, minDate, maxDate);
  }, [mode, year, month, minDate, maxDate]);
  const initDayRaw = getDate(initialDate);
  const initDay = days.includes(initDayRaw) ? initDayRaw : days[0];
  const [day, setDay] = useState(initDay);

  /** 완료 버튼 핸들러 */
  const handleConfirm = useCallback(() => {
    let pickedDate: Date;

    if (mode === "year") {
      // 연도만 선택된 경우 → 1월 1일
      pickedDate = new Date(year, 0, 1);
    } else if (mode === "year-month") {
      // 연/월 선택된 경우 → 해당 월의 1일
      pickedDate = new Date(year, (month ?? 1) - 1, 1);
    } else {
      // 연/월/일 선택된 경우 → 해당 일자
      pickedDate = new Date(year, (month ?? 1) - 1, day ?? 1);
    }

    onConfirm?.(pickedDate);

    (ref as React.RefObject<AppBottomSheetRef>)?.current?.dismiss?.(); // 시트 비활성화
  }, [onConfirm, mode, year, month, day, ref]);

  /** 취소 버튼 핸들러 */
  const handleCancel = useCallback(() => {
    onCancel?.();
    (ref as React.RefObject<AppBottomSheetRef>)?.current?.dismiss?.(); // 시트 비활성화
  }, [onCancel, ref]);

  // 타이틀 포맷 (mode에 따라)
  const titleFmt =
    mode === "year" ? "yyyy" : mode === "year-month" ? "yyyy.MM" : "yyyy.MM.dd";
  const title = format(
    mode === "year"
      ? startOfMonth(new Date(year, 0, 1))
      : mode === "year-month"
        ? startOfMonth(new Date(year, month - 1, 1))
        : startOfDay(new Date(year, month - 1, day)),
    titleFmt,
    { locale: ko }
  );

  // 연도 바뀌면 월/일 보정
  useEffect(() => {
    const ms = getAvailableMonths(year, minDate, maxDate);
    if (!ms.includes(month)) {
      setMonth(ms[0]);
      // 월도 바뀌면 day도 다음 effect에서 다시 보정됨
    } else {
      // 월 범위에 있어도 일은 다시 체크
      const ds = getAvailableDays(year, month, minDate, maxDate);
      if (!ds.includes(day)) setDay(ds[0]);
    }
  }, [year]);

  // 월 바뀌면 일 보정
  useEffect(() => {
    const ds = getAvailableDays(year, month, minDate, maxDate);
    if (!ds.includes(day)) setDay(ds[0]);
  }, [month]);

  /**
   * initialDate가 변경될 때 내부 year/month/day 상태도 함께 동기화
   * - initialDate prop은 useState 초기화 시에만 반영되므로, 탭 전환 등으로 부모에서 initialDate가 바뀔 경우 반영하기 위해 추가
   */
  useEffect(() => {
    // 연
    const nextYear = getYear(initialDate);
    // 월
    const ms = getAvailableMonths(nextYear, minDate, maxDate);
    const rawMonth = getMonth(initialDate) + 1; // 1..12
    const nextMonth = ms.includes(rawMonth) ? rawMonth : ms[0];
    // 일
    const ds = getAvailableDays(nextYear, nextMonth, minDate, maxDate);
    const rawDay = getDate(initialDate);
    const nextDay = ds.includes(rawDay) ? rawDay : ds[0];

    setYear(nextYear);
    setMonth(nextMonth);
    setDay(nextDay);
  }, [initialDate, minDate, maxDate]);

  return (
    <AppBottomSheet
      ref={ref}
      title={title}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      contentClassName={className}
    >
      <View className="flex-row justify-center gap-6">
        {/* Year */}
        <Picker
          style={{ width: 120, height: 216, backgroundColor: "transparent" }}
          pickerData={years.map(String)}
          selectedValue={String(year)}
          onValueChange={(v: string) => setYear(Number(v))}
          textColor={textColor}
          textSize={18}
          itemSpace={24}
        />

        {/* Month */}
        {mode !== "year" && (
          <Picker
            style={{ width: 100, height: 216, backgroundColor: "transparent" }}
            pickerData={months.map((m) => m.toString().padStart(2, "0"))}
            selectedValue={String(month).padStart(2, "0")}
            onValueChange={(v: string) => setMonth(Number(v))}
            textColor={textColor}
            textSize={18}
            itemSpace={24}
          />
        )}

        {/* Day */}
        {mode === "year-month-day" && (
          <Picker
            style={{ width: 100, height: 216, backgroundColor: "transparent" }}
            pickerData={days.map((d) => d.toString().padStart(2, "0"))}
            selectedValue={String(day).padStart(2, "0")}
            onValueChange={(v: string) => setDay(Number(v))}
            textColor={textColor}
            textSize={18}
            itemSpace={24}
          />
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3 mt-2">
        <AppButton title="취소" variant="outline" onPress={handleCancel} />
        <AppButton title="완료" onPress={handleConfirm} />
      </View>
    </AppBottomSheet>
  );
});

export default YearMonthDayPickerSheet;
