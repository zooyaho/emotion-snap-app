import { useMemo, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { MOOD_SCORE } from "@features/mood/data/mood.data";
import type { MoodEntryType } from "@features/mood/services/moodStorage";

type Mode = "day" | "month" | "year";

type MoodTrendChartPropsType = {
  mode: Mode;
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

  const [chartWidth, setChartWidth] = useState(0); // 차트 너비
  const Y_LABEL_W = 28; // Y축 라벨 폭
  const INITIAL = 16;
  const END = 16;

  /** ───────────────────── X축 데이터 집계 ───────────────────── */
  const data = useMemo(() => {
    switch (mode) {
      case "day":
        return buildDaySeries(noteEntries);
      case "month":
        return buildMonthSeriesByFixedWeeks(noteEntries);
      case "year":
        return buildYearSeries(noteEntries);
      default:
        return [];
    }
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

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    setChartWidth(e.nativeEvent.layout.width);
  };

  const points = Math.max(1, data.length - 1);
  const innerW = Math.max(0, chartWidth - Y_LABEL_W - INITIAL - END);
  const spacing = points > 0 ? innerW / points : innerW; // X축 라벨 간격

  return (
    <View
      className="bg-background/20 rounded-xl pt-5 pb-2"
      onLayout={onLayoutContainer}
      style={{ overflow: "hidden" }}
    >
      {chartWidth > 0 && (
        <LineChart
          data={data}
          stepHeight={stepHeight}
          isAnimated
          width={chartWidth}
          initialSpacing={INITIAL}
          endSpacing={END}
          spacing={spacing} // X축 라벨 간격
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
          yAxisLabelWidth={Y_LABEL_W}
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
      )}
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

/** ── 연간: 12개월 평균(짝수월만 라벨: 2,4,6,8,10,12) ─────────── */
function buildYearSeries(entries: MoodEntryType[]) {
  const sums = Array(12).fill(0) as number[];
  const counts = Array(12).fill(0) as number[];

  for (const e of entries) {
    const m = new Date(e.createdAt).getMonth(); // 0..11
    const score = MOOD_SCORE[e.moodId] ?? 0;
    sums[m] += score;
    counts[m] += 1;
  }

  const avg = (s: number, c: number) => (c ? s / c : 0);

  // 12 포인트(1~12월). 라벨은 짝수월만 표시, 홀수월은 빈 문자열.
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const label = month % 2 === 0 ? `${month}월` : "";
    return { value: avg(sums[i], counts[i]), label };
  });
}
