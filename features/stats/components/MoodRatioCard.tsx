import { AppButton } from "@components/common/AppButton";
import { ThemedIonicon } from "@components/common/ThemedIonicon";
import MoodImage from "@features/mood/components/MoodImage";
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { buildMoodChartPosNegData } from "@features/mood/utils/moodStats";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import MoodPercentGrid from "./MoodPercentGrid";
import MoodPosNegPieChart from "./MoodPosNegPieChart";
import FadeSlideCollapsible from "@components/animation/FadeSlideCollapsible";

type ModeType = "day" | "month" | "year";

type MoodRatioCardPropsType = {
  mode: ModeType;
  noteEntries: MoodEntryType[];
};

const SUMMARY_MESSAGES = {
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

export default function MoodRatioCard({
  mode,
  noteEntries,
}: MoodRatioCardPropsType) {
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

  const getSummaryMessage = (
    mode: ModeType,
    posPct: number,
    negPct: number
  ) => {
    if (isEmpty) return "순간의 감정을 기록해 보세요";
    if (posPct > negPct) return SUMMARY_MESSAGES[mode].pos;
    if (posPct < negPct) return SUMMARY_MESSAGES[mode].neg;
    return SUMMARY_MESSAGES[mode].equal;
  };

  const summaryMessage = getSummaryMessage(mode, posPct, negPct);

  return (
    <View className="items-center">
      {/* 긍/부정 파이 차트 */}
      <MoodPosNegPieChart
        positive={positive}
        negative={negative}
        total={total}
        posPct={posPct}
        negPct={negPct}
      />

      {/* 요약 메세지 */}
      <View className="mt-4 flex-row items-center justify-center p-2 px-4 bg-background/50 rounded-lg">
        <Text className="text-md text-center text-neutral-600">
          {summaryMessage}
        </Text>
        {isEmpty && <MoodImage name="spectacular" height={24} width={24} />}
      </View>

      {/* 감정별 퍼센트 Grid 영역 */}
      {!isEmpty && (
        <>
          {/* 자세히 보기 버튼 */}
          <AppButton
            title={"감정별 퍼센트 보기"}
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
          {/* 펼침 시 아래 Grid와 0.2~0.25s 페이드/슬라이드 */}
          <FadeSlideCollapsible isOpen={isMoodPercentGridExpanded}>
            <MoodPercentGrid counts={moodCounts} total={total} />
          </FadeSlideCollapsible>
        </>
      )}
    </View>
  );
}
