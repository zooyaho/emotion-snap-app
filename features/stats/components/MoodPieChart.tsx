import MoodImage from "@features/mood/components/MoodImage";
import { moodColors } from "@features/mood/data/mood.data";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { useMemo } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type Mode = "day" | "month" | "year";

type MoodPieChartPropsType = {
  mode: Mode;
  noteEntries: MoodEntryType[];
  size?: number; // 바깥 반지름
};

const POSITIVE_SET = new Set(["good", "happy", "spectacular"] as const);
const NEGATIVE_SET = new Set(["angry", "upset", "sad"] as const);
const MODE_LABELS = {
  day: {
    pos: "오늘은 전체적으로 긍정적인 날이었습니다.",
    neg: "오늘은 전체적으로 부정적인 날이었습니다.",
    equal: "긍정과 부정이 균형을 이루는 하루였네요.",
  },
  month: {
    pos: "이번달은 전체적으로 긍정적인 달이었습니다.",
    neg: "이번달은 전체적으로 부정적인 달이었습니다.",
    equal: "긍정과 부정이 균형을 이루는 달이였네요.",
  },
  year: {
    pos: "이번연도는 전체적으로 긍정적인 연도였습니다.",
    neg: "이번연도는 전체적으로 부정적인 연도였습니다.",
    equal: "긍정과 부정이 균형을 이루는 연도였네요.",
  },
};

export default function MoodPieChart({
  mode,
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

  const getSummaryText = (mode: Mode, posPct: number, negPct: number) => {
    if (posPct > negPct) return MODE_LABELS[mode].pos;
    if (posPct < negPct) return MODE_LABELS[mode].neg;
    return MODE_LABELS[mode].equal;
  };

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
      {/* 요약 메세지 */}
      <View className="mt-4 flex-row items-center justify-center">
        <Text className="text-sm text-center text-neutral-600">
          {isEmpty
            ? "순간의 감정을 기록해 보세요"
            : getSummaryText(mode, posPct, negPct)}
        </Text>
        {isEmpty && <MoodImage name="spectacular" height={24} width={24} />}
      </View>
      {/* 감정 비율 범례 (긍정/부정) */}
      {!isEmpty && (
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
      )}
    </View>
  );
}
