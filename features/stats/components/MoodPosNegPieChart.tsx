import MoodImage from "@features/mood/components/MoodImage";
import { moodColors } from "@features/mood/data/mood.data";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type MoodPosNegPieChartPropsType = {
  size?: number; // 바깥 반지름
  positive: number;
  negative: number;
  total: number;
  posPct: number;
  negPct: number;
};

export default function MoodPosNegPieChart({
  size = 72,
  positive,
  negative,
  total,
  posPct,
  negPct,
}: MoodPosNegPieChartPropsType) {
  const { theme } = useTheme();
  const chartEmptyTrackColor = getColorByTwToken(theme, "neutral-200");
  const isEmpty = total === 0;
  const pieChartData = isEmpty
    ? [{ value: 1, color: chartEmptyTrackColor }]
    : [
        { value: positive, color: moodColors.positive.DEFAULT },
        { value: negative, color: moodColors.negative.DEFAULT },
      ];

  return (
    <>
      <PieChart
        data={pieChartData}
        donut
        innerCircleColor="transparent"
        radius={size}
        innerRadius={size - 26}
        showText={false}
        centerLabelComponent={() => (
          <View className="items-center justify-center bg-background rounded-full h-20 w-20">
            {isEmpty ? (
              <Text className="text-base font-semibold text-neutral-500">
                0건
              </Text>
            ) : (
              <>
                <Text className="text-lg font-semibold text-neutral-500">
                  {Math.max(posPct, negPct)}%
                </Text>
                <Text className="text-xs text-neutral-500">
                  {posPct === negPct
                    ? "긍정/부정"
                    : posPct > negPct
                      ? "긍정"
                      : "부정"}
                </Text>
              </>
            )}
          </View>
        )}
      />
      {/* 감정 비율 범례 (긍정/부정) */}
      <View className="mt-3 flex-row items-center gap-x-4">
        <View className="flex-row items-center gap-x-1">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: moodColors.positive.DEFAULT }}
          />
          <MoodImage name="spectacular" height={18} width={18} />
          <Text className="text-xs text-neutral-500">{posPct}%</Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: moodColors.negative.DEFAULT }}
          />
          <MoodImage name="upset" height={20} width={20} />
          <Text className="text-xs text-neutral-500">{negPct}%</Text>
        </View>
      </View>
    </>
  );
}
