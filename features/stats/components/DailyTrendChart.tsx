import { MOOD_SCORE } from "@features/mood/data/mood.data";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { useMemo } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

type DailyTrendChartPropsType = {
  noteEntries: MoodEntryType[];
};

export default function DailyTrendChart({
  noteEntries,
}: DailyTrendChartPropsType) {
  const { theme } = useTheme();
  const lineColor = getColorByTwToken(theme, "primary-500");
  const AxisColor = getColorByTwToken(theme, "neutral-300");
  const textColor = getColorByTwToken(theme, "neutral-600");

  const trendChartData = useMemo(() => {
    /** 4시간 구간 평균 계산 */
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
      for (const e of noteEntries) {
        const h = new Date(e.createdAt).getHours();
        if (h >= b.start && h < b.end) {
          scores.push(MOOD_SCORE[e.moodId] ?? 0);
        }
      }
      const avg = scores.length
        ? scores.reduce((a, c) => a + c, 0) / scores.length
        : 0;
      return { value: avg, label: b.label };
    });
  }, [noteEntries]);

  return (
    <View className="bg-background/20 rounded-xl pt-5 pb-2">
      <LineChart
        data={trendChartData}
        // 애니메이션
        isAnimated
        // X축
        xAxisLabelTextStyle={{
          fontSize: 10,
          opacity: 0.8,
          color: textColor,
        }}
        xAxisType="solid"
        // Y축
        maxValue={3} // 꼭대기 값
        stepValue={1} // 한 칸 간격
        noOfSections={3} // X축 위 3칸
        noOfSectionsBelowXAxis={3} // X축 아래 3칸
        yAxisLabelTexts={["-3", "-2", "-1", "0", "1", "2", "3"]}
        yAxisTextStyle={{
          fontSize: 10,
          opacity: 0.8,
          color: textColor,
        }}
        // 스타일
        stepHeight={30}
        hideDataPoints
        curved
        thickness={2}
        hideRules={false}
        rulesType="dashed"
        scrollToEnd={false}
        yAxisColor={AxisColor}
        xAxisColor={AxisColor}
        color={lineColor}
        areaChart
        startFillColor={"rgb(234, 84, 119)"}
        endFillColor={"rgb(234, 234, 84)"}
        startOpacity={0.4}
        endOpacity={0.1}
      />
    </View>
  );
}
