import MoodImage from "@features/mood/components/MoodImage";
import { moodColors } from "@features/mood/data/mood.data";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { useMemo } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type MoodPieChartPropsType = {
  noteEntries: MoodEntryType[];
  size?: number; // 바깥 반지름
};

const POSITIVE_SET = new Set(["good", "happy", "spectacular"] as const);
const NEGATIVE_SET = new Set(["angry", "upset", "sad"] as const);

export default function MoodPieChart({
  noteEntries,
  size = 72,
}: MoodPieChartPropsType) {
  const { theme } = useTheme();
  const chartEmptyTrackColor = getColorByTwToken(theme, "neutral-200");
  const { positive, negative } = useMemo(() => {
    let pos = 0;
    let neg = 0;

    for (const note of noteEntries) {
      if (POSITIVE_SET.has(note.moodId as any)) pos += 1;
      else if (NEGATIVE_SET.has(note.moodId as any)) neg += 1;
    }
    return { positive: pos, negative: neg };
  }, [noteEntries]);

  const total = positive + negative;
  const isEmpty = total === 0;
  const posPct = isEmpty ? 0 : Math.round((positive / total) * 100);
  const negPct = isEmpty ? 0 : 100 - posPct;

  const data = isEmpty
    ? [{ value: 1, color: chartEmptyTrackColor }]
    : [
        { value: positive, color: moodColors.positive.DEFAULT },
        { value: negative, color: moodColors.negative.DEFAULT },
      ];

  return (
    <View className="items-center">
      <PieChart
        data={data}
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
                  {posPct > negPct ? "긍정" : "부정"}
                </Text>
              </>
            )}
          </View>
        )}
      />

      {/* 요약 텍스트 */}
      <View className="mt-3 flex-row items-center gap-x-4">
        <View className="flex-row items-center gap-x-1">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: moodColors.positive.DEFAULT }}
          />
          <MoodImage name="spectacular" height={24} width={24} />
          <Text className="text-sm text-neutral-500">{posPct}%</Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: moodColors.negative.DEFAULT }}
          />
          <MoodImage name="upset" height={26} width={26} />
          <Text className="text-sm text-neutral-500">{negPct}%</Text>
        </View>
      </View>
    </View>
  );
}
