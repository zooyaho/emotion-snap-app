import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  isAfter,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ko } from "date-fns/locale";

export type YearMonthType = { year: number; month: number }; // 1~12

export const ymLabel = (ym: YearMonthType) => `${ym.year}년 ${ym.month}월`;
export const yLabel = (year: number) => `${year}년`;

/**
 * 특정 연·월에 해당하는 모든 날짜 정보를 반환합니다.
 *
 * @param year  연도 (예: 2025)
 * @param month 월 (1~12, JS Date는 0 기반이므로 내부에서 -1 처리)
 * @returns
 *   - date: Date 객체 (실제 날짜)
 *   - day: 일(day of month, 1~31)
 *   - weekday: 요일(한국어 약칭, 예: "월", "화", ...)
 *   - disabled: boolean 오늘 이후면 비활성화
 *
 * @example
 * getMonthDays(2025, 8) // 오늘이 2025-08-01 일경우
 * // [
 * //   { date: 2025-08-01, day: 1, weekday: "금", disabled: false },
 * //   { date: 2025-08-02, day: 2, weekday: "토", disabled: true },
 * //   ...
 * // ]
 */
export function getMonthDays(year: number, month: number) {
  const today = new Date();
  const todayStart = startOfDay(today);

  const start = startOfMonth(new Date(year, month - 1, 1));
  const end = endOfMonth(start);

  return eachDayOfInterval({ start, end }).map((d) => ({
    date: d,
    day: d.getDate(), // 1~31
    weekday: format(d, "EEE", { locale: ko }), // 수, 목 ...
    disabled: isAfter(startOfDay(d), todayStart),
  }));
}

/**
 * 특정 연도의 월 목록을 반환합니다.
 * - clampToToday=true면, 같은 해일 때 1월 ~ (오늘의 월)까지만 반환합니다.
 *   (예: today=2025-05-03, year=2025 → 1~5월)
 * @param year 연도 (예: 2025)
 * @returns [{ year: number, month: number }] 형태의 배열
 *
 * @example
 * getMonthsOfYear(2025)
 * // [
 * //   { year: 2025, month: 1 },
 * //   { year: 2025, month: 2 },
 * //   ...
 * //   { year: 2025, month: 12 },
 * // ]
 */
export function getMonthsOfYear(
  year: number,
  clampToToday?: boolean
): YearMonthType[] {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;

  const last = clampToToday && year === thisYear ? thisMonth : 12;

  return Array.from({ length: last }, (_, i) => ({ year, month: i + 1 }));
}

/**
 * 현재 시점의 연도와 월을 반환합니다.
 *
 * @returns [{ year: number, month: number }]
 *
 * @example
 * // 오늘이 2025년 8월이라면
 * thisYearMonth()
 * // { year: 2025, month: 8 }
 */
export function getTodayYearMonth(): YearMonthType {
  const now = new Date();
  return { year: getYear(now), month: getMonth(now) + 1 };
}

export function getYearMonth(date: Date): YearMonthType {
  return { year: getYear(date), month: getMonth(date) + 1 };
}

/**
 *  YearMonthDayPickerSheet Helper (범위/리스트)
 *  - minDate: (오늘 기준) 최근 N년의 시작 (YYYY-01-01)
 *  - maxDate: 오늘 (startOfDay)
 *  - 연/월/일 리스트는 min/maxDate에 맞춰 동적으로 제한
 *
 */
export function getRecentDateRange(recentYears: number) {
  const today = startOfDay(new Date());
  // 최근 N년: (올해 - (N-1))년 1월 1일 ~ 오늘
  const minYear = getYear(today) - (recentYears - 1);
  const minDate = startOfDay(new Date(minYear, 0, 1));
  const maxDate = today;
  return { minDate, maxDate };
}

export function getAvailableYears(minDate: Date, maxDate: Date) {
  const minY = getYear(minDate);
  const maxY = getYear(maxDate);
  const arr: number[] = [];
  for (let y = minY; y <= maxY; y++) arr.push(y);
  return arr;
}

export function getAvailableMonths(year: number, minDate: Date, maxDate: Date) {
  const minY = getYear(minDate);
  const maxY = getYear(maxDate);
  const start = year === minY ? getMonth(minDate) + 1 : 1; // 1..12
  const end = year === maxY ? getMonth(maxDate) + 1 : 12;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getAvailableDays(
  year: number,
  month: number, // 1..12
  minDate: Date,
  maxDate: Date
) {
  // 해당 월의 전체 일수
  const first = new Date(year, month - 1, 1);
  const last = endOfMonth(first);
  let startDay = 1;
  let endDay = getDaysInMonth(first);

  // min/maxDate에 의해 커팅
  if (year === getYear(minDate) && month === getMonth(minDate) + 1) {
    startDay = Math.max(startDay, getDate(minDate));
  }
  if (year === getYear(maxDate) && month === getMonth(maxDate) + 1) {
    endDay = Math.min(endDay, getDate(maxDate));
  }

  return Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
}
