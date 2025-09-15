import { memo, useMemo } from "react";
import { View, Text } from "react-native";
import MoodImage from "@features/mood/components/MoodImage";
import { moodColors } from "@features/mood/data/mood.data";
import { MoodIdType } from "@features/mood/types/mood.type";

type MoodPercentItemProps = {
  mood: MoodIdType;
  count: number; // 이 감정의 개수
  total: number; // 전체 개수 (분모)
  label?: string; // 표시 텍스트(기본: mood 키)
};

const MoodPercentItem = memo(
  ({ mood, count, total, label }: MoodPercentItemProps) => {
    const percent = useMemo(
      () => (total === 0 ? 0 : Math.round((count / total) * 100)),
      [count, total]
    );
    const labelColor = (moodColors as any)[mood]?.text ?? "#D4D4D8";
    const moodBarColor = (moodColors as any)[mood]?.DEFAULT ?? "#D4D4D8";

    return (
      <View className="rounded-2xl border border-neutral-200/70 bg-background/60 p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <MoodImage name={mood} width={22} height={22} />
            <Text
              className="text-xs font-semibold"
              style={{ color: labelColor }}
            >
              {label ?? mood}
            </Text>
          </View>
          <Text className="text-xs font-semibold text-neutral-600">
            {percent}%
          </Text>
        </View>

        {/* 미니 프로그레스 바 */}
        <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <View
            className="h-full"
            style={{ width: `${percent}%`, backgroundColor: moodBarColor }}
          />
        </View>
      </View>
    );
  }
);

export default MoodPercentItem;
