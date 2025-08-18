import "nativewind";
import "../global.css";

import { View, Text } from "react-native";
import { Stack } from "expo-router";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";
import ThemeToggle from "@components/ThemeToggle";
import Typography from "@components/common/Typography";

export default function RootLayoutWrapper() {
  return (
    <ThemeProvider>
      <RootLayout>
        <View style={{ marginTop: 100, paddingHorizontal: 20, zIndex: 1 }}>
          <ThemeToggle />
        </View>
        <Typography variant="h5" className="text-primary-500">
          오늘 기분을 기록해보세요
        </Typography>

        {/* 이 아래가 해당 디렉토리의 네비게이터(Stack).
           이후 탭/모달/중첩 레이아웃도 여기서 확장합니다. */}
        <Stack
          screenOptions={{
            headerShown: false, // 상단 헤더는 각 화면에서 필요하면 켜세요
          }}
        />
      </RootLayout>
    </ThemeProvider>
  );
}
