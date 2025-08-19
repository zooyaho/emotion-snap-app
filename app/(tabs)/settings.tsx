// app/(tabs)/settings.tsx
import ThemeToggle from "@components/ThemeToggle";
import { View, Text } from "react-native";
export default function Settings() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>설정</Text>
      <ThemeToggle />
    </View>
  );
}
