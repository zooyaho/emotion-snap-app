import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "@components/common/AppButton";
import { cn } from "@utils/cn";
import { useTheme } from "@providers/ThemeProvider";
import BottomButton from "@components/common/BottomButton";

export default function AddMood() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <>
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold mb-4">감정 기록 추가</Text>
        {/* 감정 선택/노트 입력 UI */}
        <Button title="저장" onPress={() => router.back()} />
      </View>

      {/* Bottom Button */}
      <BottomButton title="기록" onPress={() => {}} disabled />
    </>
  );
}
