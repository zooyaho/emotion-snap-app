// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import Typography from "@components/common/Typography";

export default function HomeScreen() {
  return (
    <View
      style={{ paddingHorizontal: 20, paddingTop: 60 }}
      className="debug-border"
    >
      <Text className="text-red-500">TEST</Text>
      <Typography variant="h5" className="text-primary-500">
        오늘 기분을 기록해보세요
      </Typography>
      <Typography variant="xl">감정스냅 시작!</Typography>
    </View>
  );
}
