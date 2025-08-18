import { useLocalSearchParams, Link } from "expo-router";
import { View, Text } from "react-native";

export default function MoodDetail() {
  const { moodId } = useLocalSearchParams<{ moodId: string }>();

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-semibold">노트 #{moodId}</Text>
      <Link href={`/mood/edit/${moodId}`}>수정하기</Link>
    </View>
  );
}
