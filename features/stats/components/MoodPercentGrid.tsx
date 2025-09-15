import { View, Text } from "react-native";
import MoodPercentItem from "./MoodPercentItem";
import { MoodIdType } from "@features/mood/types/mood.type";

const DEFAULT_ORDER: MoodIdType[] = [
  "spectacular",
  "happy",
  "good",
  "sad",
  "upset",
  "angry",
];

type MoodPercentGridProps = {
  counts: Record<MoodIdType, number>; // 각 감정별 개수
  total?: number; // 분모(없으면 counts 합으로 계산)
  order?: MoodIdType[]; // 노출 순서
  columns?: 2 | 3; // 기본 2열
};

export default function MoodPercentGrid({
  counts,
  total,
  order = DEFAULT_ORDER,
  columns = 2,
}: MoodPercentGridProps) {
  const denom =
    total ?? order.reduce((sum, key) => sum + (counts[key] ?? 0), 0);

  const colClass = columns === 3 ? "w-1/3" : "w-1/2";

  return (
    <View className="mt-4 w-full px-2">
      <Text className="mb-2 text-sm text-neutral-500">감정별 퍼센트</Text>

      <View className="flex-row flex-wrap -mx-1">
        {order.map((mood) => (
          <View key={mood} className={`${colClass} px-1 py-1`}>
            <MoodPercentItem
              mood={mood}
              count={counts[mood] ?? 0}
              total={denom}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
