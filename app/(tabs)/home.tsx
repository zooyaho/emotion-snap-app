import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-semibold">오늘의 감정 분포</Text>

      {/* 상세로 이동 예시 */}
      <Link href="/mood/123" asChild>
        <Pressable className="mt-4 p-3 rounded-xl bg-gray-100">
          <Text>샘플 노트 보기 (/mood/123)</Text>
        </Pressable>
      </Link>

      {/* 작성 모달 열기 */}
      <Link href="/mood/add" asChild>
        <Pressable className="mt-4 p-3 rounded-xl bg-pink-200">
          <Text>감정 기록 추가</Text>
        </Pressable>
      </Link>
    </View>
  );
}
