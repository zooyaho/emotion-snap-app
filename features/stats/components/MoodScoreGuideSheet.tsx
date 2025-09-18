import {
  AppBottomSheet,
  AppBottomSheetRef,
  SheetScroll,
} from "@components/common/AppBottomSheet";
import { ThemedIonicon } from "@components/common/ThemedIonicon";
import MoodImage from "@features/mood/components/MoodImage";
import {
  MOOD_OPTIONS,
  MOOD_SCORE,
  moodColors,
} from "@features/mood/data/mood.data";
import { useTheme } from "@providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { ForwardedRef, forwardRef, useState } from "react";
import { View, Text, Pressable } from "react-native";

type MoodScoreGuideSheetPropsType = { className?: string };

const MoodScoreGuideSheet = forwardRef(function MoodScoreGuideSheet(
  { className }: MoodScoreGuideSheetPropsType,
  ref: ForwardedRef<AppBottomSheetRef>
) {
  const [isShowExamples, setIsShowExamples] = useState(false);
  const { theme } = useTheme();
  const colorKey = theme === "dark" ? "text" : "DEFAULT";

  const gradientColors = [
    moodColors.angry[colorKey],
    moodColors.sad[colorKey],
    moodColors.good[colorKey],
    moodColors.happy[colorKey],
    moodColors.spectacular[colorKey],
  ] as const;

  const moodWithScore = [...MOOD_OPTIONS].sort(
    (a, b) => MOOD_SCORE[a.id] - MOOD_SCORE[b.id]
  );
  const exampleMoodIds = ["angry", "sad", "good", "spectacular"] as const;

  return (
    <AppBottomSheet
      ref={ref}
      title={"감정 점수 안내"}
      contentClassName={className}
    >
      <SheetScroll>
        <View className="px-4 pt-4 pb-14">
          <Text className="text-md font-bold text-neutral-600 mb-4">
            감정 점수란?
          </Text>

          <Text className="text-sm text-neutral-600">
            감정은 -3(부정) ~ +3(긍정)으로 계산돼요. 이 점수를 바탕으로 그래프가
            그려집니다.
          </Text>

          <View className="w-full mt-6">
            {/* 가로 게이지 */}
            <View className="relative h-6 rounded-full overflow-hidden bg-neutral-200">
              <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </View>

            {/* 감정 아이콘 + 점수 */}
            <View className="mt-2 flex-row justify-between items-center">
              {moodWithScore.map((mood) => (
                <View key={mood.id} className="items-center w-[14%]">
                  <MoodImage name={mood.id} width={24} height={24} />
                  <Text
                    style={{ color: moodColors[mood.id].text }}
                    className="text-xs mt-1"
                  >
                    {MOOD_SCORE[mood.id]}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 예시 토글 */}
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsShowExamples((v) => !v)}
            className="flex-row items-center px-3 mt-10 pb-2"
          >
            <Text className="text-sm text-neutral-500">
              {isShowExamples ? "예시 접기" : "예시 보기"}
            </Text>
            <View
              style={{
                transform: [{ rotate: isShowExamples ? "180deg" : "0deg" }],
              }}
            >
              <ThemedIonicon
                name="chevron-down"
                size={20}
                colorToken="neutral-400"
              />
            </View>
          </Pressable>

          {isShowExamples && (
            <View className="mt-2 rounded-2xl border border-neutral-200 p-3">
              {exampleMoodIds.map((id) => (
                <View className="flex-row items-center gap-2 py-1">
                  <MoodImage name={id} width={24} height={24} />
                  <Text className="text-sm text-neutral-600">
                    <Text
                      style={{ backgroundColor: moodColors[id].DEFAULT }}
                      className="text-background p-2"
                    >
                      {id}
                    </Text>{" "}
                    → {MOOD_SCORE[id]}
                    점수로 계산돼요.
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </SheetScroll>
    </AppBottomSheet>
  );
});

export default MoodScoreGuideSheet;
