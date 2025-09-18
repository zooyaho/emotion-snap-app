import { MoodEntryType } from "@features/mood/services/moodStorage";
import MoodTrendChart from "./MoodTrendChart";
import { Pressable, View, Text } from "react-native";
import { ThemedIonicon } from "@components/common/ThemedIonicon";
import MoodScoreGuideSheet from "./MoodScoreGuideSheet";
import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import { useRef } from "react";

type MoodTrendCardPropsType = {
  noteEntries: MoodEntryType[];
};

export default function MoodTrendCard({ noteEntries }: MoodTrendCardPropsType) {
  const moodScoreGuideSheetRef = useRef<AppBottomSheetRef>(null);

  /** MoodScoreGuideSheet open 핸들러 */
  const openMoodScoreGuideSheet = () => {
    moodScoreGuideSheetRef.current?.present();
  };

  return (
    <>
      <View className="gap-2 pb-6">
        {/* 점수 안내 활성화 버튼 */}
        <Pressable
          className="self-end flex-row items-center gap-1"
          onPress={openMoodScoreGuideSheet}
        >
          <ThemedIonicon
            name="help-circle-outline"
            size={16}
            colorToken="neutral-400"
          />
          <Text className="text-xs text-neutral-400">점수 안내</Text>
        </Pressable>
        {/* 감정 흐름 차트 */}
        <MoodTrendChart mode="day" noteEntries={noteEntries} />
      </View>
      {/* 점수 안내 시트 */}
      <MoodScoreGuideSheet ref={moodScoreGuideSheetRef} />
    </>
  );
}
