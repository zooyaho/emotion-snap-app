import { AppButton } from "@components/common/AppButton";
import { ThemedIonicon } from "@components/common/ThemedIonicon";
import MoodImage from "@features/mood/components/MoodImage";
import { moodColors } from "@features/mood/data/mood.data";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { buildMoodChartPosNegData } from "@features/mood/utils/moodStats";
import { useTheme } from "@providers/ThemeProvider";
import getColorByTwToken from "@utils/getColorByTwToken";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import MoodPercentGrid from "./MoodPercentGrid";

type Mode = "day" | "month" | "year";

type MoodPieChartPropsType = {
  mode: Mode;
  noteEntries: MoodEntryType[];
  size?: number; // 바깥 반지름
};

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
  const [isMoodPercentGridExpanded, setIsMoodPercentGridExpanded] =
    useState(false);

  const {
    counts: moodCounts,
    positive,
    negative,
    total,
    posPct,
    negPct,
  } = useMemo(() => buildMoodChartPosNegData(noteEntries), [noteEntries]);
  const isEmpty = total === 0;
  const pieChartData = isEmpty
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
      <View className="mt-2 flex-row items-center gap-x-4">
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

      {/* 요약 메세지 */}
      <View className="mt-4 flex-row items-center justify-center p-2 px-4 bg-background/50 rounded-lg">
        <Text className="text-md text-center text-neutral-600">
          {isEmpty
            ? "순간의 감정을 기록해 보세요"
            : getSummaryText(mode, posPct, negPct)}
        </Text>
        {isEmpty && <MoodImage name="spectacular" height={24} width={24} />}
      </View>
      {!isEmpty && (
        <>
          {/* 자세히 보기 버튼 */}
          <AppButton
            title={"자세히 보기"}
            variant="outline"
            size="xs"
            onPress={() => setIsMoodPercentGridExpanded((v) => !v)}
            accessibilityLabel="자세히 보기"
            accessibilityRole="button"
            className="mt-4"
          >
            <View
              style={{
                transform: [
                  { rotate: isMoodPercentGridExpanded ? "180deg" : "0deg" },
                ],
              }}
            >
              <ThemedIonicon
                name="chevron-down"
                size={20}
                colorToken="primary-600"
              />
            </View>
          </AppButton>
          {/* 감정별 퍼센트 Grid 영역 */}
          {/* TODO:: 펼침 시 아래 Grid와 0.2~0.25s 페이드/슬라이드 */}
          {isMoodPercentGridExpanded && (
            <MoodPercentGrid counts={moodCounts} total={total} />
          )}
        </>
      )}
    </View>
  );
}
