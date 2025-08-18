import "nativewind";
import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";
import ThemeToggle from "@components/ThemeToggle";

export default function RootLayoutWrapper() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootLayout>
          <ThemeToggle />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            {/* Bottom Tabs 전체를 하나의 화면으로 취급 */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* 노트 추가 > 모달: (tabs)/add.tsx를 모달로 표시 */}
            <Stack.Screen
              name="(tabs)/add"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "감정 기록",
              }}
            />

            {/* 읽기/수정: /mood/:moodId, /mood/edit/:moodId */}
            <Stack.Screen
              name="mood/[moodId]"
              options={{ headerShown: true, title: "감정 노트" }}
            />
            <Stack.Screen
              name="mood/edit/[moodId]"
              options={{ headerShown: true, title: "감정 노트 수정" }}
            />
          </Stack>
        </RootLayout>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
