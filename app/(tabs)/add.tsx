// app/(tabs)/add.tsx
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function AddMoodModal() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">감정 기록 추가</Text>
      {/* 감정 선택/노트 입력 UI */}
      <Button title="저장" onPress={() => router.back()} />
    </View>
  );
}
