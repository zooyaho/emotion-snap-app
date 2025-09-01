import { useMemo } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { MOOD_SCORE } from "@features/mood/data/mood.data";
import type { MoodEntryType } from "@features/mood/services/moodStorage";
import { getWeekOfMonth, isSameMonth } from "date-fns";

type Mode = "day" | "month";

type MoodTrendChartPropsType = {
  mode: Mode;
  /** 일간: 해당 날짜 데이터 / 월간: 해당 월의 데이터들 */
  noteEntries: MoodEntryType[];
  /** 차트 높이 제어용(섹션 높이). 기본 30 */
  stepHeight?: number;
};

export default function MoodTrendChart({
  mode,
  noteEntries,
  stepHeight = 30,
}: MoodTrendChartPropsType) {
  const { theme } = useTheme();
  const lineColor = getColorByTwToken(theme, "primary-500");
  const axisColor = getColorByTwToken(theme, "neutral-300");
  const textColor = getColorByTwToken(theme, "neutral-600");

  /** ───────────────────── X축 데이터 집계 ───────────────────── */
  const data = useMemo(() => {
    return mode === "day"
      ? buildDaySeries(noteEntries)
      : buildMonthSeriesByFixedWeeks(noteEntries);
  }, [mode, noteEntries]);

  /** ───────────────────── Y축(3..-3) 고정 ───────────────────── */
  const axis = useMemo(
    () => ({
      maxValue: 3,
      stepValue: 1,
      noOfSections: 3, // 위 3칸
      noOfSectionsBelowXAxis: 3, // 아래 3칸
      // gifted-charts는 "아래→위" 순서로 라벨을 넣어야 함
      yAxisLabelTexts: ["-3", "-2", "-1", "0", "1", "2", "3"],
    }),
    []
  );

  return (
    <View className="bg-background/20 rounded-xl pt-5 pb-2">
      <LineChart
        data={data}
        /** 높이는 stepHeight로 맞춤(섹션 6개 × stepHeight) */
        stepHeight={stepHeight}
        isAnimated
        // X축
        xAxisLabelTextStyle={{ fontSize: 10, opacity: 0.8, color: textColor }}
        xAxisType="solid"
        xAxisColor={axisColor}
        // Y축
        maxValue={axis.maxValue}
        stepValue={axis.stepValue}
        noOfSections={axis.noOfSections}
        noOfSectionsBelowXAxis={axis.noOfSectionsBelowXAxis}
        yAxisLabelTexts={axis.yAxisLabelTexts}
        yAxisTextStyle={{ fontSize: 10, opacity: 0.8, color: textColor }}
        yAxisColor={axisColor}
        // 라인/영역
        color={lineColor}
        curved
        thickness={2}
        hideDataPoints
        areaChart
        startFillColor={"rgb(234, 84, 119)"}
        endFillColor={"rgb(234, 234, 84)"}
        startOpacity={0.4}
        endOpacity={0.1}
        // 그리드
        hideRules={false}
        rulesType="dashed"
        // 스크롤
        scrollToEnd={false}
      />
    </View>
  );
}

/** ───────────────────── 일간: 4시간 버킷(6개) ───────────────────── */
function buildDaySeries(entries: MoodEntryType[]) {
  const buckets = [
    { start: 0, end: 4, label: "4시" },
    { start: 4, end: 8, label: "8시" },
    { start: 8, end: 12, label: "12시" },
    { start: 12, end: 16, label: "16시" },
    { start: 16, end: 20, label: "20시" },
    { start: 20, end: 24, label: "24시" },
  ];

  return buckets.map((b) => {
    const scores: number[] = [];
    for (const e of entries) {
      const h = new Date(e.createdAt).getHours();
      if (h >= b.start && h < b.end) scores.push(MOOD_SCORE[e.moodId] ?? 0);
    }
    const avg = scores.length
      ? scores.reduce((a, c) => a + c, 0) / scores.length
      : 0;
    return { value: avg, label: b.label };
  });
}

/** ───────────────────── 월간: 1~5주 버킷(5개) ─────────────────────
 * 월간: 고정 주차(1~7, 8~14, 15~21, 22~28, 29~말일)
 */
function buildMonthSeriesByFixedWeeks(entries: MoodEntryType[]) {
  const sums = [0, 0, 0, 0, 0];
  const counts = [0, 0, 0, 0, 0];

  for (const e of entries) {
    const d = new Date(e.createdAt);
    const day = d.getDate(); // 1..31
    const idx =
      day <= 7 ? 0 : day <= 14 ? 1 : day <= 21 ? 2 : day <= 28 ? 3 : 4; // 29~말일은 5주
    const score = MOOD_SCORE[e.moodId] ?? 0;
    sums[idx] += score;
    counts[idx] += 1;
  }

  const avg = (s: number, c: number) => (c ? s / c : 0);

  return [
    { value: avg(sums[0], counts[0]), label: "1주" },
    { value: avg(sums[1], counts[1]), label: "2주" },
    { value: avg(sums[2], counts[2]), label: "3주" },
    { value: avg(sums[3], counts[3]), label: "4주" },
    { value: avg(sums[4], counts[4]), label: "5주" },
  ];
}
