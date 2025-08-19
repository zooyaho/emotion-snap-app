import { HREF } from "consts/routes";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function EditMood() {
  const { moodId } = useLocalSearchParams<{ moodId: string }>();
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-semibold">노트 수정 #{moodId}</Text>
      <Button
        title="저장"
        onPress={() => router.replace(HREF.mood.detail(moodId))}
      />
    </View>
  );
}
